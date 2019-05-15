import 'images/favicon.ico';
import 'styles/main.scss';
import http, { helpers } from '@beancommons/http';
import Home from 'containers/home/Home';

// set global http settings.
http.settings({
    baseURL: __DEV__ && __DOMAIN__,
    proxyPath: __DEV__ && helpers.proxyHost(),
    isDev: __DEV__
});

document.querySelector('#app').innerHTML = new Home().render();