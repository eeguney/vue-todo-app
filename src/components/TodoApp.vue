<script>
import Header from "./Header.vue";
import NewTodo from "./NewTodo.vue";
import Todos from "./Todos.vue";
import Footer from "./Footer.vue";
export default {
  name: "TodoApp",
  components: {
    Header,
    NewTodo,
    Todos,
    Footer,
  },
  props: {
    title: String,
  },
  data() {
    return {
      todos: [],
      searchData: this.todos,
    };
  },
  mounted() {
    let todosFromStorage = localStorage.getItem('todos');
    if(JSON.parse(todosFromStorage).length < 1) {
      localStorage.setItem('todos', JSON.stringify([]))
      todosFromStorage = [];
    }
    this.todos = JSON.parse(todosFromStorage);

  },
  watch: {
    todos(newTodos, oldTodos) {
      this.searchData = this.todos;
    },
  },
  methods: {
    newTodoHandler(todo) {
      const todos = JSON.parse(JSON.stringify(this.todos));
      todos.unshift(todo);
      localStorage.setItem('todos', JSON.stringify(todos))
      this.todos = todos;
    },
    setDone(item) {
      let todoFromData = JSON.parse(JSON.stringify(this.todos));
      const done = todoFromData.map(
        (todo, index) => index == item ? { ...todo, done: !todo.done } : todo
      );
      this.todos = done;
      localStorage.setItem('todos', JSON.stringify(done));
    },
    deleteItem(item) {
      let todoFromData = JSON.parse(JSON.stringify(this.todos));
      const deleted = todoFromData.filter((_todo, index) => index !== item);
      this.todos = deleted;
      localStorage.setItem('todos', JSON.stringify(deleted));
    },
    searchHandler(text) {
      let todoFromData = JSON.parse(JSON.stringify(this.todos));
      const result = todoFromData.filter((item) => item.text.toUpperCase().includes(text.toUpperCase()))
      this.searchData = result;
    }
  },
};
</script>

<template>
  <Header :title="title" @search="searchHandler" />
  <NewTodo @submitTodo="newTodoHandler" />
  <Todos :todos="todos" @setDone="setDone" @delete="deleteItem" :searchData="searchData" />
  <Footer />
</template>
