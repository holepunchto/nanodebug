const bench = require('nanobench')

const debug = false
const n = 2000000000

bench('baseline', (b) => {
  const xor = (x, y) => x ^ y

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('if (debug) console.error()', (b) => {
  const xor = (x, y) => {
    if (debug) console.error('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('noop(() => console.error())', (b) => {
  const noop = () => {}

  const xor = (x, y) => {
    noop(() => console.error('Debugging is disabled'))
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('noop(value)', (b) => {
  const noop = () => {}

  const xor = (x, y) => {
    noop('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('nanodebug(() => console.error())', (b) => {
  const nanodebug = require('.')()

  const xor = (x, y) => {
    nanodebug(() => console.error('Debugging is disabled'))
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('nanodebug(value)', (b) => {
  const nanodebug = require('.')()

  const xor = (x, y) => {
    nanodebug('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench('if (nanodebug.enabled) nanodebug(value)', (b) => {
  const nanodebug = require('.')()

  const xor = (x, y) => {
    if (nanodebug.enabled) nanodebug('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench.skip('debug(value)', (b) => {
  const debug = require('debug')('test')

  const xor = (x, y) => {
    debug('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench.skip('if (debug.enabled) debug(value)', (b) => {
  const debug = require('debug')('test')

  const xor = (x, y) => {
    if (debug.enabled) debug('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})

bench.skip('pino({ level: \'silent\' }).debug(value)', (b) => {
  const logger = require('pino')({ level: 'silent' })

  const xor = (x, y) => {
    logger.debug('Debugging is disabled')
    return x ^ y
  }

  let result = 0

  b.start()

  for (let i = 0; i < n; i++) result = xor(result, i)

  b.log(result)
  b.end()
})
