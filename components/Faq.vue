<script setup>
import Accordion from "./Form/Accordion.vue";
const isOpenAll = ref(false);

</script>

<template>
  <div class="p-4 py-8">
    <div class="text-center">
      <h2 class="text-xxl mb-4">Frequently Asked Questions</h2>
      <p>Select a category to apply the filter</p>
      <!-- <div class="flex justify-center">
        <div
          class="relative pr-6 cursor-pointer"
          @click="isOpenAll = !isOpenAll"
        >
          All
          <div
            class="border-black border-r-2 border-b-2 w-[10px] h-[10px] absolute right-1 top-[50%] origin-center translate-y-[-50%] transition-all transition-duration-300"
            :class="!isOpenAll ? 'rotate-45' : 'rotate-[-135deg]'"
          ></div>
        </div>
      </div> -->
    </div>

    <div class="text-left">
      <Accordion>
        <template #title>Who can join the Fanta Yummy Breaking Promo</template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et a
          necessitatibus fugit magnam dolore laborum, fugiat ipsa at rerum
          perferendis ipsum est sapiente repellendus, illum vero quo quisquam
          earum magni.</template
        >
      </Accordion>

      <Accordion>
        <template #title>What are the promo rules and regulations?</template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et a
          necessitatibus fugit magnam dolore laborum, fugiat ipsa at rerum
          perferendis ipsum est sapiente repellendus, illum vero quo quisquam
          earum magni.</template
        >
      </Accordion>
      <Accordion>
        <template #title>Where can I register for the event?</template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et a
          necessitatibus fugit magnam dolore laborum, fugiat ipsa at rerum
          perferendis ipsum est sapiente repellendus, illum vero quo quisquam
          earum magni.</template
        >
      </Accordion>
    </div>
  </div>
</template>
