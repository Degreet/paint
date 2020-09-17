const ctx = canvas.getContext("2d")
let color = colorpicker.value = localStorage.color || "#000000"
let x, y
let radius = radiuspicker.value = localStorage.radius || 5

colorpicker.onchange = () => localStorage.color = color = colorpicker.value
radiuspicker.onchange = () => localStorage.radius = radius = radiuspicker.value

backpicker.onchange = () => {
  const val = backpicker.value
  localStorage.bg = ctx.fillStyle = val
  ctx.fillRect(0, 0, innerWidth, innerHeight)
}

onload = onresize = function () {
  canvas.width = innerWidth
  canvas.height = innerHeight - 4

  ctx.fillStyle = backpicker.value = localStorage.bg || '#fff'
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  ctx.fillRect(0, 0, innerWidth, innerHeight)

  mytoolbar.style.left = innerWidth / 2 - mytoolbar.offsetWidth / 2 + "px"
}

function circle(x, y) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 8)
  ctx.fill()
}

function line(x1, y1, x2, y2) {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = radius * 2
  ctx.stroke()
}

canvas.onmousedown = function () {
  canvas.onmousemove = function (event) {
    if (x && y) {
      line(x, y, event.x, event.y)
    }

    // x = event.x
    // y = event.y
    ({ x, y } = event)
    circle(x, y)
  }
}

clearFieldBtn.onclick = () => {
  ctx.fillStyle = backpicker.value = localStorage.bg || '#fff'
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  ctx.fillRect(0, 0, innerWidth, innerHeight)
}

clearDataBtn.onclick = () => {
  localStorage.clear()
  location.reload()
}

downloadImageBtn.onclick = () => {
  const a = document.createElement('a')
  a.download = true
  a.href = canvas.toDataURL('image/jpeg')
  a.click()
}

canvas.onmouseup = function () {
  canvas.onmousemove = null
  x = y = undefined
}

onkeydown = function (event) {
  if (event.key == "ArrowUp" && radius < 40) {
    radius++
  } else if (event.key == "ArrowDown" && radius > 1) {
    radius--
  } else if (event.key == "Enter") {
    ctx.fillStyle = localStorage.bg || '#fff'
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    if (event.ctrlKey) {
      localStorage.clear()
      location.reload()
      return
    }
  }

  localStorage.radius = radiuspicker.value = radius
}