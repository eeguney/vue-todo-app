<script>
export default {
  name: "NewTodo",
  props: {},
  data() {
    const colors = [
      {
        name: "Normal",
        code: "#0505ee",
      },
      {
        name: "Important",
        code: "#c81313",
      },
      {
        name: "Note",
        code: "#015901",
      },
    ];
    return {
      placeholder: "Type something and press Enter...",
      todoText: "",
      error: {
        short: false,
      },
      activeInput: false,
      selectBox: false,
      selectedColor: colors[0],
      colors,
    };
  },
  methods: {
    handleBlur(e) {
      this.activeInput = false;
      // Object.keys(this.error).forEach((key, value) => this.error[key] = false)
    },
    handleTyping() {
      if (this.isEmptyOrShort) return (this.error.short = true);
      this.error.short = false;
    },
    colorHandler(color) {
      this.selectedColor = color;
      this.selectBox = false;
    },
    addTodo() {
      if (!this.hasAnyError) {
        this.activeInput = false;
        this.$emit("submitTodo", {
          text: this.todoText,
          color: this.selectedColor.code,
          type: this.selectedColor.name,
          done: false,
          date: new Date(),
        });
        this.todoText = "";
      }
    },
  },
  computed: {
    isEmptyOrShort() {
      return this.todoText.length < 3;
    },
    hasAnyError() {
      return Object.values(this.error).some((error) => error == true);
    },
  },
  mounted() {
    const stickyElm = document.querySelector(".new-todo");
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
      { threshold: [1] }
    );
    observer.observe(stickyElm);
  },
};
</script>

<template>
  <div class="new-todo">
    <form v-on:submit.prevent="addTodo">
      <input
        type="text"
        @click="activeInput = true"
        @blur="handleBlur"
        @input="handleTyping"
        spellcheck="false"
        class="input"
        :class="{
          active: activeInput,
          error: hasAnyError,
        }"
        v-model="todoText"
        :placeholder="placeholder"
      />
      <div class="color-picker">
        <label
          ><span
            @click="selectBox = !selectBox"
            :style="{ background: selectedColor.code }"
            ><span>{{ selectedColor.name }}</span></span
          ></label
        >
        <ul>
          <li
            v-if="selectBox"
            v-for="color in colors"
            :style="[
              selectedColor.name == color.name && { backgroundColor: 'black' },
            ]"
            @click="colorHandler(color)"
          >
            <span :style="{ background: color.code }"></span>
            {{ color.name }}
          </li>
        </ul>
      </div>
      <span class="error-span" v-if="hasAnyError && isEmptyOrShort">
        <font-awesome-icon icon="exclamation" size="xl" color="red" />
        <label>TOO SHORT</label>
      </span>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.new-todo {
  display: flex;
  position: sticky;
  top: -1px;
  z-index: 999;
  padding-top: 1rem;
  form {
    flex: 1;
    display: flex;
  }
}
.input {
  width: 100%;
  padding: 2rem;
  padding-left: 11rem;
  outline: 0;
  border: 0;
  border-radius: 10px;
  background-color: #ffffff25;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 20px -4px #00000070;
  font-size: 1.2rem;
  @media (max-width: 1024px) {
    padding-left: 7rem;
    font-size: 14px;
  }
  @media (max-width: 600px) {
    padding-left: 4rem;
    &::placeholder {
      color: white;
    }
  }
  &:hover {
    background-color: #525252;
  }
  &.active {
    background-color: #f8f8f8;
    color: #222;
    &::placeholder {
      color: black;
    }
    &:hover {
      background-color: #f8f8f8;
    }
  }
  &.error {
    outline: 2px solid red;
    box-shadow: 0px 2px 30px -3px red;
  }
}
.error-span {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  background-color: black;
  border-left: 2px solid red;
  border-radius: 0 10px 10px 0;
  color: red;
  @media (max-width: 600px) {
    top: 1rem;
  }
  label {
    font-size: 12px;
    font-weight: 700;
  }
}
.isSticky input {
  outline: 0;
  color: white;
  &:hover {
    background-color: #222;
  }
  &.active {
    background-color: #222;
  }
  .error-span,
  .error {
    border: 0;
    box-shadow: none;
  }
}
.color-picker {
  position: absolute;
  left: 2rem;
  height: 40px;
  top: 1rem;
  bottom: 0;
  z-index: 999;
  margin: auto;
  @media (max-width: 1024px) {
    left: 1rem;
  }
  label {
    height: 100%;
    display: flex;
    cursor: pointer;
    span {
      height: 100%;
      padding: 0 15px;
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      border-radius: 5px;
      @media (max-width: 600px) {
        width: 40px;
        padding: 0;
        border-radius: 50%;
        span {
          display: none;
        }
      }
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    width: 200px;
    box-shadow: 0 0 15px -3px #000;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 40px;
    li {
      font-weight: 600;
      font-size: 14px;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: 50px;
      background-color: #222;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        background-color: #333;
      }
      span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 1rem;
      }
    }
  }
}
</style>
