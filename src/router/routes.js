const makeRoutes = (store) => {
  const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {path: '',name:'index', component: () => import('pages/Index')},
        {path: 'cart', component: () => import('pages/cart.vue')},
        {path: 'lk', component: () => import('pages/lk.vue')},
        {path: 'checkout', component: () => import('pages/checkout.vue')},
        {path: 'promotions', component: () => import('pages/promotion.vue')},
        {path: 'about', component: () => import('pages/about.vue')},
        {path: 'delivery', component: () => import('pages/delivery.vue')},
        {path: 'contacts', component: () => import('pages/contacts.vue')},
        {path: 'order/:order_code', component: () => import('pages/order/order.vue')},
        {path: 'order_self/:order_code', component: () => import('pages/order/order_self.vue')},
        {path: 'policy', component: () => import('pages/policy')},
        {path: 'rules', component: () => import('pages/rules')},
        {path: 'vacancy', component: () => import('pages/vacancy')},
      ]
    },


    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
  ]
  return routes
}
export default makeRoutes
