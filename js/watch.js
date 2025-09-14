let link = JSON.parse(localStorage.getItem("link"));
const urlKey = link.video_id || link;

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
      autoplay: 1,
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
  event.target.playVideo();
  const $btn = $('#play-pause-btn');
  const $icon = $btn.find("i");
  $icon.removeClass("fa-play").addClass("fa-pause");
  $playBtn.removeClass("fa-play").addClass("fa-pause");
  $btn.fadeToggle(300).hide(250);

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
  $("#leftBtn").on("click", function () {
    localStorage.removeItem(link);
    history.go(-1);
  });


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

  // logic for play pause on click player-div
  $('.play-pause-button').on('click', function () {
    if (!player) return;

    const $btn = $('#play-pause-btn');
    const $icon = $btn.find("i");

    // Icon switch karo
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      $icon.removeClass("fa-pause").addClass("fa-play");
      $playBtn.removeClass("fa-pause").addClass("fa-play");
      $btn.fadeToggle(300).hide(250)
    } else {
      player.playVideo();
      $icon.removeClass("fa-play").addClass("fa-pause");
      $playBtn.removeClass("fa-play").addClass("fa-pause");
      $btn.fadeToggle(300).hide(250);
    }

  });



  // Seekbar time increase
  $seekbar.on("input", function () {
    const seekPercent = $(this).val();
    const duration = player.getDuration();
    const seekTime = (seekPercent / 100) * duration;
    player.seekTo(seekTime, true);
  });



  // Seek 10s forwords & backward
  $('#seek-backward').on('click', function () {
    const duration = player.getCurrentTime();
    const currentTime = Math.max(duration - 10, 0);
    player.seekTo(currentTime, true);
  });

  $('#seek-forward').on('click', function () {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const newTime = Math.floor(currentTime + 10, duration);
    player.seekTo(newTime, true);
  });

  // logic for hide controls and icons 
  let hideControlsTimeout;

  $('.player-div').on('mousemove', function () {
    // Saare controls show karo
    $('.icons').fadeIn(300);
    $('#leftBtn').fadeIn(300);

    // Agar pehle se koi timeout set hai to clear karo
    clearTimeout(hideControlsTimeout);

    // Naya timeout set karo jo 3s baad controls hide karega
    hideControlsTimeout = setTimeout(() => {
      $('.icons').fadeOut(300);
      $('#leftBtn').fadeOut(300);
    }, 2500);
  });


});
