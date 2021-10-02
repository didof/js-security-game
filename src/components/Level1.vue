<template>
  <div>
    <h1>Level 1</h1>
    <h2>First steps</h2>

    <h3>Premise:</h3>
    <p>
      You just discovered how to <b>open developer tools</b>. You feel like a
      hacker, you are not, but you will be.
    </p>
    <p>
      You are on the website of a small bank. They have not paid the slightest
      attention to safety. Excellent starting point.
    </p>

    <h3>Goal:</h3>
    <p>Steal the bank password and enter it into your <i>hacker database</i></p>

    <label for="hacker-input">Hacker DB:</label><br />
    <input type="text" name="hacker-input" v-model="password" />
    <button @click="check">check</button>

    <Tips :tips="tips" />

    <div v-if="success">
      <hr />
      <h3>Great Success!</h3>
      <p>
        You found it. It was simple, wasn't it? However no one is as stupid as
        this fake bank (at least I hope)
      </p>

      <pre>
      {
        class Bank {
          caveau = ['$', '$', '$', '$', '$']
          password = 'password123'
        }

        window.Bank = Bank
      }
      </pre>
      <p>
        As you can see, they just exposed their API. <code>password</code> is
        public and accessible.
      </p>

      <hr />

      <p>Let's slightly increase the security level of the bank</p>
      <button @click="$emit('next')">Tsk! Tsk!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Tips from './Tips.vue'

export default defineComponent({
  name: 'level-1',
  emits: ['next'],
  components: {
    Tips,
  },
  setup() {
    const tips = ['open developer tools', 'look into window object']

    const password = ref('')
    const success = ref(false)

    window.Bank = null

    {
      class Bank {
        caveau = ['$', '$', '$', '$', '$']
        password = 'password123'
      }

      window.Bank = Bank
    }

    return { password, check, tips, success }

    function check() {
      console.log(password.value)
      if (password.value !== 'password123') {
        alert(`The password is not ${password.value}`)
        password.value = ''
        return
      }

      success.value = true
    }
  },
})

window.Bank = null

{
  class Bank {
    caveau = ['$', '$', '$', '$', '$']
    password = 'password123'
  }

  window.Bank = Bank
}
</script>
