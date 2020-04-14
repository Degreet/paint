const ctx = canvas.getContext("2d")
let color = colorpicker.value = localStorage.color || "#000000"
let x, y
let radius = radiuspicker.value = localStorage.radius || 5
document.body.style.background = backpicker.value = localStorage.bg || "#ffffff"

colorpicker.onchange = function () {
    localStorage.color = color = colorpicker.value
}

backpicker.onchange = function () {
    localStorage.bg = document.body.style.background = backpicker.value
}

radiuspicker.onchange = function () {
    localStorage.radius = radius = radiuspicker.value
}

onload = onresize = function () {
    canvas.width = innerWidth
    canvas.height = innerHeight - 4

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
        ({x, y} = event)
        circle(x, y)
    }
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
        ctx.clearRect(0, 0, innerWidth, innerHeight)
        if (event.ctrlKey) {
            localStorage.clear()
            location.reload()
            return
        }
    } 

    localStorage.radius = radiuspicker.value = radius
}