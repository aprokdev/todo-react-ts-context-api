// import 'es5-shim';
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'polyfill-array-includes';
import 'ie-array-find-polyfill';

('use strict');

// Object.keys = objectKeys;

if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    // require('promise/lib/rejection-tracking').enable();
    // window.Promise = require('promise/lib/es6-extensions.js');
}
// fetch() polyfill for making API calls.
// require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
// Object.assign = require('object-assign');
// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
    // require('raf').polyfill(global);
}

// import 'core-js/es/object/entries';
// IE 10:
// import 'core-js/features/map';
// import 'core-js/features/set';
// import 'core-js/features/symbol';
// import 'core-js/es/array/from';
// import 'events-polyfill';
// import './dataset-polyfill'; // for safe use Dropdown component in IE10

// IE 11:
// import 'core-js/features/url';
// import 'core-js/features/url-search-params';
// import objectKeys from 'object-keys-x';
