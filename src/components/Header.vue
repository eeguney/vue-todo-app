<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  data() {
    return {
      searchBox: false,
    };
  },
};
</script>
<template>
  <header :class="{ open: searchBox }">
    <h1>{{ title }}</h1>
    <div class="searchbox" :class="{ open: searchBox }">
      <input
        type="text"
        spellcheck="false"
        :class="{ open: searchBox }"
        placeholder="What did you looking for..."
      />
      <button @click="searchBox = !searchBox">
        <font-awesome-icon
          v-if="!searchBox"
          :icon="['fa', 'search']"
          size="2xl"
          color="white"
        />
        <font-awesome-icon
          v-else
          :icon="['fa', 'xmark']"
          size="3x"
          color="white"
        />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  &.open {
    @media (max-width: 1024px) {
      margin-bottom: 55px;
    }
  }
  @media (max-width: 1024px) {
    margin-bottom: 0;
  }
  h1 {
    margin: 0;
  }
  .searchbox {
    transition: all 0.2s ease;
    background-color: #3b3b3b00;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    align-items: center;
    display: flex;
    &.open {
      width: 420px;
      border-radius: 10px;
      background-color: #3b3b3b;
      @media (max-width: 1024px) {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        border-radius: 0;
        background-color: #3b3b3b;
      }
      &:hover {
        transform: scale(1);
      }
    }
    input {
      height: 80px;
      margin-right: 80px;
      padding: 0 1rem;
      border: none;
      background-color: transparent;
      transform-origin: right top;
      transform: scaleX(0);
      flex: 1;
      font-size: 1rem;
      &:focus {
        outline: 0;
      }
      &.open {
        transform: scaleX(1);
      }
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      background: transparent;
      width: 80px;
      height: 100%;
      cursor: pointer;
      @media (max-width: 1024px) {
        width: 50px;
      }
      svg {
        @media (max-width: 1024px) {
          font-size: 1.5rem;
        }
      }
    }
    &:hover {
      transform: scale(1.1);
      transition: all 0.2s ease;
    }
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }
}
</style>
