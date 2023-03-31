import { createRouter, createWebHashHistory, RouteRecordRaw, useRoute } from 'vue-router';
import { useUserStoreHook } from '../store/modules/user';

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: '/report',
    children: [
      {
        path: 'swagger',
        component: () => import('../views/swagger/index.vue'),
        name: 'swagger',
        meta: { title: 'swagger', breadcrumb: false }
      }, {
        path: 'report',
        component: () => import('../views/report/index.vue'),
        name: 'report',
        meta: { title: 'report' }
      }, {
        path: '/report/preview',
        component: () => import('../views/preview/index.vue'),
        name: 'report-preview',
        meta: { title: 'report-preview' }
      }, {
        path: '/monitor/preview',
        component: () => import('../views/preview/index.vue'),
        name: 'monitor-preview',
        meta: { title: 'monitor-preview' }
      }, {
        path: '/instrument',
        component: () => import('../views/instrument/index.vue'),
        name: 'instrument',
        meta: { title: 'instrument' }
      }, {
        path:"/hawkeye",
        component: () => import('../views/hawkeye/index.vue'),
        name: 'hawkeye',
        meta: { title: 'hawkeye' }
      }, {
        path:"/monitor",
        component: () => import('../views/monitor/index.vue'),
        name: 'monitor',
        meta: { title: 'monitor' }
      }, {
        path:"/monitor/csv",
        component: () => import('../views/csv/index.vue'),
        name: 'csv',
        meta: { title: 'csv' }
      }, {
        path:"/strategy",
        component: () => import('../views/strategy/index.vue'),
        name: 'strategy',
        meta: { title: 'strategy' }
      }, {
        path:"/strategy/edit",
        component: () => import('../views/strategy/edit.vue'),
        name: 'strategy-edit',
        meta: { title: 'strategy-edit' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter,
  scrollBehavior: () => ({ left: 0, top: 0})
})

router.beforeEach((to, from, next) => {
  const user = useUserStoreHook();
  if (to.path !== '/login' && !user.token) {
    next({ path: '/login' });
  }
  next();
})

export default router;
