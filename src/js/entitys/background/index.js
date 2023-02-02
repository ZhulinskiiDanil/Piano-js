import settings from '../../settings'
import canvas, { ctx } from '/js/canvas'

export default class Background {
  constructor(background) {
    this.background = background
  }

  draw() {
    ctx.save()

    ctx.fillStyle = settings.background.color || "#222"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    ctx.restore()
  }
}