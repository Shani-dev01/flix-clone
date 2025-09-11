let posterImg = '';
let player;
let videoIdKey;
let playerReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-container', {
        'height': '100%',
        'width': '100%',
        videoId: '',
        playerVars: {
            autoplay: 1,
            mute: 1,
            rel: 0,
            controls: 0,
            modestbranding: 1,
            playsinline: 1,
            wmode: 'transparent',
            iv_load_policy: 3,
            fs: 0,               // fullscreen button off
            showinfo: 0,         // (deprecated but kuch browsers me work)
            enablejsapi: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    })
}
function onPlayerError(event) {
    console.warn("YouTube Player Error:", event.data);

    // Sirf poster wapas dikhane ke liye
    showPosterBackground(posterImg);

    // Agar player container chhupana ho to
    $('#player-container').hide();

}

function onPlayerReady(event) {
    playerReady = true;
    
    if (videoIdKey) {
        player.loadVideoById(videoIdKey);
        event.target.mute()
        hidePosterBackground(); // video play hote hi poster gayab
    } else {
        showPosterBackground(posterImg); // agar key nahi hai to poster show rahe
    }

}

$(document).on("click", ".volumBtn", function () {
    if (player && player.isMuted()) {
        player.unMute();
        $('#volumeIcon').removeClass('fa-volume-mute');
        $('#volumeIcon').toggleClass('fa-volume-high');
    } else {
        player.mute();
        $('#volumeIcon').removeClass('fa-volume-high');
        $('#volumeIcon').toggleClass('fa-volume-mute');

    }
});


// Document ready ke bahar function
function hidePosterBackground() {
    if ($('.parent-hero-div').length) {
        $('.parent-hero-div').css('background-image', 'none');
    } else if (!videoIdKey) {
        $('.parent-hero-div').css('background-image', 'none');
    }
}

function showPosterBackground(posterImg) {
    if ($('.parent-hero-div').length) {
        $('.parent-hero-div').css({
            'background-image': `url('${posterImg}')`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
        });
    }
}


// YouTube state change me call (pause/end)
function onPlayerStateChange(event) {
    
    let videoData = event.target.getVideoData();
    localStorage.setItem('link', JSON.stringify(videoData));
    console.log(videoData.video_id);  // yahan se video id milega
    
    const $icon = $('#volumeIcon');
    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        showPosterBackground(posterImg); // bg wapas
        $icon.removeClass('fa-volume-mute fa-volume-high').addClass('fa-rotate-right');

    } else {
        const $icon = $('#volumeIcon');
        const $replayButton = $icon.removeClass('fa-rotate-right')
        $($replayButton).on('click', function () {
            event.target.playVideo();
            $('.parent-hero-div').css('background-image', 'none');
        })

    }
}

$(document).ready(async function () {
    // Api call logic starts
    const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
    const url = 'https://api.themoviedb.org/3';
    const img_base_url = 'https://image.tmdb.org/t/p/original';
    const proxy = "https://api.allorigins.win/raw?url=";

    let heroMovie = null;   // global variable for movie info
    async function fetchMovieWithVideo(movieIndex) {
        try {
            const posterUrl = `${url}/trending/tv/day?api_key=${api_key}`;
            const posterRes = await fetch(proxy + encodeURIComponent(posterUrl));
            const posterData = await posterRes.json();
            const movies = posterData.results[movieIndex];


            if (!movies) return;
            const videoUrl = `${url}/tv/${movies.id}/videos?api_key=${api_key}`;
            const movieKeyRes = await fetch(proxy + encodeURIComponent(videoUrl));
            const data = await movieKeyRes.json();
            const videoKey = data.results[0].key || null;

            // 🔹 Assign to global variables
            heroMovie = movies;
            videoIdKey = videoKey;

            // ✅ safe check for video key    
            urlKey = videoIdKey;
            const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`;

        } catch (err) {
            console.error("Error fetching movie + video:", err);
        }
    }
    await fetchMovieWithVideo(11,endpointType);
    if (heroMovie) {
        // Poster fallback turant show
        posterImg = `${img_base_url}${heroMovie.backdrop_path}`;
        $('.parent-hero-div').css({
            'background-image': `url('${posterImg}')`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'position': 'relative',
            'z-index': '1',
        });
        $(document).on('click', '.tv-shows-page-play-button', function () {
            window.location.href = '../html/watch.html';
        });

        // Banner HTML
        const parentDiv = $('.parent-hero-div');
        const bannerPoster = `
        <div class="child-hero-div" >
            <div class="title-div">
                <h2>${heroMovie.name}</h2>
                <span>${heroMovie.overview}</span>
                <div class="btnDivs">
                    <button class="tv-shows-page-play-button" >
                        <li class="fa-solid fa-play"></li>Play
                    </button>
                    <button class="infoBtn">
                        <i class="fa-solid fa-circle-info"></i>
                        Info
                    </button>
                </div>
            </div>    
            <div class="second-div" >
                <button class="volumBtn">
                    <li id="volumeIcon" class="fa-solid fa-volume-mute"></li>
                </button>
            </div>  
        </div>`;
        parentDiv.append(bannerPoster);

        // Agar player ready hai aur key mil gayi hai, video load karo
        if (playerReady && videoIdKey) {
             setTimeout(() => {
        player.loadVideoById(videoIdKey);
        hidePosterBackground(); // video play hone pe bg hide
    }, 3000);
        }
    }

 history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1); // back button ko disable kar dega
    };

    // --- your scroll logic ---
    let lastScroll = 0;
    $(window).on('scroll', function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {
            $('.Navbar').addClass('scroll');
        } else {
            $('.Navbar').removeClass('scroll');
        }
    });
    // --- your scroll logic ---


    // --- sign out ---
    $('.sign-out').on('click', function () {
        alert('sign out');
        localStorage.clear();   // pehle clear karo
        window.location.replace('../html/index.html');
        // phir redirect
    });
    // --- sign out ---
});