import {lazy} from 'react';
import {ROLE} from '@/constants';
import {IRouteProps} from '@/router/types';
import {HOME} from './constants';

// Common Pages.
import NoMatch from '@/views/exception/404';

/* ==========* USER PAGES *========== */

const routesMap: IRouteProps[] = [
    {
        path: [HOME.ROOT.path, HOME.__USER__.PUZZLE.path],
        component: lazy(() => import('@/views/home/_user/puzzle')),
        exact: true,
        meta: {
            title: HOME.__USER__.PUZZLE.name,
            requiresAuth: false,
            // requiresRoles: [ROLE.MEMBER],
        },
    },
    {
        path: HOME.NO_MATCH.path,
        component: NoMatch,
        meta: {
            requiresAuth: false,
            title: HOME.NO_MATCH.name,
        },
    },
];

export default routesMap;
