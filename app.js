/**
 * Day 1:
 * A Simple timer made with html, css and js.
 * 
 * TODO: save marks.
 */
let timerArray = []

const display = document.querySelector('#timer-display')

const pad = (d) => (d < 10) ? '0' + d.toString() : d.toString()

const mount = () => display.innerHTML = `${pad(timerArray[0])}:${pad(timerArray[1])}`

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

let setIntervalHandler = null

function keydownHandler (ev) {
  if (ev.key !== 'Enter' && ev.keyCode !== 13) return

  console.info('Enter pressed ...')

  if (!Number(ev.target.value)) {
    alert('You need a number as seconds to start the counter!')
    return
  }

  const countdown = Number(ev.target.value)
  timerArray = [Math.floor(countdown / 60), Math.floor(countdown % 60)]

  mount()

  if (!setIntervalHandler) {
    setIntervalHandler = setInterval(startTimer, 1000)
  }

}