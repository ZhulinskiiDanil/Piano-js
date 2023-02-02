import Button from '/js/entitys/ui/button'
import settings from '/js/settings'
import UI from '/js/libs/UI'

const btns = [
  "1",
  "2",
  "3",
  "4"
]

export default [
  ...UI.getEmptyArray(btns.length, "$").map(num => {
    return {
      zIndex: 1,
      component: new Button({
        id: num,
        x: (1 / btns.length) * num,
        y: 1 - settings.footer.height,
        w: 1 / btns.length,
        h: settings.footer.height,
        text: btns[num],
        styles: {
          background: settings.footer.buttons.background || "#1a1a1a",
          alignY: "",
          justify: "left",
          border: "2px #555",
          color: "#aaa",
          textAlign: "center center"
        },
        onClick() {
          console.log(this);
          const bg = this.styles.background
          this.styles.background = "red"
          setTimeout(() => this.styles.background = bg, 500)
          // this mutation
        }
      })
    }
  })
]