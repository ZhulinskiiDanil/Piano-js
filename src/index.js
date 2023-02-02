import './css/main.scss'
import render from './js/render'
import currentSong from '/js/currentSong'
import song from "/music/2.mp3"

document.onclick = () => {
  currentSong.set(song)
  currentSong.play()
  document.onclick = () => {}
}

render()