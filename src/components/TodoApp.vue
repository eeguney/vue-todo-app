<script>
import Header from "./Header.vue";
import NewTodo from "./NewTodo.vue";
import Todos from "./Todos.vue";
export default {
  name: "TodoApp",
  components: {
    Header,
    NewTodo,
    Todos,
  },
  props: {
    title: String,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    newTodoHandler(todo) {
      const todos = JSON.parse(JSON.stringify(this.todos));
      todos.unshift(todo);
      this.todos = todos;
    },
    setDone(item) {
      let todoFromData = JSON.parse(JSON.stringify(this.todos));
      this.todos = todoFromData.map(
        (todo, index) => index == item ? { ...todo, done: !todo.done } : todo
      );
    },
    deleteItem(item) {
      let todoFromData = JSON.parse(JSON.stringify(this.todos));
      this.todos = todoFromData.filter((_todo, index) => index !== item);
    },
  },
};
</script>

<template>
  <Header :title="title" />
  <NewTodo @submitTodo="newTodoHandler" />
  <Todos :todos="todos" @setDone="setDone" @delete="deleteItem" />
</template>
