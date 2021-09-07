/*
 * The goal of this note is demonstrate how to handle errors on a functional style.
 *
 * To achive this goal we use an interface (how demonstrated in haskell) on a pipeline,
 * if an error ocurr, it gets logged into the system¹, if not, the program continues it's executations.
 * 
 * Because of mapM_ we can constrol this situation.
 * 
 * See the try-catch-error-handling.js for more information.
 *
 * Sidenotes:
 * 1 - Loggins things is a side-effect, by correctnes, we needed to avoid this.
*/

const assert = require('assert')

// mapM_
const mapM_ = (fa, fb) => fa(fb())

// to use the tenary if whe need a pipe and tap 
const errorHandler = (arg) => {
    if (!(arg instanceof Error) && !(isNaN(arg))) {
        return arg
    } else {
        const err = new Error('Not a number')
        // log into the system, 
        console.error(err)
    }
}

// util function to create pure arguments 
const pureNumber = (arg) => () => typeof arg == 'number' && !(isNaN(arg)) ? arg : undefined

// sum function
const sum = (n) => n + 1

// this interface provide us a way to interact with the system, in this case,
// and work without crashign the entire system.
const performCalcApplicative = (sum, number) => () => sum(number());

(() => { 
    // Monad m => (a -> m b) -> t a -> m (t b) 
    const a1 = mapM_(errorHandler, performCalcApplicative(sum, pureNumber(1)))
    const a2 = mapM_(errorHandler, performCalcApplicative(sum, pureNumber(43)))
    const a3 = mapM_(errorHandler, performCalcApplicative(sum, pureNumber(undefined)))

    assert.strictEqual(a1, 2)
    assert.strictEqual(a2, 44)
    assert.strictEqual(a3, undefined)
})()