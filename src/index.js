import 'images/favicon.ico';
import 'styles/main.scss';
import http from 'axios-enhanced';
import Home from 'containers/home/Home';

// set global http settings.
http.settings({
    proxyPath: __DEV__ && '/proxy',     
    isDev: __DEV__
});

document.querySelector('#app').innerHTML = new Home().render();