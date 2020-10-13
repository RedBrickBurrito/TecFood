import axios from 'axios'

export async function registerUser(data) {
    console.log("Data received: ", data)
    
    return await axios.post('https://tfst1.herokuapp.com/customer/signup', data).then( response => {
        // console.log('Response: ', response)
        return {
            status: response.status,
            message: response.data.message
        }
    }).catch(error => {
        if(error.response) {
            // Request made and server responded
            return {
                status: error.response.status,
                message: error.response.data.message,
            }
        } else if (error.request) {
            //The request was made but no response was received
            return error.request
        } else {
            //Other type of error was triggered
            return error
        }
    })
}