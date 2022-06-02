const songTheHIT = new Audio()
songTheHIT.src = './assets/efeitos_hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,

  draw() {
    ctx.fillStyle = '#70c5ce'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(
      sprites,
      background.spriteX,
      background.spriteY, //Sprite X, Sprite Y

      background.width,
      background.height, // tamanho do recorte na Sprite

      background.x,
      background.y,

      background.width,
      background.height //tamanho do canvas
    )

    ctx.drawImage(
      sprites,
      background.spriteX,
      background.spriteY, //Sprite X, Sprite Y

      background.width,
      background.height, // tamanho do recorte na Sprite

      background.x + background.width,
      background.y,

      background.width,
      background.height //tamanho do canvas
    )
  }
}

const floor = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,

  draw() {
    ctx.drawImage(
      sprites,
      floor.spriteX,
      floor.spriteY, //Sprite X, Sprite Y

      floor.width,
      floor.height, // tamanho do recorte na Sprite

      floor.x,
      floor.y,

      floor.width,
      floor.height //tamanho do canvas
    )

    ctx.drawImage(
      sprites,
      floor.spriteX,
      floor.spriteY, //Sprite X, Sprite Y

      floor.width,
      floor.height, // tamanho do recorte na Sprite

      floor.x + floor.width,
      floor.y,

      floor.width,
      floor.height //tamanho do canvas
    )
  }
}

function collision(flappyBird, floor) {
  const flappyBirdY = flappyBird.y + flappyBird.height
  const floorY = floor.y

  if (flappyBirdY >= floorY) {
    return true
  }
  return false
}

function createFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    toJump: 4.6,
    jump() {
      console.log('pular')
      flappyBird.speed = -flappyBird.toJump
    },
    gravity: 0.25,
    speed: 0,
    update() {
      if (collision(flappyBird, floor)) {
        songTheHIT.play()

        setTimeout
        switchToScreen(screens.START)
        return
      }

      flappyBird.speed = flappyBird.speed + flappyBird.gravity
      flappyBird.y = flappyBird.y + flappyBird.speed
    },

    draw() {
      ctx.drawImage(
        sprites,
        flappyBird.spriteX,
        flappyBird.spriteY, //Sprite X, Sprite Y

        flappyBird.width,
        flappyBird.height, // tamanho do recorte na Sprite

        flappyBird.x,
        flappyBird.y,

        flappyBird.width,
        flappyBird.height //tamanho do canvas
      )
    }
  }
  return flappyBird
}

const messageGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  draw() {
    ctx.drawImage(
      sprites,
      messageGetReady.sX,
      messageGetReady.sY,

      messageGetReady.w,
      messageGetReady.h,

      messageGetReady.x,
      messageGetReady.y,

      messageGetReady.w,
      messageGetReady.h
    )
  }
}

const globals = {}
//screens
let screenActive = {}
function switchToScreen(newScreen) {
  screenActive = newScreen

  if (screenActive.startup) {
    screenActive.startup()
  }
}

const screens = {
  START: {
    startup() {
      globals.flappyBird = createFlappyBird()
    },

    draw() {
      background.draw()
      floor.draw()
      globals.flappyBird.draw()

      messageGetReady.draw()
    },
    click() {
      switchToScreen(screens.GAME)
    },
    update() {}
  }
}

screens.GAME = {
  draw() {
    background.draw()
    floor.draw()
    globals.flappyBird.draw()
  },
  click() {
    globals.flappyBird.jump()
  },
  update() {
    globals.flappyBird.update()
  }
}

//changeClickScreenGame
window.addEventListener('click', function () {
  if (screenActive.click) {
    screenActive.click()
  }
})

function loop() {
  screenActive.draw(), screenActive.update()

  requestAnimationFrame(loop)
}
switchToScreen(screens.START)
loop()
