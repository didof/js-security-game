<template>
  <div>
    <h1>Level 5</h1>
    <h2>Nobody is Safe</h2>

    <h3>Premise:</h3>
    <p>
      Now that you understand the power of overriding built-in features, you
      walk around the city proud and arrogant, in your snakeskin boots.
    </p>
    <p>
      This time you won't have to shoot blindly; you have searched the
      perimeter, you have bribed the right people - you know what the
      <code>Bank</code>
      structure is like.
    </p>
    <b>Good Luck, boy</b>

    <h3>Goal:</h3>
    <p>
      Always the same.Have the money transferred to your account:
      <b>malicious://badguy</b>
    </p>
    <ul>
      <li>You have to act directly from the <b>console</b></li>
      <li>You need to instantiate the <code>Bank</code></li>
      <li>You need to call on it the <code>transfer</code> method</li>
    </ul>

    <hr />

    <button @click="peekBank = true" v-if="!peekBank">
      Peek Bank structure
    </button>
    <div v-if="peekBank">
      <pre>
      {
        let safeIncludes = Array.prototype.includes

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

          safeIncludes = safeIncludes.bind(certifiedAddresses)
          if (!safeIncludes(address)) {
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

            if (targetAddress === 'malicious://badguy') {
              console.info('You won!')
            }
          }
        }

        window.Bank = function exposeBank(options) {
          return new Bank(options)
        }
      }
      </pre>
    </div>

    <div v-if="success">
      <hr />
      <h3>Incredible Success!</h3>
      <p>
        You made it. I am truly amazed. You truly are the greatest cowboy of all
        time, you <b>American Venom</b>!
      </p>

      <p>I am currently working on other leves.</p>

      <hr />
      <a href="mailto://didonato.fr@gmail.com">I can suggest some!</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'level-5',
  setup() {
    const success = ref(false)
    const peekBank = ref(false)

    window.Bank = null

    {
      let safeIncludes = Array.prototype.includes

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

        safeIncludes = safeIncludes.bind(certifiedAddresses)
        if (!safeIncludes(address)) {
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
            console.info('You won!')
          }
        }
      }

      window.Bank = function exposeBank(options) {
        return new Bank(options)
      }
    }

    return {
      success,
      peekBank,
    }
  },
})
</script>
