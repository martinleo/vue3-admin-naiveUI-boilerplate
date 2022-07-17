
<script setup>
import { useAuth } from './stores/auth';
import { useRouter } from "vue-router";
import { darkTheme } from 'naive-ui'

const router = useRouter();
const auth = useAuth();

auth.retrieveTokenFromLocalStorage()  // from LocalStorage
  .catch(err => {
    router.push({ name: "LoginView" });
  });
</script>

<template>
  <n-config-provider>
      <router-view />
  </n-config-provider>
</template>


<style lang="scss">
/***************** Begin Reset *****************/
html {
  box-sizing: border-box;
  color: #333;
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
  font-size: 8px;

}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
/***************** End Reset *****************/

/***************** Begin App *****************/
#app {
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/***************** End App *****************/

/***************** Vuestic Overrides *****************/
// Font size in dropdown
.va-dropdown__content-wrapper {
  font-size: 14px;
}
/***************** End App *****************/

</style>
