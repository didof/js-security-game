<template>
  <div>
    <h1>Level 4</h1>
    <h2>The Mole</h2>

    <h3>Premise:</h3>
    <p>
      You have arrived in the big city. Your reputation as a robber has not yet
      reached this point, but you should hurry up.
    </p>
    <p>Will your tricks work? Or will you be forced to find new ones?</p>
    <p>
      The <code>Bank</code> is similar to the previous one, they still check if
      the certified addresses list <b>includes</b> the provied address. Can you
      exploit this information for your greedy intentions?
    </p>

    <h3>Goal:</h3>
    <p>Have the money transferred to your account: <b>malicious://badguy</b></p>
    <ul>
      <li>You have to act directly from the <b>console</b></li>
      <li>You need to instantiate the <code>Bank</code></li>
      <li>You need to call on it the <code>transfer</code> method</li>
    </ul>

    <Tips :tips="tips" />

    <hr />

    <button @click="tip1 = true" v-if="!tip1">Help, I'm stuck</button>
    <div v-if="tip1">
      <h3>Bribe someone inside.</h3>
      <p>
        The <code>Bank</code> relies on <code>Array.prototype.includes</code> to
        determine if the address is valid or not
      </p>
      <p>
        Just pull out the iron and kindly ask
        <code>Array.prototype.includes</code> to turn a blind eye, just this
        time
      </p>
      <pre>
        const tmp = Array.prototype.includes

        Array.prototype.includes = () => true

        let bank = new Bank({ address: 'malicious://badguy' })

        Array.prototype.includes = tmp

        bank.transfer()
      </pre>
    </div>

    <div v-if="success">
      <hr />
      <h3>Great Success!</h3>
      <p>
        The bank only accesses the address once, i.e. in the destructuring at
        the top! You had to resort to hard ways, even touching the prototype of
        a
        <b>javascript built-in</b>!
      </p>

      <pre>
      {
        function Bank({ address }) {
          const caveau = ['$', '$', '$', '$', '$']
          const certifiedAddresses = [
            'certified://my-other-account',
            'certified://mutual',
            'certified://investments',
          ]

          if (!address || typeof address !== 'string') {
            console.warn(
              'Bank could not be initialized. Please, provide a valid address'
            )
            return
          }

          if (!certifiedAddresses.includes(address)) {
            console.warn(`The address provided ${address} is not certified.`)
            console.warn(
              `Following, a list of certified addresses, ${certifiedAddresses.map(
                addr => `\n${addr}`
              )}`
            )
            return
          }

          console.info(`Successfully connected to ${address}`)

          return {
            transfer,
          }

          function transfer() {
            const targetAddress = address
            const $ = caveau.pop()

            console.info(`One ${$} has been transfered to ${targetAddress}`)
          }
        }

        window.Bank = function exposeBank(options) {
          return new Bank(options)
        }
      }
      </pre>
      <p>
        With half the city at your heels, you shatteringly flee in your carriage
        full of money! One more robbery, you tell yourself. By now you've got a
        taste for it
      </p>

      <hr />
      <button @click="$emit('next')">Bring it on!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Tips from './Tips.vue'

export default defineComponent({
  name: 'level-4',
  components: { Tips },
  emits: ['next'],
  setup() {
    const tips = [
      'How many time is address accessed?',
      'The Bank uses "includes" method to check if the provided address is valid (true) or invalid (false)',
    ]
    const success = ref(false)
    const tip1 = ref(false)

    window.Bank = null

    {
      function Bank({ address }) {
        const caveau = ['$', '$', '$', '$', '$']
        const certifiedAddresses = [
          'certified://my-other-account',
          'certified://mutual',
          'certified://investments',
        ]

        if (!address || typeof address !== 'string') {
          console.warn(
            'Bank could not be initialized. Please, provide a valid address'
          )
          return
        }

        if (!certifiedAddresses.includes(address)) {
          console.warn(`The address provided <${address}> is not certified.`)
          console.warn(
            `Following, a list of certified addresses, ${certifiedAddresses.map(
              addr => `\n${addr}`
            )}`
          )
          return
        }

        console.info(`Successfully connected to ${address}`)

        return {
          transfer,
        }

        function transfer() {
          const $ = caveau.pop()

          console.info(`One ${$} has been transfered to <${address}>`)

          if (address === 'malicious://badguy') {
            success.value = true
          }
        }
      }

      window.Bank = function exposeBank(options) {
        return new Bank(options)
      }
    }

    return {
      success,
      tips,
      tip1,
    }
  },
})
</script>
