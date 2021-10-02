<template>
  <div>
    <h1>Level 5</h1>
    <h2>I Fought the Law and the Law Won</h2>

    <h3>Premise:</h3>
    <p>
      Red-blooded, ambitious and strong, you aim to the Central Bank of the
      Nation.
    </p>
    <p>
      But take that little smile off your face: I haven't been able to break
      through here either. This <code>Bank</code> is thief proof.
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

            // for game sake
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
        time, you American Venom!
      </p>

      <hr />
      <a href="mailto://didonato.fr@gmail.com">I will tell you how I did it!</a>
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
