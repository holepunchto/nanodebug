import test from 'brittle'
import debug from './index.js'

test('constructing a default instance', (t) => {
  const d = debug()
  t.absent(d.enabled)
})

test('constructing an enabled instance', (t) => {
  const d = debug({ enabled: true })
  t.ok(d.enabled)
})

test('logging with a disabled instance', (t) => {
  t.plan(1)
  const d = debug({ log: () => t.fail() })
  t.absent(d.enabled)
  d('bug')
})

test('logging with an enabled instance', (t) => {
  t.plan(2)
  const d = debug({ enabled: true, log: (msg) => t.is(msg, 'bug') })
  t.ok(d.enabled)
  d('bug')
})
