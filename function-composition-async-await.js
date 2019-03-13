/*
	The goal here is to prove that function composition doesn't need
	async/await blocks.
*/

const assert = require('assert')

const add1 = (x) => (y) => x+y

const promise = (number) => new Promise((resove, reject) => {
	setTimeout(() => {
		return number
	}, 3000)
})

const connect = (result) => setTimeout(() => result, 3000);

const test = (result, toAssert) => {
	assert(result, toAssert)
}

test(1, connect(1))
test(1, add1(promise(1)))