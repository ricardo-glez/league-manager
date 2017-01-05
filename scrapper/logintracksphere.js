require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const {
    mainStory
} = require('storyboard/lib/withConsoleListener');
console.log('TEXT',fetch('http://p0298.tracktio.com:9000/auth'))
Promise.resolve().then(() => fetch('http://p0298.tracktio.com:9000/auth', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'inputEmail': 'dgonzalez',
            'inputPassword': 's3cret',
        }),
    }).then((res) => {
        mainStory.info('Results:', {attach: res});
   //console.log('Results',res.token)
        return res.token;
    }).catch((err) => {
        mainStory.error('Could not authenticate', {
            attach: err
        });
        process.exit(1);
    }))
