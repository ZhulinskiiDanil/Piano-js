import Line from '/js/entitys/ui/line'
import settings from '/js/settings'
import UI from '/js/libs/UI'

const linesCount = 3
export default [
  ...UI.getEmptyArray(linesCount, "$").map(line => {
    return {
      zIndex: 0,
      component: new Line({
        x: 1 / 2 * ((line + 1) / (linesCount - 1)),
        y: 0,
        w: settings.lines.width,
        h: 1,
        styles: {
          background: "#333",
          alignX: "center"
        }
      })
    }
  })
]