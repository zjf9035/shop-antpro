export default [
  {
    path: '/login',
    exact:true,
    layout: false,
    component:'@/pages/Login'
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component:'@/pages/Dashboard',
    icon:'PieChartOutlined'
  },
  {
    path:'/user',
    name:'user',
    component:'@/pages/User',
    icon:'UserOutlined'
  },
  {
    path:'/goods',
    name:'goods',
    component:'@/pages/Goods',
    icon:'ShoppingOutlined'
  },
  {
    component: './404',
  },
];
