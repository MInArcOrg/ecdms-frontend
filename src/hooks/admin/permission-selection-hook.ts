import { useState, useEffect, useCallback, useMemo } from "react";
import roleApiService from "src/services/admin/role-service";
import Permission from "src/types/admin/role/permission";

const usePermissionSelection = (roleId: string, module: string) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetchPermissions function
  const fetchPermissions = useCallback(async () => {
    if (!roleId || !module) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await roleApiService.getPermissionsByRole(roleId, {
        filter: { module },
      });

      const initialPermissions = response.payload;
      setPermissions(initialPermissions);

      // Create initial selections object in one pass
      const initialSelections = initialPermissions.reduce(
        (acc, permission) => {
          acc[permission.id] = permission.selected;
          return acc;
        },
        {} as { [key: string]: boolean },
      );

      setSelectedPermissions(initialSelections);
    } catch (err) {
      setError("Error loading permissions");
      console.error("Error fetching permissions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [roleId, module]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Memoize derived data
  const models = useMemo(
    () =>
      Array.from(new Set(permissions.map((permission) => permission.model))),
    [permissions],
  );

  const handleCheckboxChange = useCallback((permissionId: string) => {
    console.log("change is made on this id", permissionId);
    setSelectedPermissions((prevState) => ({
      ...prevState,
      [permissionId]: !prevState[permissionId],
    }));
  }, []);

  const handleSelectAll = useCallback(
    (isSelected: boolean, name: string) => {
      setSelectedPermissions((prevSelections) => {
        const updatedSelections = { ...prevSelections };
        permissions.forEach((permission) => {
          if (permission.name.includes(name)) {
            updatedSelections[permission.id] = isSelected;
          }
        });
        return updatedSelections;
      });
    },
    [permissions],
  );

  const handleModelSelectAll = useCallback(
    (model: string, isSelected: boolean) => {
      setSelectedPermissions((prevSelections) => {
        const updatedSelections = { ...prevSelections };
        permissions.forEach((permission) => {
          if (permission.model === model) {
            updatedSelections[permission.id] = isSelected;
          }
        });
        return updatedSelections;
      });
    },
    [permissions],
  );
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Transform selectedPermissions to array in one operation
      const permissionsArray = Object.entries(selectedPermissions).map(
        ([id, is_selected]) => ({
          id,
          is_selected,
        }),
      );

      await roleApiService.assignPermission({
        data: { permissions: permissionsArray, id: roleId },
        files: [],
      });

      // Refresh permissions after successful submission
      await fetchPermissions();
    } catch (err) {
      setError("Error assigning permissions");
      console.error("Error submitting permissions:", err);
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
    handleModelSelectAll,
    handleSubmit,
  };
};

export default usePermissionSelection;
