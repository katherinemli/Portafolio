const routes = [
  { path: '/', name: 'home', component: () => import('pages/Main.vue') },
  { path: '/falabella', component: () => import('pages/works/Falabella.vue') },
  { path: '/wherex', component: () => import('pages/works/Wherex.vue') },
  { path: '/citiapps', component: () => import('pages/works/Citiapps.vue') },
  { path: '/teacher', component: () => import('pages/works/Teacher.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
