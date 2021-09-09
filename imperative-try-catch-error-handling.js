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
* By crashing we means the front-end doing things that is unecessary, or thisplayng things that casues
* an "error 500 guru meditation". 
*
* About the fact that MVC is a OOP approach, the MVC pattern can be applied to a
* imperative system since that the code on a imperative style. Om this note we achieve this goal
* by using it of a way of sepere concerns, tha names is very conveniet and the fact that almost
* everyone knows this pattern.
*
* To achieve the goal, we use nested try/catch blocks.
*
* Sidenotes
* 1 - On an human readable way, therefore an API is a interface to the frontend.
*/

const responseSend = (status, message) => {
    console.log(message)
}

const errorHandler = (err) => {
    const thruthTable = {
        'E11000': { status: 500, message: 'Duplicate item' }
    }
    
    // on getStatus on can code an defaul baheavior, so, the thurth table.
    const getCode = (string) => string.split(':')[0]
    
    return { statusCode: thruthTable[getCode(err.message)].status, message: thruthTable[getCode(err.message)].message }
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
        throw err
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
