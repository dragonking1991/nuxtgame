<script setup>
const canvas = ref(null);
const ctx = ref(null);

let size = reactive({
  w: 300,
  h: 300,
});

const drawBall = (x = 20, y = 20, r = 10, color = "#523423") => {
  ctx.value.beginPath();
  ctx.value.arc(x, y, r, 0, Math.PI * 2);
  ctx.value.fillStyle = color;
  ctx.value.fill();
  ctx.value.closePath();
};

const drawRect = (x = 30, y = 30, h = 30, w = 30, color = "#523423") => {
  ctx.value.beginPath();
  ctx.value.lineWidth = "10";
  ctx.value.rect(x, y, h, w);
  ctx.value.fillStyle = color;
  ctx.value.fill();
  ctx.value.closePath();
};

function drawImageActualSize() {
  ctx.value.width = this.naturalWidth;
  ctx.value.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0);
  ctx.drawImage(this, 0, 0, this.width, this.height);
}
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
  drawBall();
  drawRect();
  // ctx.value.drawImage();
  const image = new Image(60, 45);
  image.onload = drawImageActualSize;
  image.src = "/assets/images/bottle.png";
});
</script>

<template>
  <canvas
    ref="canvas"
    :width="size.w"
    :height="size.h"
    class="border"
  ></canvas>
</template>
