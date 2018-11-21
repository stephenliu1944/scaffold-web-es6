import SubComponent from './components/subComponent/SubComponent';

export default class Home {
    
    constructor() {
        this.sub = new SubComponent();
    }

    render() {
        return (
            `
            <h1>Home</h1>
            <h1>我是容器组件</h1>
            <p>${this.sub.render()}</p>
            `
        );
    }
}