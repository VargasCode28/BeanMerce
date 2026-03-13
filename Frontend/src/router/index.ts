import Dashboard from '@/views/Dashboard.vue'
import HistorialView from '@/views/HistorialView.vue'
import LoginView from '@/views/LoginView.vue'
import Perfil from '@/views/Perfil.vue'
import RealizarPago from '@/views/RealizarPago.vue'
import RegisterView from '@/views/RegisterView.vue'
import Shop from '@/views/Shop.vue'
import { createRouter, createWebHistory } from 'vue-router'




const router = createRouter({


  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/', 
    //   component: LoginView

    // },


    {path: '/login', component: LoginView},
    {path: '/', redirect: '/login'},

    
    {path: '/register', component: RegisterView},

    // {
    //   path: '/register',
    //   component: RegisterView

    // },

    {
      path: '/dashboard',
      component: Dashboard,
      meta: {requiresAuth: true, role: 'admin'}
    },

    {
      path: '/shop',
      component: Shop,
      meta: { requiresAuth: true, role: 'user'}
    },
    {
      path: '/realizar-pago',
      name: 'RealizarPago',
      component: RealizarPago,
      meta: {requiresAuth: true}

    },


    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      meta: {requiresAuth: true}
    },


    
    {path: '/historial', 
    component: HistorialView
  
    },



  ],
})




router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')
  const role  = localStorage.getItem('role')

//   if (to.meta.role && to.meta.role !== role) {
//     return next('/login')
//   }

//   next()

// })


  if(to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if(to.meta.role && to.meta.role !== role) {
    return next('/login')
  }

  next()
})

export default router
