/*
* The goal of this note is demonstrate how to profund handling erros in a
* imperative style
*
* On this note, we simulate a MVC approach on an express application with a 
* db connection based on callback(like native drivers),
* and an error on this call. The script that calls the database, providing an error,
* and cannot crash the system. The error needs to get outputed to the user¹.
* 
* By system we talk about the enviroment what the code runs, on this case an front-end back-end talk
* trough an REST API.
*
* By crashing we means the front-end doing things that is unecessary, or this playing things that casues
* an "error 500 guru meditation". 
*
* About the fact that MVC is a OOP approach, the MVC pattern can be applied to a
* imperative system since that the code is on a imperative style. Om this note we achieve this goal
* by using it of a way of separe concerns, tha names is very conveniet and almost
* everyone knows this pattern.
*
* To achieve the goal, we use nested try/catch blocks, where the first represets the controller layer
* and the last represets call made by the model separated by functions².
*
* Sidenotes
* 1 - On an human readable way, therefore an API is a interface to the frontend.
* 2 - TransformToAnError should be the default treatement for every db request to go against the 
* thurth table.
*/

const thruthTable = {
    'E11000': { status: 500, message: 'Duplicate item' }
}

const responseSend = (status, message) => {
    console.log(message)
}


const transformToAnError = (err) => {
    const errorMessage = err.split(':')
    return { code: errorMessage[0], message: errorMessage[1] }
}

const errorHandler = (err) => {
    const error = transformToAnError(err)
    
    // on err.status you can code the default error status code by working with generators and classes,
    // or a pure implementation of function generator backed by a proxy, or a more complex version of
    // function generators.
    return { statusCode: thruthTable[err.code].status, message: thruthTable[err.message].message }
}

// db.collection(name).find(params)
const db = {}

db.find = function (id, params) {
    throw Error('E11000: Duplicate key entry')
}

// model.js
const model = (id) => {
    try {
        return db.find({_id: id}, { $limit: 1 })
    } catch (err) {
        throw transformToAnError(err)
    }
}

const controller = (request) => {
    try {
        const id = request._id
        const response = model(id)
        return response
    } catch (err) {
        const response = errorHandler(err)
        return response
    }
}

const view = () => {
    const response = controller(1)
    if (response instanceof Error) {
        return responseSend(response.statusCode, response.message)
    } else {
        return responseSend(200, response)
    }
};

(() => view())()
