import Handlebars from 'handlebars/dist/handlebars.runtime';
import * as styles from './AuthButton.module.css';
import button from './AuthButton.hbs';
Handlebars.registerPartial('button', (props) => button({ styles, props }));
