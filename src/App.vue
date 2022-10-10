<script>
import TodoApp from "./components/TodoApp.vue";
export default {
  name: "app",
  components: {
    TodoApp,
  },
};
</script>

<template>
  <div class="container">
    <TodoApp title="TodoApp" />
  </div>
</template>

<style scoped>
.container {
  padding: 0 1rem 1rem 1rem;
}
@media (min-width: 600px) {
  .container {
    padding: 2rem;
  }
}
</style>
