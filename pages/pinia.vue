<script setup>
const store = useCounterStore();
import { debounce } from "lodash";

const { name, doubleCount, count, increment } = store;
// store.$patch({
//   count: store.count + 10,
//   age: 120,
//   name: "DIO",
// });
onMounted(() => {
  setTimeout(() => {
    increment(5);
  }, 1000);

  store.$subscribe(
    () => {
      console.log(store.name, store.age, store.count, store.doubleCount);
    },
    { detached: true }
  );
});
</script>

<template>
  {{ store.name }}
  {{ store.age }}
  {{ store.count }}
  {{ store.doubleCount }}
</template>

<style scoped lang="scss"></style>
