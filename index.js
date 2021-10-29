module.exports = (options = {}) => {
  const log = options.log || console.error.bind(console)

  const debug = !options.enabled
    ? () => {} // noop
    : (fn, ...args) => {
        // debug(fn)
        if (typeof fn === 'function') return fn()
        // debug(...args)
        return log(fn, ...args)
      }

  debug.enabled = !!options.enabled

  return debug
}
