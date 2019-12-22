/*
  The goal here is to prove that function composition doesn't need async/await blocks.

  Errata: on line 31 the goal can't be achived cause assert waits pending promises be resolved.

  On other side, you can use Promise.all to block the event (promise state) to be resolved, but this is not sementantic enougth,
  so, you use await blocks to handle this and handle erros.

  Don't forget to remember that is a composition, your data structure could/should mutate, so you can handle the error on a specific manner
  that don't trow awayt the entire composition and completes the stack with the error result.

  This is easy, but not mentioned anywhere.
*/

const assert = require('assert')
const axios = require('axios')

const add1 = (x) => (y) => x+y

const promise = (number) => new Promise((resove, reject) => {
	return setTimeout(() => number, 3000)
})

const connect = (result) => setTimeout(() => result, 3000);

const test = (result, toAssert) => {
	  assert(result, toAssert)
}

test(1, connect(1))
test(2, add1(promise(1), 1))
// test('array', typeof filter(request))
