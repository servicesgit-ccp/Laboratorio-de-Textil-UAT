import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from '@/data/menu-items';
import { MenuItemType } from '@/types/menu';

type PermissionContext = {
    isFullAccess: boolean;
    permissions: string[];
};

export const filterMenuByPermissions = (items: MenuItemType[], ctx: PermissionContext): MenuItemType[] => {
    const { isFullAccess, permissions } = ctx;
    if (isFullAccess) {
        return items;
    }

    const canSee = (item: MenuItemType): boolean => {
        if (!item.permission) return true;
        return permissions.includes(item.permission);
    };

    const process = (list: MenuItemType[]): MenuItemType[] => {
        const out: MenuItemType[] = [];

        for (const item of list) {
            const children = item.children ? process(item.children) : [];
            const hasPermission = canSee(item);

            if (item.permission) {
                if (!hasPermission) {
                    continue;
                }

                const normalizedChildren = children.length > 0 ? children : undefined;

                out.push({
                    ...item,
                    children: normalizedChildren,
                });
            } else {
                if (hasPermission || children.length > 0) {
                    const normalizedChildren = children.length > 0 ? children : undefined;

                    out.push({
                        ...item,
                        children: normalizedChildren,
                    });
                }
            }
        }

        return out;
    };

    return process(items);
};

export const getMenuItems = (): MenuItemType[] => {
    return MENU_ITEMS;
};
export const getHorizontalMenuItems = (): MenuItemType[] => {
    return HORIZONTAL_MENU_ITEM;
};

export const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
    let parents: string[] = [];
    const parent = findMenuItem(menuItems, menuItem.parentKey);
    if (parent) {
        parents.push(parent.key);
        if (parent.parentKey) {
            parents = [...parents, ...findAllParent(menuItems, parent)];
        }
    }
    return parents;
};

export const getMenuItemFromURL = (items: MenuItemType | MenuItemType[], url: string): MenuItemType | undefined => {
    if (items instanceof Array) {
        for (const item of items) {
            const foundItem = getMenuItemFromURL(item, url);
            if (foundItem) {
                return foundItem;
            }
        }
    } else {
        if (items.url == url) return items;
        if (items.children != null) {
            for (const item of items.children) {
                if (item.url == url) return item;
            }
        }
    }
};

export const findMenuItem = (menuItems: MenuItemType[] | undefined, menuItemKey: MenuItemType['key'] | undefined): MenuItemType | null => {
    if (menuItems && menuItemKey) {
        for (const item of menuItems) {
            if (item.key === menuItemKey) {
                return item;
            }
            const found = findMenuItem(item.children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};
