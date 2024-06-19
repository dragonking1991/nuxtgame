export const drawBall = (ctx, x = 20, y = 20, r = 10, color = "#523423") => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
export const drawEgg = (ctx, x = 20, y = 20, r = 10, color = "#523423") => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
};


export const drawRect = (ctx, x = 30, y = 30, h = 30, w = 30, color = "#523423") => {
  ctx.beginPath();
  ctx.lineWidth = "10";
  ctx.rect(x, y, h, w);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

export const drawBottle = (ctx, x = 30, y = 30) => {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
  img.src = "/assets/images/bottle.png";
};

export const checkCollision = (victim, target) => {
  let dx = victim.x - Math.max(target.x, Math.min(victim.x, target.x + target.width))
  let dy = victim.y - Math.max(target.y, Math.min(victim.y, target.y + target.height))
  return (dx * dx + dy * dy) < (victim.radius * victim.radius)
}