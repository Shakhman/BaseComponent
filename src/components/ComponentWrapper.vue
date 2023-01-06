<template>
  <div class="wrapper">
    <div class="pre-content">
      <h2>{{ title }}</h2>
      <slot name="search"></slot>
      <slot name="fullscreen"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
    },
  }
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: lightblue;
  padding: 16px;
  margin: 16px;
}

.pre-content {
  margin-bottom: 100px;
}
</style>