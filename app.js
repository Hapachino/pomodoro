let timerId;

// global: HTML elements
const display = $('.display')
const modes = Array.from($('.mode'));
const pomodoro = $('#pomodoro');
const shortBreak = $('#short-break');
const longBreak = $('#long-break');
const play = $('#play');
const pause = $('#pause');
const restart = $('.restart');

const settings = $('#settings');
const modal = $('.modal');
const save = $('#save');
const cancel = $('#cancel');
const pomodoroValue = $('#pomodoroValue');
const shortBreakValue = $('#shortBreakValue');
const longBreakValue = $('#longBreakValue');

// modal setup
settings.click(() => {
  // get current values and populate input fields
  pomodoroValue.val(getInitialTime(pomodoro) / 60);
  shortBreakValue.val(getInitialTime(shortBreak) / 60);
  longBreakValue.val(getInitialTime(longBreak) / 60);
  
  modal.show()
});

save.click(() => {
  // get values from input
  // if input empty, don't change, else save new values
  if (pomodoroValue.val()) pomodoro.attr('data-initial-time', pomodoroValue.val() * 60);
  if (shortBreakValue.val()) shortBreak.attr('data-initial-time', shortBreakValue.val() * 60);
  if (longBreakValue.val()) longBreak.attr('data-initial-time', longBreakValue.val() * 60);
 
  modal.hide();
});

cancel.click(() => modal.hide());

// getInitialTime
function getInitialTime(element) {
  return element.attr('data-initial-time');
}

function getCurrentTime(element) {
  return element.attr('data-time');
}

// setTimer
function setTimer(element, newMinutes) {
  clearInterval(timerId);
  element.attr('data-initial-time', newMinutes * 60); 
  element.attr('data-time', newMinutes * 60);
}

// getTimeFormat() - converts to MM:SS string
function getTimeFormat(activeMode) {
  const totalSeconds = getCurrentTime(activeMode); 
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return [minutes, seconds].map(time => ('0' + time).slice(-2)).join(':');
}

// display() - outputs time to display
function displayTime(formattedTime) {
  display.text(formattedTime);
}

// return active timer 
function getActiveTimer() {
  let activeMode;

  modes.forEach(mode => {
    const classes = Array.from(mode.classList);
    if (classes.includes('active')) activeMode = $(mode);
  }) 

  return activeMode;
}

function setActiveTimer(mode) {
  modes.forEach(mode => {
    const classes = Array.from(mode.classList);
    if (classes.includes('active')) $(mode).removeClass();
  }) 

  mode.addClass('active');
}

// Continuously countdown
function countDown(activeMode) {
  timerId = setInterval(function() {
    let currentTime = getCurrentTime(activeMode); 
    activeMode.attr('data-time', --currentTime);
    const formattedTime = getTimeFormat(activeMode);
    displayTime(formattedTime);
    if (currentTime <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function stopCountDown() {
  clearInterval(timerId);
}

// resets active timer's time, stop countdown, and refreshes display
function resetTimer() {
  // reset to initial minutes
  const initialMinutes = $(this).attr('data-initial-time') / 60;
  // set this to active timer
  setActiveTimer($(this));
  const activeTimer = getActiveTimer();
  setTimer(activeTimer, initialMinutes);
  // stop current countdown
  stopCountDown();
  // display time
  const formattedTime = getTimeFormat(activeTimer);
  displayTime(formattedTime);
}

play.click(function() {
  stopCountDown();
  const activeTimer = getActiveTimer();
  countDown(activeTimer);
});

pause.click(stopCountDown);

restart.click(function() {
  stopCountDown();
  const activeTimer = getActiveTimer();
  const initialMinutes = getInitialTime(activeTimer) / 60;
  setTimer(activeTimer, initialMinutes);
  const formattedTime = getTimeFormat(activeTimer);
  displayTime(formattedTime);
})

// resets time, stop countdown, and updates display
pomodoro.click(resetTimer);
shortBreak.click(resetTimer);
longBreak.click(resetTimer);

// init display to 25 minutes
const activeTimer =  getActiveTimer();
setTimer(activeTimer, 25);
const formattedTime = getTimeFormat(activeTimer);
displayTime(formattedTime);
