export const drawCircle = ({ ctx, x = 20, y = 20, r = 10, color = "#523423" }) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
export const drawRect = ({ ctx, x = 30, y = 30, w = 30,h = 100, color = "#523423" }) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
export const drawImg = (ctx, x = 30, y = 30, src = "/assets/images/bottle.png") => {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
  img.src = src;
};
export const drawObj = (Obj) => {
  Obj.r && drawCircle(Obj)
  Obj.src && drawImg(Obj)
  Obj.w && Obj.h && drawRect(Obj)
}

export const checkCircleAndRectCollision = (c, r) => {
  let dx = c.x - Math.max(r.x, Math.min(c.x, r.x + r.w))
  let dy = c.y - Math.max(r.y, Math.min(c.y, r.y + r.h))
  return (dx * dx + dy * dy) < (c.r * c.r)
}
export const checkRectCollision = (r1, r2) => {
  return (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  );
}
export const checkCircleCollision = (c1, c2) => {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < c1.radius + c2.radius;
}
export const checkCollision = (v, c) => {
  return v.r && c.r && checkCircleCollision(v, c) ||
    v.r && !c.r && checkCircleAndRectCollision(v, c) ||
    !v.r && c.r && checkCircleAndRectCollision(c, v) ||
    !v.r && !c.r && checkRectCollision(v, c)
}