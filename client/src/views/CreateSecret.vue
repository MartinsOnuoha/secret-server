<template>
  <div class="createSecret">
    <img width="250" alt="Vue logo" src="https://cdn.britannica.com/33/194733-050-4CF75F31/Girl-with-a-Pearl-Earring-canvas-Johannes-1665.jpg">
    <h2>{{ message }}</h2>

    <div class="action">
      <input
        placeholder="Write your secret here"
        v-model="secret"
        name=""
        aria-label="enter secret"
        class=""
        type="text"
      >
      <div class="column">
        <div class="text-left">
          ({{ expireAfterViews }}) People can see this
        </div>
        <input
          v-model="expireAfterViews"
          type="number"
          min="0"
        >
      </div>
      <div class="column">
        <div class="text-left">
          Delete my secret after ({{ expireAfter }} Minutes)
        </div>
        <input v-model="expireAfter" type="number" min="0">
      </div>
      <button
        :disabled="!secret || !expireAfterViews"
        type="button"
        @click="createSecret"
      >
        Hide My Secret
      </button>
    </div>
  </div>
</template>

<script>
import { addMinutes } from 'date-fns';

export default {
  name: 'create-secret',
  data() {
    return {
      message: 'Got A Secret On Mind?',
      secret: '',
      expireAfterViews: 0,
      expireAfter: 0,
    };
  },
  methods: {
    createSecret() {
      const { secret, expireAfterViews, expireAfter } = this;

      this.postData('http://0.0.0.0:4000/api/secret/', {
        secret,
        expireAfterViews,
        expireAfter: addMinutes(new Date(), expireAfter),
      })
        .then((data) => {
          this.message = data.hash;
        })
        .catch((err) => {
          this.message = err;
        });
    },
    async postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
};
</script>
