<script setup>
import { ref, onBeforeMount, onUnmounted } from "vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";

const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  sidebarToggleIcon: {
    type: String,
  },
});

const sidebarOpen = ref(null);
const isMobile = ref(null);
const mobileWidth = 1024;
const menuItems = ref(props.menuItems);

// Lifecycle
onBeforeMount(() => {
  window.addEventListener("resize", handleResize);

  layoutSetup();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Functions
function layoutSetup() {
  if (window.innerWidth < mobileWidth) {
    isMobile.value = true;
    sidebarOpen.value = false;
  } else {
    isMobile.value = false;
    sidebarOpen.value = true;
  }
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function handleResize() {
  if (window.innerWidth < mobileWidth) {
    sidebarOpen.value = false;
    isMobile.value = true;
  } else {
    sidebarOpen.value = true;
    isMobile.value = false;
  }
}
</script>

<template>
  <Sidebar
    :sidebarOpen="sidebarOpen"
    :isMobile="isMobile"
    @sidebarToggle="toggleSidebar"
    :menuItems="menuItems"
  >
    <slot name="sidebar-logo" />
  </Sidebar>
  <div
    :class="[
      'mxl-layout-main',
      sidebarOpen ? '' : 'mxl-layout-main--sidebar-closed',
    ]"
  >
    <Header @sidebarToggle="toggleSidebar" :iconClass="sidebarToggleIcon">
      <slot name="header" />
    </Header>
    <Content>
      <slot name="content" />
    </Content>
  </div>
</template>



<style lang="scss">

.mxl-layout-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  padding-left: $mxl-sidebar-width;
  transition: padding 0.3s;

  .mxl-layout-main__content {
    background: $mxl-content-bg;
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    overflow: auto;
    width: 100%;
  }

  &.mxl-layout-main--sidebar-closed {
    padding-left: 0px;
  }

  @media (max-width: $mxl-sidebar-mobile-break) {
    padding-left: 0px;
  }
}
</style>