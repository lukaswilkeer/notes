/*
	The goal here is demonstrate the use of async/await on map operations.
*/

const assert = require('assert')

const promise = result => new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 3000)
})

return (async () => {
	console.log('Init assertions')

	const assertions = (result) => assert([true, false], result)

	const testScenarios = [promise(true), promise(false)]

	const result = await Promise.allSettled(testScenarios.map(value => value.catch(console.error)))

	assertions(result)
})();
