/*
  The goal here is to demonstrate de use o assync operatios  on  a composition.

  For that we create e transpose applicative that taks n numbers of functions an apply a pipe into it.
*/

const assert = require('assert')

const transform = async (...args) => {
  this.finalResult = []
  this.intermediateResult = null;

  try {
    if (typeof args[args.length] == 'number') {
      this.index = args.length
      args.pop()
    }

    if (this.index == undefined) this.index = args.length;
  } catch (err) {
    this.index = args.length
  }

  if (this.finalResult.length == 0) {
    this.intermediateResult = await args[this.index];
    this.finalResult.push(this.intermediateResult)
  } else {
    this.intermediateResult = await args[this.index](this.finalResult[this.finalResult.length]);
  }

  if (args.length >= this.index && this.index >= -1) {
    this.index = this.index - 1
    return transform(args, this.index);
  } else {
    this.finalResult[this.finalResult.length];
  }
}

const add1 = (x) => (y) => x+y
  
const promise = (number) => new Promise((resove, reject) => {
  return setTimeout(() => number, 3000)
})

const test = (result, toAssert) => {
	assert(result, toAssert)
}

const promiseWait = async () => await promise(1)

test(1, transform(connect(1)))
test(2, transform(add1, promiseWait(1)))
