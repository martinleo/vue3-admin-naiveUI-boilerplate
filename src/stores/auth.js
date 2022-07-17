import { defineStore } from "pinia";
import axios from "axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {
      name: null,
      token: null,
      refreshToken: null,
    },
    refreshingToken: false
  }),
  getters: (state) => ({}),
  actions: {
    async login(user) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_BE_SERVER_URL}/api/user/login`, user)
          .then((loginData) => {
            this.user = { name: loginData.data.userName, token: loginData.data.token, refreshToken: loginData.data.refreshToken };
            localStorage.setItem("token", loginData.data.token);
            localStorage.setItem("userName", loginData.data.userName);
            localStorage.setItem("refreshToken", loginData.data.refreshToken);
            resolve();
          })
          .catch((err) => {
            reject(new Error(err.response ? err.response.data.error : err));
          });
      });
    },
    retrieveTokenFromLocalStorage() {
      return new Promise((resolve, reject) => {
        try {
          if (localStorage.getItem("token")) {
            this.user = { name: localStorage.getItem("userName"), token: localStorage.getItem("token"), refreshToken: localStorage.getItem("refreshToken") };
          } else {
            this.user = {
              name: null,
              token: null,
            };
            reject();
          }
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        // axios
        //   .post(`${import.meta.env.VITE_BE_SERVER_URL}/api/user/token/refresh`, { refreshToken: this.user.refreshToken })
        //   .then((res) => {
        //     this.user.token = res.data.token;
        //     localStorage.setItem("token", res.data.token);
        //     resolve(res.status)
        //   })
        //   .catch(err => {
        //     reject()
        //   })
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          this.user = {
            name: null,
            token: null,
          };
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
  },
});
