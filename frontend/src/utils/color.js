const color = (data)=> {
    if(data) {
        document.documentElement.style.setProperty("--color-body", data.color_body)
        document.documentElement.style.setProperty("--color-font", data.color_font)
        document.documentElement.style.setProperty("--color-cont", data.color_cont)
        document.documentElement.style.setProperty("--color-mine", data.color_mine)
        document.documentElement.style.setProperty("--color-color", data.color_color)
        document.documentElement.style.setProperty("--color-form", data.color_form)
        document.documentElement.style.setProperty("--color-all", data.color_all)
      } else {
            const oop = {
                  color_body: '#ffffffff',
                  color_font: '#000000ff',
                  color_cont: '#ffffff', 
                  color_mine: '#ffffff', 
                  color_color: "#9272ba",
                  color_form: "#9272ba",
                  color_all: "#9272ba",
                  colorc: "#ffffffff",}
        document.documentElement.style.setProperty("--color-body", oop.color_body)
        document.documentElement.style.setProperty("--color-font", oop.color_font)
        document.documentElement.style.setProperty("--color-cont", oop.color_cont)
        document.documentElement.style.setProperty("--color-mine", oop.color_mine)
        document.documentElement.style.setProperty("--color-color", oop.color_color)
        document.documentElement.style.setProperty("--color-form", oop.color_form)
        document.documentElement.style.setProperty("--color-all", oop.color_all)
      }
}
export default color