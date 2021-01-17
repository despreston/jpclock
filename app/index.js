import clock from 'clock'
import document from 'document'
import { preferences } from 'user-settings'

clock.granularity = 'seconds'

const numLbl = document.getElementById('numeric')
const jpLbl = document.getElementById('jp')
const dateLbl = document.getElementById('date')

const ji = '時'
const funpun = '分'

const nums = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十'
}

function getJpForN(n) {
  let s = n > 10 ? '' : nums[n]

  if (n > 10) {
    if (n > 19) {
      s += nums[~~(n / 10)]
    }

    s += nums[10]

    if (n % 10 > 0) {
      s += nums[n % 10]
    }
  }

  return s
}

function padStart(n) {
  return n.toString().length < 2 ? '0' + n : n
}

function time(d) {
  let hours = d.getHours()
  let mins = d.getMinutes()
  let secs = d.getSeconds()
  let ampm = 'PM'

  if (preferences.clockDisplay === '12h') {
    if (hours > 12){
      hours -= 12
    } else if (hours == 0) {
      ampm = 'AM'
      hours += 12
    } else {
      ampm = 'AM'
    }
  }

  return `${hours}:${padStart(mins)}:${padStart(secs)} ${ampm}`
}

clock.addEventListener('tick', evt => {
  numLbl.text = time(evt.date)
  dateLbl.text = evt.date.toDateString()
  const m = evt.date.getMinutes()
  const h = evt.date.getHours()
  jpLbl.text = `${getJpForN(h)}${ji}  ${getJpForN(m)}${funpun}`
})



