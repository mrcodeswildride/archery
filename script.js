let playingArea = document.getElementById(`playingArea`)
let bow = document.getElementById(`bow`)
let target = document.getElementById(`target`)
let hitVaue = document.getElementById(`hitValue`)
let shotValue = document.getElementById(`shotValue`)

let gravity = 0.3
let arrowWidth = 50
let arrowHeight = 11
let hit = 0
let shot = 0

document.addEventListener(`mousemove`, tilt)
document.addEventListener(`click`, launch)

function tilt(event) {
  let bowAngle = getBowAngle(event.offsetX, event.offsetY)
  bow.style.transform = `rotate(${bowAngle}rad)`
}

function launch(event) {
  let bowAngle = getBowAngle(event.offsetX, event.offsetY)
  bow.style.transform = `rotate(${bowAngle}rad)`

  let bowX = bow.offsetLeft + (bow.width / 2)
  let bowY = bow.offsetTop + (bow.height / 2)

  let arrow = document.createElement(`img`)
  arrow.src = `arrow.png`
  arrow.classList.add(`arrow`)
  arrow.style.left = `${bowX - arrowWidth / 2}px`
  arrow.style.top = `${bowY - arrowHeight / 2}px`
  arrow.style.transform = `rotate(${bowAngle}rad)`
  arrow.hSpeed = Math.cos(bowAngle) * 20
  arrow.vSpeed = Math.sin(bowAngle) * 20
  playingArea.appendChild(arrow)

  arrow.intervalId = setInterval(move, 50, arrow)
}

function move(arrow) {
  arrow.vSpeed += gravity

  let angle = Math.atan2(arrow.vSpeed, arrow.hSpeed)

  arrow.style.left = `${arrow.offsetLeft + arrow.hSpeed}px`
  arrow.style.top = `${arrow.offsetTop + arrow.vSpeed}px`
  arrow.style.transform = `rotate(${angle}rad)`

  if (touching(arrow, target)) {
    targetHit(arrow)
  }
  else if (arrow.offsetLeft < -arrowWidth || arrow.offsetLeft > playingArea.offsetWidth || arrow.offsetTop > playingArea.offsetHeight) {
    clearInterval(arrow.intervalId)
    arrow.remove()

    shot++
    shotValue.innerHTML = shot
  }
}

function targetHit(arrow) {
  clearInterval(arrow.intervalId)
  arrow.remove()
  moveTarget()

  hit++
  hitVaue.innerHTML = hit

  shot++
  shotValue.innerHTML = shot
}

function moveTarget() {
  let randomX = Math.random() * 420 + 500
  let randomY = Math.random() * 347

  target.style.left = `${randomX}px`
  target.style.top = `${randomY}px`
}

function getBowAngle(mouseX, mouseY) {
  let bowX = bow.offsetLeft + (bow.width / 2)
  let bowY = bow.offsetTop + (bow.height / 2)

  let x = mouseX - bowX
  let y = mouseY - bowY

  return Math.atan2(y, x)
}

function touching(object1, object2) {
  let object1LeftSide = object1.offsetLeft
  let object1RightSide = object1.offsetLeft + object1.offsetWidth
  let object1TopSide = object1.offsetTop
  let object1BottomSide = object1.offsetTop + object1.offsetHeight

  let object2LeftSide = object2.offsetLeft
  let object2RightSide = object2.offsetLeft + object2.offsetWidth
  let object2TopSide = object2.offsetTop
  let object2BottomSide = object2.offsetTop + object2.offsetHeight

  let objectsTouchingHorizontally = object1RightSide >= object2LeftSide && object1LeftSide <= object2RightSide
  let objectsTouchingVertically = object1BottomSide >= object2TopSide && object1TopSide <= object2BottomSide

  return objectsTouchingHorizontally && objectsTouchingVertically
}