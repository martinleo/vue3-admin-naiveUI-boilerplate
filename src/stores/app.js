import { defineStore } from "pinia";


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
