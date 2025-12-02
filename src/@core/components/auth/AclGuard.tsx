// ** React Imports
import { ReactNode } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** TanStack Query Import
import { useQuery } from '@tanstack/react-query';

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl';

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can';

// ** Component Import
import NotAuthorized from 'src/pages/401';
import Spinner from 'src/@core/components/spinner';
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Hooks
import { useAuth } from 'src/hooks/useAuth';

// ** Services & CASL
import { createMongoAbility } from '@casl/ability';
import permissionApiService from 'src/services/admin/permission-service';

interface AclGuardProps {
  children: ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  aclAbilities: ACLObj; // This is Component.acl ?? defaultACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props;

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  const userId = auth.user?.id;
  const queryEnabled = !!auth.user && !auth.loading;

  // 1. FETCH PERMISSIONS VIA useQuery
  const { data: ability, isLoading } = useQuery<AppAbility>({
    queryKey: ['userPermissions', userId],
    enabled: queryEnabled,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const response = await permissionApiService.getUserPermission({});
      // Ensure fetchedRules is an array 
      let fetchedRules = response.payload || [];

      if (!Array.isArray(fetchedRules)) {
        console.warn("Permission API did not return an array. Using empty array.");
        fetchedRules = [];
      }
     

      // ❌ REMOVED: Role-based check is gone. 
      // Permissions (including 'manage: all', if granted) must come from the API payload.

      // Creates the CASL ability instance from the rules
      // Casting is necessary to satisfy TypeScript's strict type checking between useQuery and CASL.
      fetchedRules.push({ action: 'view', subject: 'dashboard' });
      return createMongoAbility(fetchedRules) as AppAbility;
    },
  });

  // ---

  // 2. RENDER LOGIC

  // A. Guest Guard / Public Routes / Errors
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard || router.route === '/') {
    return <>{children}</>;
  }

  // B. Loading/Authentication State
  if(auth.loading){
    console.log('loading auth')
  }else{
    console.log('not loading auth')
  }

  if (auth.loading || isLoading) {
    return (
        <Spinner />
    );
  }

  // C. Not Logged In (For Protected Routes)
  if (!auth.user) {
    // Redirect to login page
    router.replace('/login');
    return <Spinner />;
  }

  // D. Authorized
  // Check if the loaded ability (from API rules) allows the required action/subject 
  // (which is defined by Component.acl OR the defaultACLObj: {manage: all}).
  if (ability && aclAbilities.action == 'manage' && aclAbilities.subject === 'all') {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  // E. Not Authorized
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export default AclGuard;