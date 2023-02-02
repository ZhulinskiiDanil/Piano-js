import canvas, { ctx } from '/js/canvas'
import settings from '/js/settings'
import currentSong from '/js/currentSong'
import levels from '/js/levels'

export default class Enemys {
  constructor() {
    this.level = false
    this.gameIsOver = false
    this.incrementAfterLoose = 0
    this.activeDigit = false

    document.addEventListener("keydown", e => this.keydown(e.code))
    document.addEventListener("keyup", e => this.activeDigit = false)
  }

  draw() {
    // if (this.activeDigit) console.log(this.activeDigit);
    if (this.gameIsOver) {
      if (this.incrementAfterLoose < canvas.height * settings.enemy.height * 3) {
        this.incrementAfterLoose += canvas.height * settings.enemy.height / 8
      }
      currentSong.audio.pause()
    }
    if (!this.level) return this.checkLevel()
    this.level.enemys
      .reverse()
      .forEach((enemy, index) => {
      const height = canvas.height * settings.enemy.height
      const data = {
        x: ((enemy.line - 1) / 4) * canvas.width,
        y: (canvas.height - height) - height * this.level.speed
          * (enemy.songTime - currentSong.audio.currentTime)
          - this.incrementAfterLoose,
        width: canvas.width / 4,
        height
      }
      if (data.y > canvas.height) return

      const removeEnemy = () => {
        const enemy = this.level.enemys[index]
        if (!enemy || enemy?.removed) return
        enemy.removed = true
      }

      this.collision(data, enemy, removeEnemy)

      ctx.save()
      ctx.fillStyle = settings.enemy?.background || "#151515"
      if (enemy.removed) {
        ctx.fillStyle = "#608ef7"
      }
      // ctx.globalAlpha = enemy.opacity < 0 ? 0 : enemy.opacity || 1
      ctx.fillRect(
        data.x,
        data.y,
        data.width,
        data.height
      )
      ctx.restore()
    })

    this.activeDigit = false
  }

  collision(data, enemy, removeEnemy) {
    if (this.gameIsOver) return
    for (let i = 1; i < 5; i++) {
      const isBtns = data.y + data.height > canvas.height - canvas.height * settings.enemy.height
      if (this.activeDigit === i && enemy.line === i && isBtns) {
        removeEnemy(enemy.songTime)
      }
    }

    if (data.y > canvas.height && !enemy.removed) this.gameIsOver = true;
    else if (data.y > canvas.height) removeEnemy()
  }

  keydown(code) {
    const digit1 = ["Digit1"] // 1
    const digit2 = ["Digit2"] // 2
    const digit3 = ["Digit3"] // 3
    const digit4 = ["Digit4"] // 4
    if (digit1.includes(code)) this.activeDigit = 1
    if (digit2.includes(code)) this.activeDigit = 2
    if (digit3.includes(code)) this.activeDigit = 3
    if (digit4.includes(code)) this.activeDigit = 4
  }

  checkLevel() {
    const findByStr = "/music" + currentSong.audio.src.split('/music')[1]
    const findLevel = levels.find(elm => elm.song === findByStr)
    if (!findLevel) return
    this.level = findLevel
  }
}