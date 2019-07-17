import catPNG from 'images/cat.png';
import styles from './home.scss';
import CommonComponent from 'commonComponents/component1/Component1';
import SubComponent from './components/component1/Component1';
import { getIPInfo, uploadURL } from 'services/demo';

export default class Home {
    
    constructor() {
        this.common = new CommonComponent();
        this.sub = new SubComponent();
        /** 
         * HTTP Demo 
         */ 
        // http request
        getIPInfo('210.75.225.254').then((data) => {

        }, (error) => {

        });
        // create a prerequest object
        var obj = uploadURL({
            name: 'stephen',
            age: 35
        });
        // obj: { url, params, data, headers }
    }

    render() {
        return `
            <div class=${styles.home}>
                <h1>Home</h1>
                <h1>我是容器组件</h1>
                <img src=${catPNG} /> 
                ${this.common.render()}
                ${this.sub.render()}
            </div>
        `;
    }
}