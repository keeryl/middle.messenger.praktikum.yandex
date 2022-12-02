
import Chat from './pages/Chat/Chat.js';
import Page_404 from './pages/Page_404/Page_404.js';
import Page_500 from './pages/Page_500/Page_500.js';
import Profile from './pages/Profile/Profile.js';
import Signin from './pages/Signin/Signin.js';
import Signup from './pages/Signup/Signup.js';

const PAGES = {
  'chat': Chat,
  'page_404': Page_404,
  'page_500': Page_500,
  'profile': Profile,
  'signin': Signin,
  'signup': Signup,
}

const chatData = {
  userName:'Андрей',
  lastMessage: "last message",
  counter: 3,
  time: "12:05"
}

function renderPage(name) {
  const root = document.querySelector('#app');
  const component = PAGES[name];
  const page = new component(chatData);
  root.innerHTML = '';
  root.append(page.getContent());
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const chat = new Chat();
  root.append(chat.getContent());
});
