export default {
  getEmptyArray(count = 1, fill) {
    const array = [...Array(count)]
    if (fill === "$") return array.map((elm, index) => index)
    return array
  },

  drawComponents(components) {
    components
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach(elm => {
        if (!elm.component) return elm.draw()
        elm.component.draw()
      })
  }
}