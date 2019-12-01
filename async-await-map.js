/*
	The goal here is demonstrate the use of async/await on map operations.
	Mapping promises inside a function means that has no need on Promise.all.
	On other scenario you will need, ex:

	const result = Promise.all(someFunction(someAsyncTask(mappedPromises)))
*/

const assert = require('assert')

const promise = result => new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 3000)
})

return (async () => {
	console.log('Init assertions')

	const assertions = (result) => assert([true, false], result)

	const testScenarios = [promise(true), promise(false)]

	assert(testScenarios.map(value => value.catch(console.error)))
})();
