import Footer from './entitys/footer'
import Background from './entitys/background'
import Enemys from './entitys/enemys'

// Fragments
import footerButtons from './fragments/footerButtons'
import backgroundLines from './fragments/backgroundLines'
import canvas, { ctx } from '/js/canvas'

import UI from './libs/UI'

const ui = {
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  },
  components: {
    components: [
      { zIndex: 0, component: new Background() },
      { zIndex: 0, component: new Footer() },
      { zIndex: 0, component: new Enemys() },
      ...footerButtons,
      ...backgroundLines,
    ],
    draw() { UI.drawComponents(this.components) }
  }
}

export default ui