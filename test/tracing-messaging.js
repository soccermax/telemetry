module.exports = (CASE, CHECK) => {
  const cds = require('@sap/cds')
  const { expect, POST } = cds.test().in(__dirname + '/bookshop')
  const log = cds.test.log()

  const wait = require('node:timers/promises').setTimeout

  const admin = { auth: { username: 'alice' } }

  const rm = () => {
    try {
      require('fs').rmSync(require('path').join(__dirname, CASE))
    } catch {
      // ignore
    }
  }

  beforeAll(async () => {
    rm()
    await wait(100)
  })

  afterAll(async () => {
    await wait(100)
    rm()
  })

  beforeEach(log.clear)

  test('emit is traced', async () => {
    await POST('/odata/v4/admin/test_emit', {}, admin)
    await wait(1000)
    // execute case specific check
    CHECK(log, expect)
  })
}
