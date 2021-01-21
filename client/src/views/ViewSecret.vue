<template>
  <div class="home">
    <img width="250" :class="[secretText ? 'img-transform' : '']" alt="Vue logo" src="https://cdn.thinglink.me/api/image/573962283240128513/1240/10/scaletowidth">
    <h2 v-if="!secretText">{{ message }}</h2>
    <h2 v-else>Secret: "{{ secretText }}"</h2>
    <div class="action">
      <small>Provide a Secret Hash</small>
      <input
        placeholder="Paste Hash Here"
        v-model="hash"
        name=""
        class="input"
        type="text"
      >

      <button :disabled="!hash" type="button" @click="findSecret">Find Me a Secret</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      hash: '',
      message: 'Looking for Something?',
      secretText: '',
    };
  },
  methods: {
    findSecret() {
      if (this.hash) {
        fetch(`http://0.0.0.0:4000/api/secret/${this.hash}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              this.message = data.message;
            }
            if (data.secretText) {
              this.secretText = data.secretText;
            }
          });
      }
    },
  },
};
</script>
