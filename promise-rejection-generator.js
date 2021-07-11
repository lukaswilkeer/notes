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

function* generatePromise (url) {
    yield { done: false, value: axios(url).catch(null)}
}

async function processQueue (promise) {
    let result = await promise.catch(null);
    return result;
};

(async (urls) => {
    let promiseQueue = [];
    let promiseListResult = [];

    for await (const url of urls) {
        for await (const promise of generatePromise(url)) {
            promiseQueue.push(promise);
        }
    }
    
    for await (const promise of promiseQueue) {
        let result = await promise.value;
        promiseListResult.push(result);
    }

    const haveSomePromiseFailed = promiseListResult.filter((value) => value == null).length > 0

    assert(haveSomePromiseFailed, true)  
})(urls)
