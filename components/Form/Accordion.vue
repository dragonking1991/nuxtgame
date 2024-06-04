<script setup>
const isOpen = ref(false);
</script>

<template>
  <div class="border-b py-4">
    <div @click="isOpen = !isOpen" class="pr-8 relative cursor-pointer font-[500]">
      <slot name="title" />
      <div
        class="border-black border-r-2 border-b-2 w-[8px] h-[8px] absolute right-1 top-[50%] translate-y-[-50%] transition-all transition-duration-300 origin-center"
        :class="!isOpen ? 'rotate-45' : 'rotate-[-135deg]'"
      ></div>
    </div>

    <div
      class=" transition-all transition-duration-300 overflow-hidden"
      :class="!isOpen ? 'h-[0px]' : 'h-full'"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
