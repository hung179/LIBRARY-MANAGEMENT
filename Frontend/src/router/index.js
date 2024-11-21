import { createWebHistory, createRouter } from 'vue-router';
import Main from '../components/Unknow/partials/Main.vue';
import User from '../components/User/partials/Main.vue';
import Admin from '../components/Admin/partials/Main.vue';

import unknowHome from '../components/Unknow/home/Home.vue';
import unknowSearch from '../components/Unknow/Search/Search.vue';

import userHome from '../components/User/home/Home.vue';
import userSearch from '../components/User/Search/Search.vue';
import userHistory from '../components/User/history/history.vue';

import adminHome from '../components/Admin/home/Home.vue';
import adminSearch from '../components/Admin/Search/Search.vue'
import adminCreate from '../components/Admin/bookManagement/bookManagement.vue';
import adminFix from '../components/Admin/bookManagement/fixbook.vue'

import contact from '../components/contact/contact.vue';

import forBidden from '../components/Forbidden/forBidden.vue';

import store from '../store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main,
        children: [
            {
                path: '',
                name: 'home-unknown',
                component: unknowHome
            },
            {
                path: 'search',
                name: 'search-unknow',
                component: unknowSearch
            },
            {
                path: 'forbidden',
                name: 'forbidden',
                component: forBidden
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        children: [
            {
                path: '',
                name: 'user-home',
                component: userHome
            },
            {
                path: 'search',
                name: 'user-search',
                component: userSearch
            },
            {
                path: 'history',
                name: 'user-history',
                component: userHistory
            },
            {
                path: 'contact',
                name: 'user-contact',
                component: contact
            }
        ],
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        children: [
            {
                path: '',
                name: 'admin-home',
                component: adminHome
            },
            {
                path: 'search',
                name: 'admin-search',
                component: adminSearch
            },
            {
                path: 'book-management',
                name: 'admin-book-management',
                component: adminCreate
            },
            {
                path: 'fixBook/:id',
                name: 'admin-fix-book',
                component: adminFix
            }
        ],
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // Kiểm tra đăng nhập
    if (to.meta.requiresAuth) {
        if (!store.getters['auth/isAuthenticated']) {
            return next('/'); // Chuyển hướng đến trang đăng nhập
        }
        
        // Kiểm tra quyền
        const role = store.getters['auth/userRole'];
      if (!to.meta.roles.includes(role)) {
        return next('/forbidden'); // Trang bị cấm truy cập
      }
    }
    next();
  });

export default router;