<template>
  <div>
    <component :is="'level' + level" @next="next" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Level1 from './components/Level1.vue'
import Level2 from './components/Level2.vue'
import Level3 from './components/Level3.vue'
import Level4 from './components/Level4.vue'
import Level5 from './components/Level5.vue'

export default defineComponent({
  name: 'app',
  components: {
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
  },
  setup() {
    const level = ref(1)

    const savedLevel = window.localStorage.getItem('level')
    if (savedLevel) level.value = parseInt(JSON.parse(savedLevel))

    function next() {
      level.value += 1
      window.localStorage.setItem('level', JSON.stringify(level.value))
    }

    return {
      level,
      next,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10%;
}
</style>
