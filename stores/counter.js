export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const age = ref(1)
  const doubleCount = computed(() => count.value * 2)
  function increment(arg = 1) {
    count.value = count.value + arg
  }

  return { count, name, age, doubleCount, increment }
})