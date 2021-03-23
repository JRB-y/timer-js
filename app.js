/**
 * Day 1:
 * A Simple timer made with html, css and js.
 * 
 * TODO: save marks.
 */
let countdown = null // input in seconds
let timerArray = []
let setIntervalHandler = null

const display = document.querySelector('#timer-display') // the span on the HTML
const progressBar = document.querySelector('#progress-bar')

const pad = (d) => (d < 10) ? '0' + d.toString() : d.toString()

const mount = () => {
  display.innerHTML = `${pad(timerArray[0])}:${pad(timerArray[1])}`
  reduceProgressBar()
}

const startTimer = () => {
  if (timerArray[1] > 0) {
    timerArray[1]--
  } else if (timerArray[0] > 0) {
    timerArray[0]--
    timerArray[1] = 59
  } else {
    clearInterval(setIntervalHandler)
    setIntervalHandler = null
  }
  mount()
}

const reduceProgressBar = () => {
  const unit = Math.ceil(100 / countdown)
  const oldValue = +progressBar.style.width.slice(0, progressBar.style.width.length - 1)
  const newValue = oldValue - unit < 0 ? 0 : oldValue - unit
  progressBar.style.width = `${newValue}%`
}

function keydownHandler (ev) {
  if (ev.key !== 'Enter' && ev.keyCode !== 13) return

  console.info('Enter pressed ...')

  if (!Number(ev.target.value) || ev.target.value < 0) {
    alert('You need a number as seconds to start the counter!')
    return
  }

  countdown = Number(ev.target.value)
  timerArray = [Math.floor(countdown / 60), Math.floor(countdown % 60)]


  const unit = Math.ceil(100 / countdown)
  // progressBar.style.width = `${unit * (1 + countdown) }%`
  progressBar.style.width = `${100 + unit}%`
  mount()

  if (!setIntervalHandler) {
    setIntervalHandler = setInterval(startTimer, 1000)
  }

}