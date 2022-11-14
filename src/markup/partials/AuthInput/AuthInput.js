import Handlebars from 'handlebars/dist/handlebars.runtime';
import * as styles from './AuthInput.module.css';
import authInput from './AuthInput.hbs';
Handlebars.registerPartial('authInput', (props) => authInput({ styles, props }));
