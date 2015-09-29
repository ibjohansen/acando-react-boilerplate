'use strict';

import React from 'react';
import Loader from './components/loader';
import Actions from '../actions/mainActions.js'
import Store from '../stores/mainStore.js'
import Reflux from 'reflux';

let Page = React.createClass({

    displayName: 'app/pages/index.js',

    mixins: [
        Reflux.listenTo(Store, 'onStoreUpdated')
    ],

    getInitialState(){
        return {userName: ''};
    },

    componentWillMount(){
        this.getNewUserName();
    },

    onStoreUpdated(payload){
        this.setState({userName: payload.data})
    },

    getNewUserName(){
        Actions.GetUserName();
    },

    renderContent(){
        if ('' === this.state.userName) {
            return (
                <Loader/>
            )
        } else {
            return (
                <span>
                <h2>{this.state.userName}</h2>
                        <h3>Example GET from <a href="http://apigram.herokuapp.com/artifex/new" target="_blank">apigram.herokuapp.com/artifex/new</a>
                        </h3>
                        <h5>The service generates a username based on a list of adjectives and nouns</h5>

                        <h3>
                            <button className="btn paper paper-raise" type="button" name="button"
                                    onClick={this.getNewUserName}>Get a new name!
                            </button>
                        </h3>
               </span>
            )
        }
    },

    render() {
        return (
            <div className="row">
                <span className="col-md-3"></span>
                    <span className="col-md-6">
                        <br/><br/>
                        <img src="images/acando_logo_blue.png" alt="acando.no" width="350"/>
                        <br/><br/>
                        {this.renderContent()}
                    </span>
                <span className="col-md-3"></span>
            </div>
        )
    }
});

export default Page;