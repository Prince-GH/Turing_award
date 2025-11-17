const video = document.getElementById('myVideo')
const control = document.getElementById('ctrl')
const playBtn = document.getElementById('play-ctrl')

control.addEventListener('click', () => {
  if (video.paused) {
    video.play()
    playBtn.src = 'media/icon/pause.png' // change to pause image
  } else {
    video.pause()
    playBtn.src = 'media/icon/play.png' // change to play image
  }
})

// Keep image in sync if video is paused or played by other means
video.addEventListener('pause', () => (playBtn.src = 'media/icon/play.png'))
video.addEventListener('play', () => (playBtn.src = 'media/icon/pause.png'))
