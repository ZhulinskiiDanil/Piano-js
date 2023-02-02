import canvas, { ctx } from '/js/canvas'

export default class Line {
  constructor({
    x,
    y,
    w,
    h,
    styles
  }) {
    this.w = w
    this.h = h
    this.x = x
    this.y = y
    this.styles = styles
  }

  draw() {
    ctx.save()

    const data = {
      x: this.x * canvas.width,
      y: this.y * canvas.height,
      w: this.w * canvas.width,
      h: this.h * canvas.height
    }

    this.position(data)
    ctx.fillStyle = this.styles.background || "#000"
    ctx.fillRect(
      data.x,
      data.y,
      data.w,
      data.h
    )

    ctx.restore()
  }

  position(data) {
    const styles = this.styles
    if (styles.alignX === "center") data.x -= data.w / 2
  }
}