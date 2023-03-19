import AuthController from './controllers/AuthController';
import { Chat } from './pages/Chat/Chat';
import Page_404 from './pages/Page_404/Page_404';
import Page_500 from './pages/Page_500/Page_500';
import { ProfilePage } from './pages/Profile/Profile';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Router from './utils/Router';

enum Routes {
  'Home' = '/messenger',
  'Profile' = '/settings',
  'Signin' = '/',
  'Signup' = '/sign-up',
  'Page_404' = '/page_404',
  'Page_500' = '/page_500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Home, Chat)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Signin, Signin)
    .use(Routes.Signup, Signup)
    .use(Routes.Page_404, Page_404)
    .use(Routes.Page_500, Page_500)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Signin:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Home)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Signin);
    }
  }

});
