import styles from './subComponent.scss';

export default class SubComponent {

    constructor() {}

    render() {
        return `
            <div class=${styles.subComponent}>
                <h3>SubComponent</h3>
                <h3>我是子组件</h3>
            </div>
        `;
    }
}