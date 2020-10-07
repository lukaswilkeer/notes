/*
  The goal here is to demonstrate de use o assync operatios  on  a composition.

  Don't forget to remember that is a composition, your data structure could/should mutate, so you should handle  errors on a specific manner
  that don't trow away the entire composition and completes the stack with the error result.

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

const promiseWait = async () => await promsie(1)

test(1, connect(1))
test(2, add1(promiseWaiti(), 1))
// test('array', typeof filter(request))
