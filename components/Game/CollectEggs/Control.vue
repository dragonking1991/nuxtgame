<template>
  <FormButton
    v-if="!playing && !lose && !win"
    @click="$emit('start')"
    class="absolute bottom-5 left-[50%] translate-x-[-50%]"
  >
    Start
  </FormButton>

  <FormButton
    v-if="lose || win"
    @click="$emit('replay')"
    class="absolute bottom-5 left-[50%] translate-x-[-50%]"
  >
    Replay
  </FormButton>

</template>

<script setup>
const $props = defineProps({
  status: {
    type: Object,
    default: {},
  },
});
const $emit = defineEmits(["start", "replay", "stop", "continue"]);
const playing = computed(() => $props.status.playing);
const lose = computed(() => $props.status.lose);
const win = computed(() => $props.status.win);
const stop = computed(() => $props.status.stop);
</script>
