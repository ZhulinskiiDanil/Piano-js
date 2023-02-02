const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerHeight / (16 / 9)

window.addEventListener('resize', e => {
  canvas.height = window.innerHeight
  canvas.width = window.innerHeight / (16 / 9)
})

export const ctx = canvas.getContext("2d")
export default canvas