let link = JSON.parse(localStorage.getItem('link'));
const urlKey = link.video_id; // video id
const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`; // sirf reference ke liye (agar link banana ho)

// IFrame API me use karna ho to sirf videoId pass karo:
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player-container", {
    height: "100%",
    width: "100%",
    videoId: urlKey, // your videoId
    playerVars: {
      autoplay: 0,
      controls: 0,
      mute: 0,
      rel: 0,
      modestbranding: 1,
      fs: 0
    },
      events: {
      onReady: onPlayerReady
    }
  });
}
function onPlayerReady(event) {
  // example: automatically mute and play
//   event.target.mute();
}


$(document).ready(function () {
    // logic for go back to home page
    $('#leftBtn').on('click', function () {
        history.go(-1)
    });

    // logic for play video on click
    $('#play').on('click', function () {
          if (player && player.getPlayerState() === 1) {
        // If playing → pause
        player.pauseVideo();
        $('#play').find('i')
            .removeClass('fa-pause')
            .addClass('fa-play');
    } else {
        // If not playing → play
        player.playVideo();
        $('#play').find('i')
            .removeClass('fa-play')
            .addClass('fa-pause');
    }

    });


})