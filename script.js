// Select elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const sliders = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Play / Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

// Update play/pause icon on video events
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('pause', () => toggle.textContent = '►');

toggle.addEventListener('click', togglePlay);

// Skip buttons
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += parseFloat(btn.dataset.skip);
  });
});

// Volume & playback speed controls
sliders.forEach(slider => {
  slider.addEventListener('input', () => {
    video[slider.name] = slider.value;
  });
});

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
}

video.addEventListener('timeupdate', handleProgress);

// Scrub (seek)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);
