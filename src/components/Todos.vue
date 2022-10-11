<script>
import moment from "moment";
export default {
  name: "Todos",
  props: {
    todos: Array,
    searchData: Array | Object
  },
  data() {
    return {
      todoDatas: this.todos,
      filters: ["All", "Active", "Done"],
      filterBy: "All",
    };
  },
  watch: {
    todos(newTodos, oldTodos) {
      this.todoDatas = this.todos;
    },
    searchData(newTodos, oldTodos) {
      if(this.searchData && this.searchData.length > 0) {
        this.todoDatas = this.searchData;
      } else {
        this.todoDatas = this.todos;
      }
    },
  },
  methods: {
    setFilter(filter) {
      this.filterBy = filter;
      const todosParse = JSON.parse(JSON.stringify(this.todos));
      switch (filter) {
        case "All":
          this.todoDatas = todosParse;
          break;
        case "Active":
          this.todoDatas = todosParse.filter((todo) => todo.done == false);
          break;
        case "Done":
          this.todoDatas = todosParse.filter((todo) => todo.done == true);
          break;
        default:
      }
    },
    todoCount() {
      return `${this.todoDatas.length} goals / ${
        this.todoDatas.filter((todo) => todo.done == false).length
      } active`;
    },
    getDate(date) {
      return moment(date).fromNow();
    },
    setDone(index) {
      this.$emit("setDone", index);
    },
    deleteItem(index) {
      this.$emit("delete", index);
    },
  },
  computed: {
    isEmpty() {
      return this.todoDatas.length < 1;
    },
  },
};
</script>

<template>
  <div class="todos">
    <label>
      <h3>Your to-do list</h3>
      <div class="filter-menu">
        <span class="todo-count">{{ todoCount() }}</span>
        <button
          v-for="filter in filters"
          @click="setFilter(filter)"
          :class="{ active: filterBy == filter }"
        >
          {{ filter }}
        </button>
      </div>
    </label>
    <div class="todo-grid" v-if="!isEmpty">
      <figure
        v-for="(todo, index) in todoDatas"
        :key="index"
        :style="{ backgroundColor: todo.color }"
        :class="{ done: todo.done }"
      >
        <header>
          <span class="type">{{ todo.type }}</span
          ><span class="date">{{ getDate(todo.date) }}</span>
        </header>
        <p>{{ todo.text }}</p>
        <footer>
          <button>
            <font-awesome-icon
              :icon="['far', 'square-check']"
              size="xl"
              color="lime"
              @click="setDone(index)"
            />
          </button>
          <button>
            <font-awesome-icon
              :icon="['far', 'trash-can']"
              size="xl"
              color="red"
              @click="deleteItem(index)"
            />
          </button>
        </footer>
        <div
          class="overlay"
          v-if="todo.done"
          @click="todo.done ? setDone(index) : {}"
        >
          {{ todo.done && "DONE 😎" }}
        </div>
      </figure>
    </div>
    <div class="no-todo" v-else>
      <figure class="no-data">There is no item yet...</figure>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todos {
  margin-top: 2rem;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
      @media (max-width: 1024px) {
        margin-bottom: 1rem;
      }
    h3 {
      @media (max-width: 1024px) {
        display: none;
      }
    }
    .filter-menu {
      display: flex;
      gap: 1rem;
      .todo-count {
        display: flex;
        align-items: center;
        @media (max-width: 1024px) {
          display: none;
        }
      }
      .active {
        background-color: green;
      }
    }
  }
  .todo-grid {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, auto));
    figure {
      background-color: red;
      margin: 0;
      border-radius: 10px;
      box-shadow: 0 2px 20px -4px #00000070;
      transition: all 0.2s ease;
      position: relative;
      header {
        display: flex;
        padding: 1rem;
        align-items: center;
        .date {
          font-size: 13px;
          margin-left: 1rem;
        }
        .type {
          padding: 7px 10px;
          background-color: #00000030;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 600;
        }
      }
      p {
        padding: 0 1rem;
        margin: 0;
        margin-bottom: 2rem;
      }
      footer {
        display: flex;
        background: #00000026;
        padding: 1rem;
        justify-content: center;
        button {
          font-size: 13px;
          font-weight: 600;
          background-color: transparent;
          padding: 0;
          margin-right: 2rem;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
      &.done {
        .overlay {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(4px);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }
        &:hover {
          transform: scale(1);
        }
      }
    }
  }
  .no-todo {
    flex: 1;
    .no-data {
      max-width: 400px;
      height: 250px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border: 2px dashed #333;
      border-radius: 10px;
      @media (max-width: 600px) {
        max-width: 100%;
      }
    }
  }
}
@keyframes cardAnimation {
  from {
    transform: scale(0.7) translateY(-50px);
  } 
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
