/*
	The goal here is demonstrate the use of async/await
*/

const assert = require('assert')

const promise = value => new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), 300)
})

return (async () => {
	// Note that is used assert.equal due the fact assert(false, false) doesnt work
	// expecting a true response. Don't know were the error comes from. Go try it yourself.
    const r1 = await promise(true).catch(console.error)
    const r2 = await promise(false).catch(console.error)

    console.log(typeof r2)
    assert.equal(r1, true)
    assert.equal(r2, false)
})();
