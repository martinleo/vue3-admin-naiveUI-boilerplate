# Configuration
1. Replace all dummy files (`./src/dummies`)
2. Configure global styles (`./assets/_global.scss`)
3. Configure the app's sidebar (`./src/config/menu.json`)
4. Configure Axios  
   a. Go to `./src/config/axios` and update the error message that is returned from the backend whent the token is expired.  
   b. In the same file, modify the header key name `auth-token` in the request interceptor, if required.  
   c. When using axios, always use the instance from point 4 by importing it.
5. In `LoginView.vue` change the route that is pushed after logging in


# TODO
1. Develop `NotFoundView.vue` 
