import { useState, useEffect, useCallback, useMemo } from 'react';
import roleApiService from 'src/services/admin/role-service';
import Permission from 'src/types/admin/role/permission';

const usePermissionSelection = (roleId: string, type: string) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetchPermissions function
  const fetchPermissions = useCallback(async () => {
    if (!roleId || !type) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await roleApiService.getPermissionsByRole(roleId, {
        filter: { type }
      });

      const initialPermissions = response.payload;
      setPermissions(initialPermissions);

      // Create initial selections object in one pass
      const initialSelections = initialPermissions.reduce(
        (acc, permission) => {
          acc[permission.id] = permission.selected;
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      setSelectedPermissions(initialSelections);
    } catch (err) {
      setError('Error loading permissions');
      console.error('Error fetching permissions:', err);
    } finally {
      setIsLoading(false);
    }
  }, [roleId, type]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Memoize derived data
  const models = useMemo(() => Array.from(new Set(permissions.map((permission) => permission.model))), [permissions]);

  /**
   * Applies all permission business logic for a single model.
   * This function is a pure calculation based on the current state.
   */
  const applyRulesForModel = (
    currentState: { [key: string]: boolean },
    model: string,
    permissionName: string,
    isTurningOn: boolean
  ): { [key: string]: boolean } => {
    let updated = { ...currentState };

    // Helper to find a permission ID for the current model by name
    const getPermId = (name: string): string | undefined => {
      return permissions.find((p) => p.model === model && p.name.includes(name))?.id;
    };

    // Get IDs for all permissions in this model
    const permIds = {
      create: getPermId('create'),
      update: getPermId('update'),
      delete: getPermId('delete'),
      check: getPermId('check'),
      approve: getPermId('approve'),
      authorize: getPermId('authorize'),
      view: getPermId('view')
    };

    // Define permission groups based on rules
    const linkGroup = ['create', 'update'];
    const exclusiveGroup = ['create', 'check', 'approve', 'authorize'];
    const standalonePrimary = 'delete';
    const dependentView = 'view';
    const allPrimaries = ['create', 'update', 'delete', 'check', 'approve', 'authorize'];

    // Helper to turn off all primaries except the ones specified
    const turnOffAllPrimariesExcept = (except: string[] = []) => {
      allPrimaries.forEach((name) => {
        if (!except.includes(name)) {
          const id = permIds[name as keyof typeof permIds];
          if (id) updated[id] = false;
        }
      });
    };

    // --- 1. Apply Click Logic & Rules ---

    if (linkGroup.includes(permissionName)) {
      // Rule 3: create/update are linked
      if (permIds.create) updated[permIds.create] = isTurningOn;
      if (permIds.update) updated[permIds.update] = isTurningOn;
      if (isTurningOn) {
        // Rule 2 & 4: Single primary & exclusivity
        turnOffAllPrimariesExcept(linkGroup);
      }
    } else if (permissionName === standalonePrimary) {
      // Rule 6: delete is standalone
      if (permIds.delete) updated[permIds.delete] = isTurningOn;
      if (isTurningOn) {
        // Rule 2: Single primary
        turnOffAllPrimariesExcept([standalonePrimary]);
      }
    } else if (exclusiveGroup.includes(permissionName)) {
      // Rule 4: check, approve, authorize are exclusive
      const id = permIds[permissionName as keyof typeof permIds];
      if (id) updated[id] = isTurningOn;
      if (isTurningOn) {
        // Rule 2 & 4: Single primary & exclusivity
        turnOffAllPrimariesExcept([permissionName]);
      }
    } else if (permissionName === dependentView) {
      // Rule 5: View clicked manually
      if (permIds.view) updated[permIds.view] = isTurningOn;
    }
    // Note: Other permission types would be handled here if they existed.

    // --- 2. Final Rule Enforcement (View Dependency) ---

    // Rule 3 & 5: Any primary permission grants 'view'
    const anyPrimaryActive = allPrimaries.some((name) => {
      const id = permIds[name as keyof typeof permIds];
      return id && updated[id];
    });

    if (permIds.view) {
      if (anyPrimaryActive) {
        // If any primary is on, 'view' MUST be on.
        updated[permIds.view] = true;
      } else if (permissionName !== dependentView) {
        // If no primary is on, AND we didn't just click 'view',
        // turn 'view' off (e.g., user just unchecked the last primary).
        updated[permIds.view] = false;
      }
      // else: (permissionName === dependentView)
      // User just clicked 'view' and no primaries are active.
      // Let their choice (isTurningOn) stand.
    }

    return updated;
  };

  const handleCheckboxChange = (permissionId: string, permissionName: string, model: string) => {
    setSelectedPermissions((prev) => {
      const isTurningOn = !prev[permissionId];
      // Apply rules for the single model that was clicked
      return applyRulesForModel(prev, model, permissionName, isTurningOn);
    });
  };

  const handleSelectAll = useCallback(
    (permissionName: string, isSelected: boolean) => {
      setSelectedPermissions((prev) => {
        let updated = { ...prev };
        // Apply rules for ALL models for the header that was clicked
        for (const model of models) {
          updated = applyRulesForModel(updated, model, permissionName, isSelected);
        }
        return updated;
      });
    },
    [models, permissions] // Re-run if models or permissions data changes
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Transform selectedPermissions to array in one operation
      const permissionsArray = Object.entries(selectedPermissions).map(([id, is_selected]) => ({
        id,
        is_selected
      }));

      await roleApiService.assignPermission({
        data: { permissions: permissionsArray, id: roleId },
        files: []
      });

      // Refresh permissions after successful submission
      await fetchPermissions();
    } catch (err) {
      setError('Error assigning permissions');
      console.error('Error submitting permissions:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [roleId, selectedPermissions, isSubmitting, fetchPermissions]);

  return {
    permissions,
    selectedPermissions,
    isLoading,
    isSubmitting,
    error,
    models,
    handleCheckboxChange,
    handleSelectAll,
    handleSubmit
  };
};

export default usePermissionSelection;
