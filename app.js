/**
 * Day 2:
 * A Simple timer made with html, css and js.
 * 
 * TODO: save marks.
 */

/*** Helpers ***/
let setIntervalHandler = null
const pad = (d) => (d < 10) ? '0' + d.toString() : d.toString()
const mount = (elements) => {
  console.log(timer)
  elements.forEach(el => el.mount())

}

/*** Elements ***/
let timer
function Timer (input) {
  this.countdown = Number(input)
  this.unit = Math.ceil(100 / this.countdown)
  this.timerArray = [
    Math.floor(this.countdown / 60),  // minutes
    Math.floor(this.countdown % 60)   //seconds
  ]
  this.htmlElement = document.querySelector('#timer-display')
  this.mount = () => {
    this.htmlElement.innerHTML = `${pad(this.timerArray[0])}:${pad(this.timerArray[1])}`
  }
}

let progressBar
function ProgressBar (unit) {
  this.htmlElement = document.querySelector('#progress-bar')
  this.htmlElement.style.width = `${100 + unit}%`
  this.mount = () => {
    const width = this.htmlElement.style.width
    const oldValue = +width.slice(0, width.length - 1)
    const newValue = oldValue - timer.unit < 0 ? 0 : oldValue - timer.unit
    this.htmlElement.style.width = `${newValue}%`
  }
}

/*** Main functions ***/
function keydownHandler (ev) {
  if (ev.key !== 'Enter' && ev.keyCode !== 13) return

  console.info('Enter pressed ...')

  if (!Number(ev.target.value) || ev.target.value < 0) {
    alert('You need a number as seconds to start the counter!')
    return
  }

  timer = new Timer(ev.target.value)
  progressBar = new ProgressBar(timer.unit)

  mount([timer, progressBar])

  if (!setIntervalHandler) {
    setIntervalHandler = setInterval(refreshTimer, 1000)
  }
}

const refreshTimer = () => {
  if (timer.timerArray[1] > 0) {
    timer.timerArray[1]--
  } else if (timer.timerArray[0] > 0) {
    timer.timerArray[0]--
    timer.timerArray[1] = 59
  } else {
    clearInterval(setIntervalHandler)
    setIntervalHandler = null
  }
  mount([timer, progressBar])
}
