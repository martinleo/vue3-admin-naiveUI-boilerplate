<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from '../stores/auth'

const router = useRouter();
const auth = useAuth();

const user = ref({
  email: "",
  password: "",
})
let errorMessage = ref('');

function login() {
  auth.login(user.value)
    .then(() => {
      router.push({ name: "SampleView" });
    })
    .catch(err => {
      errorMessage.value = err.message;
    });
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <n-card>
        <h5 class="display-5 mb-3">Log In</h5>
        <form @submit.prevent="login" class="login-form">
          <n-input color="#06d6a0" class="mb-4" v-model="user.email" />
          <n-input color="#06d6a0" class="mb-4" v-model="user.password" type="password" />
          <n-button color="#06d6a0" attr-type="submit">
            <b>Log In</b>
          </n-button>
        </form>
        <p class="mt-3" v-if="errorMessage" :style="{ color: 'red' }">{{ errorMessage }}</p>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0;
  background: linear-gradient(to right, #11998e, #38ef7d);
}
.login-box {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: white;
  }
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>