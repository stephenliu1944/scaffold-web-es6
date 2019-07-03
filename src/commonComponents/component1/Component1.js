import styles from './component1.scss';

export default class Component1 {

    constructor() {}

    render() {
        return `
            <div class=${styles.component1}>
                <h3>CommonComponent1</h3>
                <h3>我是公共组件</h3>
            </div>
        `;
    }
}