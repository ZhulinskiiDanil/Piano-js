import canvas, { ctx } from '/js/canvas'
import settings from '/js/settings'

export default class Footer {
  constructor() {
    this.width = canvas.width
    this.height = canvas.height * settings.footer.height
    this.x = 0
    this.y = canvas.height - this.height
  }

  draw() {
    this.update()
    ctx.save()

    ctx.fillStyle = settings.footer.bg || "#000"
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    )

    ctx.restore()
  }

  update() {
    this.width = canvas.width
    this.height = canvas.height * settings.footer.height
    this.y = canvas.height - this.height
  }
}