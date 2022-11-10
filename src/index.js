import chatTemplate from './pages/chat/chat.hbs';
import page_404Template from './pages/page_404/page_404.hbs';
import page_500Template from './pages/page_500/page_500.hbs';
import profileTemplate from './pages/profile/profile.hbs';
import signinTemplate from './pages/signin/signin.js';
import signupTemplate from './pages/signup/signup.hbs';


const PAGES = {
  'chat': chatTemplate,
  'page_404': page_404Template,
  'page_500': page_500Template,
  'profile': profileTemplate,
  'signin': signinTemplate,
  'signup': signupTemplate,
}

function renderPage(name) {
  const root = document.querySelector('#app');
  const template = PAGES[name];
  const html = template();
  root.innerHTML = html;
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const html = signinTemplate;
  root.innerHTML = html;
});
