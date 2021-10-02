<template>
  <div>
    <h1>Level 3</h1>
    <h2>Under Pressure</h2>

    <h3>Premise:</h3>
    <p>We aim a little higher: we steal directly from the mayor of the town.</p>
    <p>
      For him it is different. There is <b>no simple password to steal</b>. No
      sir.
    </p>
    <p>
      The <code>Bank</code> has agreed with the mayor a list of
      <code>addresses</code> among which he is allowed to
      <code>transfer</code> his money
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
      <h3>How many time is <code>address</code> accessed?</h3>
      <p>
        You are not forced to pass a configuration object declared inline. Who
        is stopping you from doing this?
      </p>
      <pre>
      const options = {
        get address() {
          console.count('accessed')
          return 'certified://investments'
        },
      }

      let bank = new Bank(options)
      </pre>

      <hr />

      <button @click="tip2 = true" v-if="!tip2">Hmmmm how do you do it?</button>
      <div v-if="tip2">
        <h3>Switch it at the right time!</h3>
        <p>
          Thanks to the previous advice you can find a decisive info: address is
          accessed 4 times in initialization phase; Certainly it involves
          several checks
        </p>
        <p>
          However, it is 5 that matters - <b>just replace</b> the address the
          fifth time it is accessed
        </p>
        <pre>
        let i = 0
        const options = {
          get address() {
            ++i;
            if(i === 5) return 'malicious://badguy'
            return 'certified://investments'
          },
        }
        </pre>
      </div>
    </div>

    <div v-if="success">
      <hr />
      <h3>Great Success!</h3>
      <p>
        It wasn't easy this time! But it helped you to learn the
        <b>doube getter</b>
        technique
      </p>

      <pre>
      {
        function Bank(options) {
          const caveau = ['$', '$', '$', '$', '$']
          const certifiedAddresses = [
            'certified://my-other-account',
            'certified://mutual',
            'certified://investments',
          ]

          if (!options.address || typeof options.address !== 'string') {
            console.warn(
              'Bank could not be initialized. Please, provide a valid address'
            )
            return
          }

          if (!certifiedAddresses.includes(options.address)) {
            console.warn(
              `The address provided ${options.address} is not certified.`
            )
            console.warn(
              `Following, a list of certified addresses, ${certifiedAddresses.map(
                addr => `\n${addr}`
              )}`
            )
            return
          }

          console.info(`Successfully connected to ${options.address}`)

          return {
            transfer,
          }

          function transfer() {
            const targetAddress = options.address
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
        The marshall is full of anger. The mayor on a rampage. On the back of
        your horse, you move away towards the horizon. Go to the big city. Great
        challenges await you.
      </p>

      <hr />
      <button @click="$emit('next')">YEEEE-HAAAA!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Tips from './Tips.vue'

export default defineComponent({
  name: 'level-3',
  components: { Tips },
  emits: ['next'],
  setup() {
    const success = ref(false)

    const tips = [
      'By instantiating Bank, an error informs you that its expecting a configuration object from which to extract address.',
      'Find a way to get notified each time address is accessed into Bank',
      'Exploit the previous info (think to getters)',
    ]

    const tip1 = ref(false)
    const tip2 = ref(false)

    window.Bank = null

    {
      function Bank(options) {
        const caveau = ['$', '$', '$', '$', '$']
        const certifiedAddresses = [
          'certified://my-other-account',
          'certified://mutual',
          'certified://investments',
        ]

        if (!options.address || typeof options.address !== 'string') {
          console.warn(
            'Bank could not be initialized. Please, provide a valid address'
          )
          return
        }

        if (!certifiedAddresses.includes(options.address)) {
          console.warn(
            `The address provided <${options.address}> is not certified.`
          )
          console.warn(
            `Following, a list of certified addresses, ${certifiedAddresses.map(
              addr => `\n${addr}`
            )}`
          )
          return
        }

        console.info(`Successfully connected to ${options.address}`)

        return {
          transfer,
        }

        function transfer() {
          const targetAddress = options.address
          const $ = caveau.pop()

          console.info(`One ${$} has been transfered to <${targetAddress}>`)

          if (targetAddress === 'malicious://badguy') {
            success.value = true
          }
        }
      }

      window.Bank = function exposeBank(options) {
        return new Bank(options)
      }
    }

    return {
      tips,
      success,
      tip1,
      tip2,
    }
  },
})
</script>
