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

	const testScenarios = [true, false]

	assertions(testScenarios.map((value) => promise(value).catch(console.error)))
})();
