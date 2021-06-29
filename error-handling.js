/*
 * The goal of this note is demonstrate how to handle errors on a functional style.
 *
 * To achive this goal we use an interface (how demonstrated in haskell) on a pipeline,
 * if an error ocurr, it gets logged into the system¹, if not, the program continues it's executations.
 * 
 * Because of the map and return format², we can avoid returning undefined to the program.
 * 
 * See the try-catch-error-handling.js for more information.
 *
 * Sidenotes:
 * 1 - Loggins thigs is a side-effect, by correctnes, we needed to avoid this.
 * 2 - For semantics, use teneraty if.
*/

const assert = require('assert')

const numbers = [0, undefined, 42]

const errorHandler = (argument) => {
    return argument instanceof Error ? console.error(argument) : argument
}

// util to create pure arguments 
const pure = (arg) => () => arg

// this interface provide us a way to interact with the system, in this case, the v8,
// and work without crashign the entire system.
const performCalculationApplicative = function () {}

performCalculationApplicative.prototype.calc = function (number, errorHandler) {
    const result = number() + 1

    return typeof result === 'number' && isNaN(result) === false 
        ? result
        : errorHandler(Error('Not a number'))
}; 

(() => {
    const performCalc = new performCalculationApplicative()

    const result = numbers 
        .map(number => performCalc.calc(pure(number), errorHandler))
        .map(number => performCalc.calc(pure(number), errorHandler))

    assert.deepStrictEqual(result, [2, undefined, 44])
})()