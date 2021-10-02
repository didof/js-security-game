<template>
  <div>
    <h3>Tips:</h3>
    <button @click="isOpen = !isOpen">{{ label }}</button>
    <ul v-show="isOpen">
      <li v-for="tip in tips" :key="tip">
        {{ tip }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'tips',
  props: {
    tips: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false)

    const label = computed(() => (isOpen.value ? 'hide' : 'show'))

    return { isOpen, label }
  },
})
</script>
