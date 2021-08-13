/*
  The goal is to demonstrate how to handle async queues in a proper maner, withing error handling.
  
  To achieve this goal we use a simple queue of async tasks.
  This can be solved using Promise.all and a generator to generates the queue.
*/

const axios = require('axios')
const assert = require('assert')

const results = []

const urls = [
  'http://localhost:3000/endpointThatWorks',
  'http://localhost:3000/nowhere'
 ]

function* generatePromise (urls) {
    let index = 0;

    while (urls) {
        yield { done: false, value: axios(urls[index]).catch(null) }
        index++;
    }
}

async function mountPromiseQueue (promise) {
    let result = await promise.catch(null);
    return result;
};

(async (urls) => {
    let promiseQueue = [];
    let promisesListResult = [];

    for await (const promise of generatePromise(url)) {
        prmomiseQueue.push(promise);
    }
    
    for await (const promise of promiseQueue) {
        let result = promise.value;
        promisesListResult.push(result);
    }

    const haveSomePromiseFailed = promisesListResult.filter((value) => value == null).length > 0

    assert(haveSomePromiseFailed, true)  
})(urls)
