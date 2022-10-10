<script>
export default {
  name: "Container",
  props: {
    children: Object,
  },
};
</script>

<template>
  <div class="container">
    <component :is="children">something</component>
  </div>
</template>

<style scoped></style>
