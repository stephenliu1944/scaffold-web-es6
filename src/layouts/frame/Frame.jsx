import "./Frame.scss";
import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Loading from '../../components/loading/Loading';

export default class Frame extends Component {
    render() {
        return (
            <div className="frame">
                <Header />
                <div className="container">
                    {this.props.children}
                </div>
                <Footer />
                <Loading />
            </div>
        );
    }
}

