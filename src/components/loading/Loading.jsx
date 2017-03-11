import './Loading.scss';
import loading from '../../images/loading.gif';
import React, {Component} from 'react';
import classNames from 'classnames';
import {Event} from '../../constants/common';
import emitter from '../../utils/emitter';

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: true
        };
    }

    componentDidMount(){
        var loading = this;
        emitter.on(Event.SHOW_LOADING, () => {
            if(loading.state.hide){
                loading.setState({
                    hide: false
                });
            }
        });

        emitter.on(Event.HIDE_LOADING, () => {
            if(!loading.state.hide){
                loading.setState({
                    hide: true
                });
            }
        });
    }

    componentWillUnmount() {
        emitter.off(Event.SHOW_LOADING);
        emitter.off(Event.HIDE_LOADING);
    }

    render(){
        return (
            <div className={classNames({loading: true, hide: this.state.hide})}>
                <div className="loading-dialog">
                    <img src={loading} />
                </div>
            </div>
        );
    }
}
