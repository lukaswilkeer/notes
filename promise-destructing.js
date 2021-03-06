/*
	Demonstrate the use of destruct on async functions.
*/

const assert = require('assert')

// Fixme: Verificar especificação para resposta de erro
const resolved = [null, { body: {}, headers: {}, status: 200 }]

const testScenario = (err, body) => {
	if (err) console.error(err)

	assert(typeof(body), 'json', 'should return body')
	assert(body, {}, 'should return empty object')
	assert(typeof err, 'null')
}

const toResolve = new Promise((resolve, reject) => setTimeout(resolve(resolved), 300))

return (async function __test(test, resolver) {
	try {
		const [err, body] = await resolver
		test(err, body)
	} catch (e) {
		console.error(e)
	}
})(testScenario, toResolve)
