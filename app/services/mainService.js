'use strict';

import Request from 'superagent';

export default class Service {

    getRequest(url) {
        return new Promise(function (resolve, reject) {
            Request
                .get(url)
                .end(function (err, res) {
                    if (err) {
                        reject(console.dir(err));
                    } else {
                        resolve(res);
                    }
                });
        });
    }
}
