import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useApp = defineStore("app", {
  state: () => ({
    isLoading: true,
  }),
  // getters: {
  //   orderedCategories() {
  //     return this.isLoading;
  //   },
  // },
  // actions: {
  //   async myAction() {
  //     return new Promise((resolve, reject) => {
        
  //     });
  //   },
  // },
});
