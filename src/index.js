
import Chat from './pages/Chat/Chat.js';
import Page_404 from './pages/Page_404/Page_404.js';
import Page_500 from './pages/Page_500/Page_500.js';
import Profile from './pages/Profile/Profile.js';
import Signin from './pages/Signin/Signin.js';
import Signup from './pages/Signup/Signup.js';

import useInputValidation from '../src/utils/inputValidator.js';

const [formValues, errors, validateInput, validateForm] = useInputValidation();

const PAGES = {
  'chat': Chat,
  'page_404': Page_404,
  'page_500': Page_500,
  'profile': Profile,
  'signin': Signin,
  'signup': Signup,
}

function renderPage(name) {
  const root = document.querySelector('#app');
  const component = PAGES[name];
  const page = new component({formValues, errors, validateInput, validateForm});
  root.innerHTML = '';
  root.append(page.getContent());
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const profile = new Profile({formValues, errors, validateInput, validateForm});
  root.append(profile.getContent());
});
