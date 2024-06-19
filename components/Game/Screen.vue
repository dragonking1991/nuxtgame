<template>
  <canvas ref="canvas" class="border"></canvas>
  <statusControl @start="start" />
</template>

<script setup>
const canvas = ref(null);
const ctx = ref(null);
const eggs = ref([]);

const status = reactive({
  start: false,
  playing: false,
  win: false,
  lose: false,
  score: 0,
  activeIndex: 0,
});

const createEggs = () => {
  for (let index = 0; index < 10; index++) {
    const option = {
      ctx: ctx.value,
      x: Math.random() * 500 + 50,
      y: 0,
      r: 20,
      color: getRandomColor(),
      speed: Math.random() * 2 + 1,
    };
    eggs.value = [...eggs.value, option];
  }
};

const start = () => {
  update();
  createEggs();

  useEventListener(window, "resize", () => update());
};

const update = () => {
  refreshCanvas();

  if (!playing.value) return;
  draw();
  moveEggs();
  checkCollision();
  if (eggs.value.length === 0 && !status.win) {
    status.lose = true;
    status.playing = false;
  } else if (status.score >= 10) {
    status.win = true;
    status.playing = false;
  } else {
    window.requestAnimationFrame(update);
  }
};

const moveEggs = () => {
  const active = eggs.value[status.activeIndex]
  if(active.y <= canvas.value.height){
    active.y += active.speed;
  } else {
    status.activeIndex += 1
  }
};

const refreshCanvas = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
});
</script>
