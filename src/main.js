import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


// If in development, start fake api
import { makeServer } from "./dummies/mirageServer.js"
if (import.meta.env.VITE_ENV === "development") {
  makeServer()
}

// Naive UI
import {
  // create naive ui
  create,
  // component
  NButton,
  NCard,
  NConfigProvider,
  NGlobalStyle,
  NInput
} from 'naive-ui'

const naive = create({
  components: [NButton,NCard,NConfigProvider,NGlobalStyle,NInput]
})

// Click outside directive
const clickOutside = {
  //https://stackoverflow.com/questions/36170425/detect-click-outside-element
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.directive("click-outside", clickOutside);

app.mount('#app')
