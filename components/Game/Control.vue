<template>
  <FormButton @click="$emit('start')" class="absolute bottom-5 left-[50%] translate-x-[-50%]">Start</FormButton>
</template>

<script setup>
  const $emit = defineEmits(["start"])
</script>