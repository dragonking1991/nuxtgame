<script setup>
import { GamePlay } from "~/entities/gamePlay";

const setup = {
  balls: 2,
  stop: false,
};

const canvas = ref(null);
const ctx = ref(null);
const eggs = ref([]);
const basket = ref(null);
const game = ref(null);
const keyPress = ref(null);

const { elementX, isOutside } = useMouseInElement(canvas);
const status = reactive({
  start: false,
  playing: false,
  stop: false,
  win: false,
  lose: false,
  score: 0,
});

const score = computed(() => {
  return game.value?.checkScore() || 0;
});

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");

  useEventListener(document, "keydown", ({ key }) => {
    keyPress.value = key;
  });
  useEventListener(document, "keyup", () => {
    keyPress.value = "";
  });

  const gameConfig = {
    canvas: canvas.value,
    ctx: ctx.value,
    canvas: canvas.value,
    basket: basket.value,
    eggs: eggs.value,
    status: status,
    setup: setup,
    interact: {
      keyPress,
      elementX,
      isOutside,
    },
  };

  game.value = new GamePlay(gameConfig);
  game.value.refreshCanvas();
  useEventListener(window, "resize", () => game.value.refreshCanvas());
});
</script>

<template>
  <div class="overflow-hidden w-screen h-screen relative">
    <canvas ref="canvas"></canvas>
    <GameControl
      :status="status"
      @start="game.start()"
      @replay="game.replay()"
      @stop="game.stop()"
      @continue="game.play()"
    />
    <div class="absolute top-4 right-4 font-bold">
      {{ score }}
    </div>
  </div>
</template>
