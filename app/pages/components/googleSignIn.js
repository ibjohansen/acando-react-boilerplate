'use strict';

import React from 'react';

export default React.createClass({

    displayName: 'app/pages/components/googleSignIn.js',

    getInitialState(){
        return {
            gapiSignedIn: false,
            gapiId: '',
            gapiName: '',
            gapiImageUrl: '',
            gapiEmail: ''
        }
    },

    componentDidMount() {
        if (gapi) {
            gapi.signin2.render(this.refs.g_sign_in.getDOMNode(), {
                'scope': 'profile email',
                'width': 200,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.onSignIn
            });
        }
    },


    onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        const gapiId = profile.getId(); // READ!!! https://developers.google.com/identity/sign-in/web/backend-auth
        const gapiName = profile.getName();
        const gapiImageUrl = profile.getImageUrl();
        const gapiEmail = profile.getEmail();

        this.setState(
            {
                gapiSignedIn: true,
                gapiId: gapiId,
                gapiName: gapiName,
                gapiImageUrl: gapiImageUrl,
                gapiEmail: gapiEmail
            }
        )
    },

    renderProfileDetails(){
        const mailto = 'mailto:' + this.state.gapiEmail;
        if (this.state.gapiSignedIn) {
            return (
                <div className="profile-card">

                    <img src={this.state.gapiImageUrl} alt={this.state.gapiName}/>

                    <span className="p-col">

                      <span className="p-row">
                        <span className="p-head">Id:</span>
                        <span className="p-detail">{this.state.gapiId}</span>
                      </span>

                      <span className="p-row">
                        <span className="p-head">Name:</span>
                        <span className="p-detail">{this.state.gapiName}</span>
                      </span>

                      <span className="p-row">
                        <span className="p-head">Email:</span>
                        <span className="p-detail"><a
                            href={mailto}>{this.state.gapiEmail}</a></span>
                      </span>

                    </span>

                </div>
            )
        } else {
            return <span></span>
        }
    },

    render() {
        return (
            <div className="google-sign-in-container">
                <div className="google-sign-in">
                    <div ref="g_sign_in" data-onsuccess={this.onSignIn}/>
                    {this.renderProfileDetails()}
                </div>
            </div>
        )
    }
});


