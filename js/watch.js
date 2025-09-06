let link = JSON.parse(localStorage.getItem("link"));
const urlKey = link.video_id;

let player;
let intervalId;

// Cache DOM elements (performance ke liye)
const $seconds = $(".seconds");
const $minutes = $(".minutes");
const $seekbar = $("#seekbar");
const $playBtn = $("#play i");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player-container", {
    height: "100%",
    width: "100%",
    videoId: urlKey,
    playerVars: {
      autoplay: 0,
      controls: 0,
      mute: 0,
      rel: 0,
      modestbranding: 1,
      fs: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// ✅ Helper: format time
function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

// ✅ Timer logic
function startTimer() {
  if (intervalId) return; // already running

  intervalId = setInterval(() => {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    const secondsValue = Math.floor(currentTime % 60);
    const minutesValue = Math.floor(currentTime / 60);
    const progress = (currentTime / duration) * 100;

    // update DOM
    $seconds.text(formatTime(secondsValue));
    $minutes.text(formatTime(minutesValue));
    $seekbar.val(progress);
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

// ✅ Events
function onPlayerReady(event) {
  // autoplay/mute if needed
}

function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    startTimer();
  } else {
    stopTimer();
  }
}

$(document).ready(function () {
  // Go back
  $("#leftBtn").on("click", () => history.go(-1));

  // Play/Pause toggle
  $("#play").on("click", function () {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      $playBtn.removeClass("fa-pause").addClass("fa-play");
    } else {
      player.playVideo();
      $playBtn.removeClass("fa-play").addClass("fa-pause");
    }
  });

  // Seekbar
  $seekbar.on("input", function () {
    const seekPercent = $(this).val();
    const duration = player.getDuration();
    const seekTime = (seekPercent / 100) * duration;
    player.seekTo(seekTime, true);
  });
});
