const canvas = document.getElementsByTagName('canvas')[0]
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top

})
const ctx = canvas.getContext('2d')
const MAXWIDTH = 800
const MAXHEIGHT = 600
canvas.width = MAXWIDTH
canvas.height = MAXHEIGHT
const mouse = {
    x: MAXWIDTH / 2,
    y: MAXHEIGHT / 2
}
const colors = ['#00bdff', '#4d39ce','#088eff']
let particles = []

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 1 + Math.random()*5
        this.color =colors[Math.floor(Math.random()*colors.length)]
        this.v =  0.05
        this.radian = Math.random() * Math.PI * 2
        this.dist = 100 + Math.random()* 50
        this.lastMouse = {x,y}
    }

    update() {
        let lastPoint = {x:this.x, y: this.y}
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.dist
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.dist
        this.radian += this.v
        this.draw(lastPoint)
    }

    draw(lastpoint) {
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.r
        ctx.moveTo(lastpoint.x, lastpoint.y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        ctx.closePath()
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        let p = new Particle(MAXWIDTH/2, MAXHEIGHT/2)
        particles.push(p)
    }
}


function loop() {
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(0, 0, MAXWIDTH, MAXHEIGHT)
    for (const particle of particles) {
        particle.update()
    }
    requestAnimationFrame(loop)
}

init()
loop()