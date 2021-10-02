<template>
  <div>
    <h1>Level 2</h1>
    <h2>Diggin'</h2>

    <h3>Premise:</h3>
    <p>
      Your first robbery caused a sensation in the county. I'm not saying people
      are afraid, but the bank in the neighboring country has decided to take an
      <b>extra layer</b> of security measure
    </p>
    <p>
      Nothing that a little digging here and there in the console can't solve
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
        They thought it was enough to hide the <code>Bank</code> reference
        behind an invocation layer, but they were wrong. Big Time!
      </p>

      <pre>
      {
        class Bank {
          caveau = ['$', '$', '$', '$', '$']
          password = 'P4s$w0R2!'
        }

        window.Bank = function exposeBank() {
          return Bank
        }
      }
      </pre>
      <p>
        Too easy? If I were you I would lower the crest; rumor has it that the
        marshall is coming right here.
      </p>

      <hr />
      <button @click="$emit('next')">I fear nothing!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Tips from './Tips.vue'

export default defineComponent({
  name: 'level-2',
  components: { Tips },
  emits: ['next'],
  setup() {
    const tips = [
      "It's similar to the previous solution. Instead of just printing the reference to the expose function, print the result of its invocation",
    ]

    const password = ref('')
    const success = ref(false)

    window.Bank = null

    {
      class Bank {
        caveau = ['$', '$', '$', '$', '$']
        password = 'P4s$w0R2!'
      }

      window.Bank = function exposeBank() {
        return Bank
      }
    }

    return {
      password,
      check,
      tips,
      success,
    }

    function check() {
      console.log(password.value)
      if (password.value !== 'P4s$w0R2!') {
        alert(`The password is not ${password.value}`)
        password.value = ''
        return
      }

      success.value = true
    }
  },
})
</script>
