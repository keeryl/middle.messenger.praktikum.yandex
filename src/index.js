// import './markup/partials/AuthButton/AuthButton.js';
// import './markup/partials/AuthInput/AuthInput.js';
// import './markup/partials/ChatItem/ChatItem.js';
// import './markup/partials/ProfileInput/ProfileInput.js';

import Chat from './pages/chat/chat.js';

// import page_404Template from './pages/page_404/page_404.js';
// import page_500Template from './pages/page_500/page_500.js';
// import profileTemplate from './pages/profile/profile.js';
// import signinTemplate from './pages/signin/signin.js';
// import signupTemplate from './pages/signup/signup.js';

// const PAGES = {
//   'chat': chatTemplate,
//   'page_404': page_404Template,
//   'page_500': page_500Template,
//   'profile': profileTemplate,
//   'signin': signinTemplate,
//   'signup': signupTemplate,
// }

// function renderPage(name) {
//   const root = document.querySelector('#app');
//   const template = PAGES[name];
//   const html = template;
//   root.innerHTML = html;
// }

// window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const chat = new Chat();
  console.log(chat);
  root.append(chat.getContent());
  // const html = chatTemplate;
  // root.innerHTML = html;
});
