<script setup>

</script>

<template>
  <div class="mxl-layout-main__content">
    <slot/>
  </div>
</template>


<style lang="scss" scoped>

.mxl-layout-main__content {
    background: $mxl-content-bg;
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    overflow: auto;
    width: 100%;
  }
</style>