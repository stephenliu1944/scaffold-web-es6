import catPNG from 'images/cat.png';
import styles from './home.scss';
import SubComponent from './components/subComponent/SubComponent';

export default class Home {
    
    constructor() {
        this.sub = new SubComponent();
    }

    render() {
        return (`
            <div class=${styles.home}>
                <h1>Home</h1>
                <h1>我是容器组件</h1>
                <img src=${catPNG} /> 
                ${this.sub.render()}
            </div>
        `);
    }
}