tracking-url
------------

[![Build Status](https://travis-ci.org/wankdanker/node-tracking-url.svg)](https://travis-ci.org/wankdanker/node-tracking-url)

Get the carrier name and web url for a given tracking number

install
-------

```bash
npm install tracking-url
```

example
-------

```js
var tu = require('tracking-url');

console.log(tu('1Z12345E0291980793'));

/* //result
{ name: 'ups',
  url: 'http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=1Z12345E0291980793' }
*/

```

license
-------

MIT
