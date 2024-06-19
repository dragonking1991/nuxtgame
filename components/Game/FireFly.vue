<template>
  <canvas id="fireflies" ref="canvasEleRef"></canvas>
</template>
<script setup>
const frameControl = reactive({
  stop: false,
  now: Date.now(),
  then: null,
  elapsed: null,
  fpsInterval: null,
});
const canvasEleRef = ref(null);
const fireflyOptions = ref({ color: 'rgba(236, 196, 94, 1)', speed: 0.4, radius: 2 });
const fireflies = ref([]);

const random = (max , min , isInt = false) => {
  return isInt ? Math.floor(Math.random() * (max - min) + min) : Number((Math.random() * (max - min) + min).toFixed(3));
};
const setOpacity = (color, opacity) => {
  const colors = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\S+)\)$/);
  return `rgba(${colors[1]}, ${colors[2]},${colors[3]},${opacity})`;
};
const drawFireflies = () => {
  const ctx = canvasEleRef.value.getContext('2d');
  ctx.clearRect(0, 0, canvasEleRef.value.width, canvasEleRef.value.height);
  fireflies.value.map((data) => {
    const firefly = fireflyAnimation(data);
    ctx.beginPath();
    ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = firefly.color;
    ctx.shadowBlur = firefly.radius * 5;
    ctx.shadowColor = 'yellow';
    ctx.fill();
  });
};

const fireflyAnimation = (firefly) => {
  // fly
  if (firefly.angle >= 360 || firefly.angle <= 0 || Math.random() * 360 < 6) {
    firefly.veer = !firefly.veer;
  }
  firefly.angle -= firefly.veer ? -firefly.speed : firefly.speed;
  firefly.x += Math.sin((Math.PI / 180) * firefly.angle) * firefly.speed;
  firefly.y += Math.cos((Math.PI / 180) * firefly.angle) * firefly.speed;

  if (firefly.x < 0) firefly.x += canvasEleRef.value.width;
  if (firefly.x > canvasEleRef.value.width) firefly.x -= canvasEleRef.value.width;
  if (firefly.y < 0) firefly.y += canvasEleRef.value.height;
  if (firefly.y > canvasEleRef.value.height) firefly.y -= canvasEleRef.value.height;

  // flicker
  if (firefly.opacity >= 1 || firefly.opacity <= 0.001) {
    firefly.flare = !firefly.flare;
  }

  firefly.opacity -= firefly.flare ? -firefly.rate : firefly.rate;
  firefly.color = setOpacity(firefly.color, firefly.opacity.toFixed(3));

  return firefly;
};

const generateFirefly = () => {
  const veer = false;
  const x = random(canvasEleRef.value.width, fireflyOptions.value.radius, true);
  const y = random(canvasEleRef.value.height, fireflyOptions.value.radius, true);
  const radius = random(fireflyOptions.value.radius + 0.5, fireflyOptions.value.radius - 0.5);
  const angle = random(360, 0, true);
  const rate = random(30 / 1000, 6 / 1000);
  const speed = random(fireflyOptions.value.speed, fireflyOptions.value.speed / 8);
  const opacity = random(1, 0.001);
  const flare = opacity > 0.5;
  const color = fireflyOptions.value.color;
  return {
    x,
    y,
    radius,
    veer,
    angle,
    rate,
    speed,
    flare,
    color,
    opacity,
  };
};

const animate = () => {
  if (frameControl.stop) return;
  requestAnimationFrame(animate);
  frameControl.now = Date.now();
  frameControl.elapsed = frameControl.now - frameControl.then;
  if (frameControl.elapsed > frameControl.fpsInterval) {
    drawFireflies();
    frameControl.then = frameControl.now - (frameControl.elapsed % frameControl.fpsInterval);
  }
};

const startAnimating = (fps) => {
  frameControl.fpsInterval = 1000 / fps;
  frameControl.then = Date.now();
  animate();
};

const updateFireflyNum = () => {
  canvasEleRef.value.width = window.innerWidth;
  canvasEleRef.value.height = window.innerHeight;
  fireflies.value = [];
  let number = (canvasEleRef.value.width / 100) * 10;
  number = number < 100 ? 100 : number;
  for (let i = 0; i < number; i++) {
    fireflies.value.push(generateFirefly());
  }
};

onMounted(() => {
  updateFireflyNum();
  startAnimating(60);
  useEventListener(window, 'resize', () => updateFireflyNum());
});

onBeforeUnmount(() => {
  frameControl.stop = true;
});
</script>

<style lang="scss" scoped>
.firefly {
  width: 2px;
  height: 2px;
  background: yellow;
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(154, 205, 50, 0.4);
  overflow: hidden;
}
</style>
