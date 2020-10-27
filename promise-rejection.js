/*
  The goal is to demonstrate how to handle async queues in a proper maner, withing error handling.
  
  To achieve this goal we use a simple queue of async tasks.
  This can be solved using Promise.all, but there's a better method?
*/

const axios = require('axios')
const assert = require('assert')

const results = []

const urls = [
  'http://localhost:3000/endpointThatWorks',
  'http://localhost:3000/nowhere'
 ]

const generatePromises = (url) => {
  return axios(url).catch(null)
}

const promises = urls.map(generatePromises)

// the show goes here
const getResult = (result) => {
  return result == null
    ? null
    : result
}

const mapPromises = async (promises, index = 0) => {
  const result = await promises[index].then(getResult).catch((err) => null)
  results.push(result)

  return index < promises.length - 1
     ? mapPromises(promises, ++index)
     : results
}

(async (arrayOfPromises) => {
  // here we have the problem of Promise.all rejection
  // const result = Promise.all(arrayOfPromises)
  // so, to solve this problem of rejections we use a fuckin recursion!

  // optional index
  await mapPromises(arrayOfPromises)

  // haveSomePromiseFailed is a Boolean
  // I doesn't recoment to attach .length aftler a filter due to semantics
  // declaring some variable to do this is the best
  const haveSomePromiseFailed = results.filter(value => value == null).length > 0

  // why .catch(null)? Throwing a error means that we need 
  // to handle it using try/catch. On that case I prefer not.
  assert(haveSomePromiseFailed, true)
})(promises)

