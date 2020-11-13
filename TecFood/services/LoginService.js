import axios from "axios";

export async function loginHandler(data) {
  console.log("Data received: ", data);
  return await axios
    .post("https://tfst1.herokuapp.com/customer/login", data)
    .then((response) => {
      if (response.status == 200) {
        // Auth passed
        return {
          status: response.status,
          message: response.data.message,
          token: response.data.token,
        };
      } else if (response.status == 401) {
        // Auth failed: email doesn't exist, wrong password
        return {
          status: response.status,
          message: response.data.message,
        };
      } else {
        // Other type of error
        return {
          status: response.status,
        }
      }
      
      
    })
    .catch((error) => {
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
    });
}
