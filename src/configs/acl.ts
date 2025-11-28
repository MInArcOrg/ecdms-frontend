import { Ability, PureAbility, MongoQuery, createMongoAbility } from '@casl/ability';
import type { AnyMongoAbility } from '@casl/ability'; // 👈 IMPORTED FOR TYPE FIX

// --- Core CASL Types ---

export type Subjects = string;
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// 🐛 FIXED: AppAbility is now defined using AnyMongoAbility, which matches the return type of createMongoAbility.
// This resolves the TypeScript overload error in useQuery.
export type AppAbility = AnyMongoAbility | undefined; 

export const AppAbility = Ability as any; 

// Type for the object used to check permissions on routes/components
export type ACLObj = {
  action: Actions;
  subject: string;
};

// --- Updated Ability Builder & Definitions ---

/**
 * 💡 Utility function to manually create the ability instance if needed outside AclGuard.
 * @param rules The array of CASL rules fetched from the backend API.
 * @returns An AppAbility instance.
 */
export const createAbilityFromRules = (rules: any[]): AppAbility => {
  return createMongoAbility(rules, {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object.type
  });
};


// Default object used for fallbacks or generic checks
export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
};

// Exporting createAbilityFromRules instead of the old defineRulesFor
export default createAbilityFromRules;