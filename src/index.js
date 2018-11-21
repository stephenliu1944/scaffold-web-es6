import 'styles/main.css';
import 'core-js/fn/object/assign';
import 'core-js/fn/array';
import 'core-js/fn/promise';
/**
 * Demo 示例
 */
import Home from 'containers/home/Home';

document.querySelector('#app').innerHTML = new Home().render();