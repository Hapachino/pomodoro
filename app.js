// let pomodoroSeconds = 25 * 60;
// let shortBreakSeconds = 5 * 60;
// let longBreakSeconds = 15 * 60;

// function displayTime(inputSeconds) {
//   const timeLeft = getTimeFormat(inputSeconds);
//   $('.display').text(timeLeft)
// }

// function getTimeFormat(inputSeconds) {
//   const minutes = Math.floor(inputSeconds / 60);
//   const seconds = Math.floor(inputSeconds % 60);

//   timeLeft = [minutes, seconds].map(time => ('0' + time).slice(-2)).join(':');
//   return timeLeft;
// }

// function setTimer(minutes) {
//   clearInterval(timerId);

//   pomodoro = minutes * 60;
// }

// let timerId;

// $('#play').click(function() {
//   clearInterval(timerId);
  
//   timerId = setInterval(function() {
//     displayTime(--pomodoroSeconds);
//   }, 1000);
// });

// $('#pause').click(function() {
//   clearInterval(timerId);
// });

// $('.restart').click(function() {
//   setTimer(25);
//   displayTime(pomodoroSeconds);
// });

// $('#short-break').click(function() {
//   setTimer(5);
//   displayTime(shortBreakSeconds);
// })

// $('#long-break').click(function() {
//   setTimer(15);
//   displayTime(longBreakSeconds);
// })

// $('#settings').click(function() {
//   $('#modal-settings').show();
// })

// $('#save').click(function() {
//   $('#modal-settings').hide();
// })

// $('#cancel').click(function () {
//   $('#modal-settings').hide();
// })


// click on top buttons, set minutes with setTimer for above accordingly

// global: timerId
let timerId;

// global: HTML elements
const display = $('.display')
const modes = Array.from($('.mode'));
const pomodoro = $('#pomodoro');
const play = $('#play');
const pause = $('#pause');
const restart = $('.restart');

// setTimer
function setTimer(element, newMinutes) {
  clearInterval(timerId);
  element.attr('data-initial-time', newMinutes * 60); 
  element.attr('data-time', newMinutes * 60);
}

// getTimeFormat() - converts to MM:SS string
function getTimeFormat(activeMode) {
  const totalSeconds = activeMode.attr('data-time');
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

function countDown(activeMode) {
  timerId = setInterval(function() {
    let currentTime = activeMode.attr('data-time');
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

play.click(function() {
  stopCountDown();
  const activeTimer = getActiveTimer();
  countDown(activeTimer);
});

pause.click(stopCountDown);

restart.click(function() {
  stopCountDown();
  const activeTimer = getActiveTimer();
  const initialMinutes = activeTimer.attr('data-initial-time') / 60;
  setTimer(activeTimer, initialMinutes);
  const formattedTime = getTimeFormat(activeTimer);
  displayTime(formattedTime);
})

const activeTimer =  getActiveTimer();
setTimer(activeTimer, 0.05);
const formattedTime = getTimeFormat(activeTimer);
displayTime(formattedTime);





// $('#play').click(function() {
//   clearInterval(timerId);

//   timerId = setInterval(function() {
//     displayTime(--pomodoroSeconds);
//   }, 1000);
// });
