let totalSeconds = 25 * 60;

function displayTime() {
  const timeLeft = minAndSec(totalSeconds);
  $('.display').text(timeLeft);
}

function minAndSec(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  timeLeft = [minutes, seconds].map(time => ('0' + time).slice(-2)).join(':');
  return timeLeft;
}

function setTimer(minutes) {
  clearInterval(timerId);

  totalSeconds = minutes * 60;
}

let timerId;

$('#play').click(function() {
  clearInterval(timerId);
  
  timerId = setInterval(function() {
    --totalSeconds;
    displayTime();
  }, 1000);
});

$('#pause').click(function() {
  clearInterval(timerId);
});

$('.restart').click(function() {
  setTimer(25);
  displayTime();
});

$('#short-break').click(function() {
  setTimer(5);
  displayTime();
})

$('#long-break').click(function() {
  setTimer(15);
  displayTime();
})



