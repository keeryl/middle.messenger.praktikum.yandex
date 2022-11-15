import Handlebars from 'handlebars/dist/handlebars.runtime';
import * as styles from './ProfileInput.module.css';
import profileInput from './ProfileInput.hbs';
Handlebars.registerPartial('profileInput', (props) => profileInput({ styles, props }));
