/*
 * The goal here is to prove that v2 ins't computed due to a catch error on v1
 * and demonstration how to propertly handle errors (if you need try/catch) on a *functional style
 * Remember that functional doesn't need try/catch.
 *
 * When an error is throwed inside a try/catch block, the entire code above is
 * ignored due to throw method. This can produce bugs or other botnecks if
 * the developer doesn't precisily pay attention to it.
 *
 * Otherside, the goal hasn't achived due to a mismatch on how trhow works.
 * Otherwise, this note demonstrate how to throw, handle and how it fits into JS.
 *
 * Sidenotes: 
 * 1 - throwAnError is not a functional style function.
 * 2 - it was used non const variable to achieve this goal
 */
const assert = require('assert')

const _testCase = (v1, v2) => {
    console.log('v2', v2)
    assert.strictEqual(v1, undefined)
    assert.strictEqual(v2, undefined)
}

const itens = [new Error('Something not cool'), true]

const getItens = (array, index) => {
    // just for the sake
    const checkIndex = (iten) => {
        return iten !== -1 && iten !== null && iten !== undefined
    }

    return checkIndex(array[index])
        ? array[index]
        : Error('some error')
}

const throwAnError = (err) => {
    throw new Error(err)
}

const errorHandler = (value) => {
    console.log('value', value)
    return (value instanceof Error)
        ? throwAnError(value) 
        : value 
}

((arrayOfItens) => {
    let v1, v2
    try {
        v1 = errorHandler(getItens(arrayOfItens, 0))
        v2 = errorHandler(getItens(arrayOfItens, 1))
    } catch (err) {
        console.error(err)
    }

    return _testCase(v1, v2)
})(itens)
