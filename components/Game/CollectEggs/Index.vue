<script setup>
import { GamePlay } from "~/entities/CollectEggs/gamePlay";

const canvas = ref(null);
const game = ref(null);
const keyPress = ref(null);
const status = reactive({
  start: false,
  playing: false,
  pausing: false,
  win: false,
  lose: false,
  score: 0,
});

const statusGame = computed(() => {
  return game.value?.status;
});

const score = computed(() => {
  return game.value?.checkScore() || 0;
});

// const { elementX, isOutside } = useMouseInElement(canvas);

onMounted(() => {
  useEventListener(document, "keydown", ({ key }) => {
    keyPress.value = key;
  });
  useEventListener(document, "keyup", () => {
    keyPress.value = "";
  });

  const gameConfig = {
    status: status,
    canvas: canvas.value,
    setup: {
      balls: 2,
      stop: false,
    },
    interact: {
      keyPress,
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
    <GameCollectEggsControl
      :status="statusGame"
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
