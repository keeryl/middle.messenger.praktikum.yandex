import { Block } from '../src/utils/Block';
import Chat from './pages/Chat/Chat';
import Page_404 from './pages/Page_404/Page_404';
import Page_500 from './pages/Page_500/Page_500';
import Profile from './pages/Profile/Profile';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import useInputValidation from '../src/utils/inputValidator';

const [formValues, errors, validateInput, validateForm] = useInputValidation();

type Pages = {
  [key: string]: typeof Block
}

const PAGES: Pages = {
  'chat': Chat,
  'page_404': Page_404,
  'page_500': Page_500,
  'profile': Profile,
  'signin': Signin,
  'signup': Signup,
}

function renderPage(name: string): void {
  const root: HTMLElement | null = document.querySelector('#app');
  const component = PAGES[name];
  const page = new component({ formValues, errors, validateInput, validateForm });
  root!.innerHTML = '';
  root!.append(page.getContent());
}

(window as any).renderPage = renderPage;
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const profile = new Profile({formValues, errors, validateInput, validateForm});
  root!.append(profile.getContent());
});
