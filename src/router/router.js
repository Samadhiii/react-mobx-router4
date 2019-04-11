import Page404 from '../views/modules/Page404';
import PageHome from '../views/modules/PageHome';
import PageLogin from '../views/modules/PageLogin';
import PageTodo from '../views/pages/PageTodo';
import PageAbout from '../views/modules/PageAbout';
import PageTest from '../views/modules/PageTest';

export default [
  {
    path: '/login',
    component: PageLogin,
  },
  {
    path: '/page404',
    component: Page404,
  },
  {
    path: '/home',
    component: PageHome,
  },
  {
    path: '/test',
    component: PageTest,
    routes: [
      {
        path: '/test/todo',
        component: PageTodo,
      },
      {
        path: '/test/about',
        component: PageAbout,
      },
    ],
  },
];
