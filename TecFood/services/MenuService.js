import axios from 'axios'

export async function menuHandler(restaurantID) {
    const route = `https://tecfood.herokuapp.com/api/restaurant/${restaurantID}/item`
    // console.log(`Retrieving product data of product with id ${itemID} to the route ${route}`)

    return await axios.get(route)
        .then(response => {
            return {
                status: response.status,
                menu: response.data,
            }
        })
        .catch(error => {
            if (error.response) {
                // Request made and server responded
                return {
                  status: error.response.status,
                  message: error.response.data.message,
                };
            } else if (error.request) {
                //The request was made but no response was received
                return error.request;
            } else {
                //Other type of error was triggered
                return error;
            }
        })    
}