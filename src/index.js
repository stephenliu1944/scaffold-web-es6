import 'images/favicon.ico';
import 'styles/main.scss';
import { settings, proxyHost } from '@beancommons/http';
import Home from 'containers/home/Home';

// set global http settings.
settings({
    baseURL: __DEV__ && __DOMAIN__,
    proxyPath: __DEV__ && proxyHost,
    isDev: __DEV__
});

document.querySelector('#app').innerHTML = new Home().render();