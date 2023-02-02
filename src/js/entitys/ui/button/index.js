import canvas, { ctx } from '/js/canvas'

export default class Button {
  constructor({ x, y, w, h, text, styles, onClick, ...props }) {
    this.styles = styles
    this.width = w
    this.height = h
    this.x = x || 0
    this.y = y || 0
    this.text = text || ""
    for (let key in props) {
      this[key] = props[key]
    }

    if (onClick) this.bindClick(onClick)
  }

  draw() {
    ctx.save()
    
    const data = {
      x: this.x * canvas.width,
      y: this.y * canvas.height,
      width: this.width * canvas.width,
      height: this.height * canvas.height
    }

    this.drawBorder(data)
    this.position(data)

    ctx.fillStyle = this.styles.background || "#000"
    ctx.fillRect(
      data.x,
      data.y,
      data.width < 0 ? 0 : data.width,
      data.height < 0 ? 0 : data.height
    )

    this.drawText(data)
    ctx.restore()
  }

  drawText(data) {
    const textData = {
      text: this.text,
      x: data.x,
      y: data.y,
      fontSize: (data.height + data.width) / 10,
      color: this.styles.color || "#000",
      align: {
        x: this.styles.textAlign.split(' ')[0],
        y: this.styles.textAlign.split(' ')[1]
      }
    }

    if (textData.align.x === "center") textData.x += data.width / 2
    if (textData.align.y === "center") textData.y += data.height / 2 + textData.fontSize / 4
    
    ctx.font = `${textData.fontSize}px sans-serif`
    ctx.fillStyle = textData.color
    ctx.fillText(textData.text, textData.x, textData.y)
  }

  position(data) {
    if (this.styles.alignY === 'bottom') data.y += this.height
    if (this.styles.justify === "center") data.x = canvas.width / 2 - this.width / 2
    if (this.styles.justify === "right") data.x = canvas.width - this.width
  }

  drawBorder(data) {
    if (!this.styles.border) return
    const border = {
      width: this.styles.border.split(' ')[0].match(/[0-9]/g).join('') * 3,
      color: this.styles.border.split(' ')[1]
    }

    if (border.width <= 0) return

    ctx.fillStyle = border.color || "#000"
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(
        i % 2 === 0 ? data.x : data.x,
        i % 2 === 0 ? data.y : data.y,
        i % 2 === 0 ? border.width : data.width,
        i % 2 === 0 ? data.height : border.width
      )
    }

    for (let i = 0; i < 2; i++) {
      ctx.fillRect(
        i % 2 === 0 ? data.x + data.width - border.width : data.x,
        i % 2 === 0 ? data.y : data.y + data.height - border.width,
        i % 2 === 0 ? border.width : data.width,
        i % 2 === 0 ? data.height : border.width
      )
    }

    data.width -= border.width / 2
    data.height -= border.width / 2
    data.x += border.width / 4
    data.y += border.width / 4
  }

  bindClick(onClick) {
    document.addEventListener("click", e => {
      const data = {
        x: this.x * canvas.width,
        y: this.y * canvas.height,
        width: this.width * canvas.width,
        height: this.height * canvas.height
      }

      this.position(data)
      const termByX = e.offsetX > data.x && e.offsetX < data.x + data.width
      const termByY = e.offsetY > data.y && e.offsetY < data.y + data.height
      if (termByX && termByY) {
        onClick.call(this)
      }
    })
  }
}