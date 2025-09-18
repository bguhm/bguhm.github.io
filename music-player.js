let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// ---- Web Audio API setup ----
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(curr_track);
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

// Animate wave
function renderWave() {
  requestAnimationFrame(renderWave);
  if (isPlaying) {
    analyser.getByteFrequencyData(dataArray);
    let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
    wave.style.display = "block";
    wave.style.transform = `scaleY(${Math.max(0.3, volume / 100)})`;
  } else {
    wave.style.display = "none";
  }
}
renderWave();

// ---- Music list ----
const basePath = "./music/albums/maybe-maybe/";
const coverArt = "https://raw.githubusercontent.com/bguhm/bguhm.github.io/main/library/images/albums/maybe-maybe/maybe-maybe-cover-art.png";

const music_list = [
  { name: "Slackrr.", file: "slackrr.mp3" },
  { name: "Caramel eyes.", file: "caramel-eyes.mp3" },
  { name: "PUNK HAZARD", file: "punk-hazard.mp3" },
  { name: "HOUND.", file: "hound.mp3" },
  { name: "Arizona Girl", file: "arizona-girl.mp3" },
  { name: "MARIGOLD.", file: "marigold.mp3" },
  { name: "Besto Friendo", file: "besto-friendo.mp3" },
  { name: "HippoCript.", file: "hippocript.mp3" },
  { name: "AloneAgain.", file: "alone-again.mp3" },
  { name: "RoofTop.", file: "rooftop.mp3" },
  { name: "November.", file: "november.mp3" },
  { name: "Street.", file: "street.mp3" },
  { name: "Self Concious.", file: "selfconcious.mp3" },
  { name: "Scribble.", file: "scribble.mp3" },
  { name: "Feelings In A Bottle.", file: "fiab.mp3" },
  { name: "SoloCup.", file: "solocup.mp3" },
  { name: "Bg.uhm", file: "bguhm.mp3" },
  { name: "6:27", file: "627.mp3" },
  { name: "Daisy.", file: "daisy.mp3" },
  { name: "Maybe (Maybe).", file: "maybemaybe.mp3" }
].map(track => ({
  img: coverArt,
  name: track.name,
  artist: "Rhap5ody.",
  music: basePath + track.file
}));

// ---- Player functions ----
loadTrack(track_index);
document.body.style.background = "#222";

function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[index].music;
  curr_track.load();

  track_art.style.backgroundImage = `url(${music_list[index].img})`;
  track_name.textContent = music_list[index].name;
  track_artist.textContent = music_list[index].artist;
  now_playing.textContent = `Playing music ${index + 1} of ${music_list.length}`;

  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener('ended', nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  audioCtx.resume(); // needed for autoplay policies
  isPlaying = true;
  track_art.classList.add('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && !isRandom) {
    track_index++;
  } else if (track_index < music_list.length - 1 && isRandom) {
    track_index = Math.floor(Math.random() * music_list.length);
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  track_index = track_index > 0 ? track_index - 1 : music_list.length - 1;
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  if (!isNaN(curr_track.duration)) {
    let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime % 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration % 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

    curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}
