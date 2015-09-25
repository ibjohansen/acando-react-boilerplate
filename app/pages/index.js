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
        Actions.GetUserName();
    },

    onStoreUpdated(payload){
        this.setState({userName: payload.data})
    },

    renderContent(){
        if ('' === this.state.userName) {
            return <Loader/>
        } else {
            return (
                <div className="row">
                    <span className="col-md-3">left</span>
                    <span className="col-md-6">{this.state.userName}</span>
                    <span className="col-md-3">right</span>
                </div>
            )
        }
    },

    render() {
        return <span>{this.renderContent()}</span>;
    }
});

export default Page;