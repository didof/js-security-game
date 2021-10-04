import { defineComponent, ref, h } from 'vue'

export default function useButtons(pageAmount) {
  const index = ref(1)

  return {
    currentPage: index,
    PrevButton: defineComponent({
      name: 'prev-button',
      render() {
        const attrs = {
          onclick: () => index.value--,
          disabled: index.value === 1,
        }

        return h('button', attrs, 'prev')
      },
    }),
    NextButton: defineComponent({
      name: 'next-button',
      render() {
        const savedLevel = parseInt(
          JSON.parse(window.localStorage.getItem('level'))
        )

        const attrs = {
          onclick: () => index.value++,
          disabled: index.value === pageAmount || index.value === savedLevel,
        }

        return h('button', attrs, 'next')
      },
    }),
  }
}
