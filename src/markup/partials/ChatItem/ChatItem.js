import Handlebars from 'handlebars/dist/handlebars.runtime';
import * as styles from './ChatItem.module.css';
import chatItem from './ChatItem.hbs';
Handlebars.registerPartial('chatItem', (props) => chatItem({ styles, props }));
