<template>
  <div>
    <div class="buttons">
      <PrevButton />
      <NextButton />
    </div>
    <div>
      <component :is="componentName" @next="nextLevel" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'

import useButtons from './components/useButtons'

import Level1 from './components/Level1.vue'
import Level2 from './components/Level2.vue'
import Level3 from './components/Level3.vue'
import Level4 from './components/Level4.vue'
import Level5 from './components/Level5.vue'

const { PrevButton, NextButton, currentPage: level } = useButtons(5)

export default defineComponent({
  name: 'app',
  components: {
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    PrevButton,
    NextButton,
  },
  setup() {
    const componentName = computed(() => `level-${level.value}`)

    onMounted(() => {
      const savedLevel = window.localStorage.getItem('level')
      if (savedLevel) level.value = parseInt(JSON.parse(savedLevel))
    })

    return {
      componentName,
      nextLevel,
    }

    function nextLevel() {
      level.value += 1
      window.localStorage.setItem('level', JSON.stringify(level.value))
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

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
