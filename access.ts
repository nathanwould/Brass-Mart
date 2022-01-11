// At its simplest, access control is either a yes or no value depending on the user's session

import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map
  (permission => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission]
    }
  ]));

// Check if someone meets a criteria - yes or no
export const permissions = {
  ...generatedPermissions,
  // you can add any additional permissions here
};

// rules can return a boolean or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have permission of canManageProducts?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have permission of canManageProducts?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // If not, do they own this item?
    return { order: { user: { id: session.itemId } }};
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};