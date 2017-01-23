export default [
  {
    path: '/',
    name: 'MainView',
    component: require('components/MainView')
  },
  {
    path: '/Setting',
    name: 'SettingView',
    component: require('components/SettingView')
  },
  {
    path: '/About',
    name: 'AboutView',
    component: require('components/AboutView')
  },
  {
    path: '/Done',
    name: 'DoneView',
    component: require('components/DoneView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
