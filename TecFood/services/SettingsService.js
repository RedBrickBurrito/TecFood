import axios from "axios";
import SyncStorage from "sync-storage"

export async function handleUpdateName(data) {
  const user = SyncStorage.get("USER");
  const route = `https://tfst1.herokuapp.com/user/updateName/${user._id}`;

  return await axios.post(route, data)
    .then(response => {
      return {
        status: response.status,
        message: response.data.message,
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
  });    
};

export async function handleUpdateEmail(data) {
    const user = SyncStorage.get("USER");
    const route = `https://tfst1.herokuapp.com/user/updateEmail/${user._id}`;
  
    return await axios.post(route, data)
      .then(response => {
        console.log("Response: ", response);
        return {
          status: response.status,
          message: response.data.message,
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
    });    
  };