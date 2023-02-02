export default class Song {
  constructor(props = {}) {
    const { src } = props
    this.src = src || ""
    this.audio = new Audio()
    this.loaded = false
  }

  set(sound) {
    this.loaded = false
    this.audio = new Audio(sound)
    this.audio.oncanplaythrough = () => {
      this.loaded = true
    }
  }

  play() {
    if (this.loaded) this.audio.play()
    else this.audio.oncanplaythrough = () => {
      this.audio.play()
    }
  }

  async getLength() {
    const audio = this.audio
    if (this.loaded) return audio.duration

    return new Promise(res => {
      audio.oncanplaythrough = () => {
        res(audio.duration)
      }
    })
  }
}