import axios from "axios";
import { useAuth } from "../stores/auth";

const responseErrorMsgForInvalidtoken = "Invalid token."

// Create instance
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Include auth-token
instance.interceptors.request.use((config) => {
  const auth = useAuth();
  config.headers['auth-token'] = auth.user.token;
  return config;
});

// Response interceptor: For expired tokens
function queueRequest(cb){
  requestQueue.push(cb);
}


function processRequestQueue(){
    requestQueue.forEach(cb => cb())  
}

let isRefreshing = false;
let requestQueue = []; // It's a list of callbacks


instance.interceptors.response.use(
  // Based on https://www.youtube.com/watch?v=pol95pAU9i0
  (response) => {
    return response;
  },
  (error) => {    
    const { config, response } = error;
    const auth = useAuth();

    const originalRequest = config;

    // Refresh token
    if (response.status === 401 && response.data.error === responseErrorMsgForInvalidtoken){
      if (!isRefreshing){
        isRefreshing = true;
        auth.refreshToken()
          .then(status => {
            if(status == 200) {
              isRefreshing = false;
              processRequestQueue()
              requestQueue = [];
            }            
          })
          .catch(err => {
            console.log(err)
          })
      }

      const sendToQueue = new Promise(resolve => {
        function executeRequest() {
          resolve(instance(originalRequest))
        }
        queueRequest(executeRequest)
      })

      return sendToQueue
    }
    else{
      // Return any error which is not due to authentication back to the calling service
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);
export default instance;
