# nanodebug

A tiny, zero overhead debugging utility.

## Installation

```sh
npm install nanodebug
```

## Usage

By default, nanodebug is completely noop:

```js
const debug = require('nanodebug')()

// Does nothing!
debug('You encountered a %s!', '🐛')

// Also does nothing!
debug(() => { debug('It accepts functions as well') })

// This... does nothing!
await debug(async () => { debug('They can even be async!') })
```

Go ahead and put some `debug`s in your code and enable nanodebug when :bug: hits the fan:

```js
const debug = require('nanodebug')({ enabled: true })
```

By default, `debug` will log to stderr using `console.error`, which is also why we were able to specify a formatting string in the examples above. To change this, pass a `log` function in the options:

```js
const debug = require('nanodebug')({ log: console.log.bind(console) })
```

Now, `debug` will instead log to stdout using `console.log`.

## License

ISC
