// resources/js/hooks/useMenuItems.ts
import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from '@/data/menu-items';
import { filterMenuByPermissions } from '@/helpers/menu';
import { MenuItemType } from '@/types/menu';
import { usePage } from '@inertiajs/react';

type PageProps = {
    auth?: {
        user?: {
            permissions?: string[];
            is_full_access?: boolean;
        };
    };
};

export const useMenuItems = (): MenuItemType[] => {
    const { auth } = usePage<PageProps>().props;

    const permissions = auth?.user?.permissions ?? [];
    const isFullAccess = !!auth?.user?.is_full_access;

    return filterMenuByPermissions(MENU_ITEMS, {
        isFullAccess,
        permissions,
    });
};

export const useHorizontalMenuItems = (): MenuItemType[] => {
    const { auth } = usePage<PageProps>().props;

    const permissions = auth?.user?.permissions ?? [];
    const isFullAccess = !!auth?.user?.is_full_access;

    return filterMenuByPermissions(HORIZONTAL_MENU_ITEM, {
        isFullAccess,
        permissions,
    });
};
