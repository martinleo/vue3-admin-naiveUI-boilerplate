<script setup>
import { ref } from "vue";
import AppLayout from "../components/layout/AppLayout.vue";
import AppLogo from "../components/AppLogo.vue";
import menuItems from "../config/menu.json";
import { useAuth } from '../stores/auth';
import { useApp } from '../stores/app';
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuth();
const app = useApp();
const displayUserDropdown = ref();

// Get data on initialization
function loadData() {
  return new Promise(function (resolve, reject) {
    // TODO: Here the app loads data by calling Pinia methods

    resolve();
  })
}

loadData()
  .then(() => {
    app.isLoading = false;
  })


function logout() {
  auth.logout()
    .then(() => {
      router.push({ name: "LoginView" });
    });    
}

</script>


<template>
  <div v-if="app.isLoading || auth.user.token === null">shit</div>
  <AppLayout v-else sidebarToggleIcon="ph-list ph-xl" :menuItems="menuItems">
    <template #sidebar-logo>
      <AppLogo/>
    </template>
    <template #header>
      <div class="mxl__dropdown" v-click-outside="() => displayUserDropdown = false">
        <button @click="displayUserDropdown = !displayUserDropdown">{{ auth.user.name }}</button>
        <div :class="['mxl__dropdown-content', displayUserDropdown ? '' : 'hidden']">
          <ul>
            <li><i class="ph-atom" />One option</li>
            <li @click="logout"><i class="ph-sign-out" />Logout</li>
          </ul>
        </div>
      </div>
    </template>
    <template #content>
        <router-view/>
    </template>
  </AppLayout>
</template>


<style lang="scss" scoped>
.mxl__dropdown {
  position: relative;
  display: inline-block;

  button {
    border: none;
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
    display: inline-block;
  }

  .mxl__dropdown-content {
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 2px 3px 0px rgba(52, 56, 85, 0.25);
    border-radius: 5px;
    right: 0px;

    &.hidden {
      display: none;
    }

    ul {
      li {
        padding: 15px;
        cursor: pointer;

        &:hover {
          background-color: $mxl-primary-color-hover;
        }

        i {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>