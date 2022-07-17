<script setup>
const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  iconClass: {
      type: String
    },
});

function toggleSidebar() {
  emit('sidebarToggle');
}
</script>

<template>
  <div class="mxl-layout-main__header">
    <i :class="iconClass" style="fontsize: 2rem" @click="toggleSidebar"></i>
    <slot />
  </div>
</template>


<style scoped lang="scss">
.mxl-layout-main__header {
  align-items: center;
  background: $mxl-header-bg;
  box-shadow: 0 0 24px 0 rgba(34, 41, 47, 0.1);
  display: flex;
  height: $mxl-header-height;
  justify-content: space-between;
  padding-right: 25px;
  width: 100%;
  z-index: $mxl-zi-header;

  i {
    align-content: center;
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    width: $mxl-header-height;
  }
}
</style>