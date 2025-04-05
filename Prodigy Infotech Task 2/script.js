let timer;
let running = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateTime() {
  const now = Date.now() - startTime + elapsedTime;
  const minutes = String(Math.floor((now / 60000) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((now / 1000) % 60)).padStart(2, '0');
  const milliseconds = String(Math.floor((now % 1000) / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now();
    timer = setInterval(updateTime, 10);
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
  }
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  elapsedTime = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    laps.appendChild(lapItem);
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
