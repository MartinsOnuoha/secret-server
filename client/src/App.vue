<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Find a Secret</router-link> |
      <router-link to="/create">Write A Secret</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fd912b;
    }
  }
}
.action {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.column {
  display: flex;
  flex-direction: column;
}
.text-left {
  text-align: left;
  margin-top: 10px;
}
h2 {
  margin-top: 3rem;
}
input {
  padding: 10px;
  width: 400px;
}
button {
  margin-top: 10px;
  padding: 10px;
  width: 200px;
  background-color: #000;
  color: #FFF;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
button:hover {
  background-color: bisque;
  color: #000;
}
button:disabled {
  cursor:not-allowed;
}
.img-transform {
  transform: rotate(-15deg)
}
img {
  border-radius: 10px;
  box-shadow: 10px 10px #f3a024;
  min-height: 301px;
}
</style>
