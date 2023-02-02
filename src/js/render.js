import ui from '/js/ui'
import currentSong from '/js/currentSong'
let interval = false

function loop() {
  // currentSong.audio.currentTime / currentSong.audio.duration
  ui.clear()
  ui.components.draw()
}

export default function render() {
  clearInterval(interval)
  interval = setInterval(loop, 1000 / 60)
}