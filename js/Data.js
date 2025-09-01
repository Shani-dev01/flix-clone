let posterImg = '';
var player;
var videoIdKey;
var playerReady = false;
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
    }
    //  event.target.playVideo(); // autoplay
    event.target.mute()
    hidePosterBackground();   // video play hone se bg remove
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



    // --- logic for fetch data and render to the card ---
    $card = $('.movies')
    const baseUrl = `${url}/trending/movie/day?api_key=${api_key}`;
    const cardRes = await fetch(proxy + encodeURIComponent(baseUrl));
    const cardData = await cardRes.json();
    const pages = cardData.results;
    // console.log(pages)
    pages.slice(0, 9).forEach((Element, i) => {
        const img = `${img_base_url}${Element.poster_path}`;
        const cardHtml = `
                <div class="movies-cards" data-id=${Element.id}>
                    <img class="movies-thumb" src="${img}" alt="" loading="lazy">
                    <span>${i + 1}</span>
                </div>`;
        $card.append(cardHtml);
    });

    // logic for poster home poster images of slider
    $('.movies').on('click', '.movies-cards', function () {
        const $movieId = $(this).data('id');
        const movie = pages.find(m => m.id === $movieId);
        const img2 = `${img_base_url}${movie.backdrop_path}`;
        $('.poster-movie-title').html(movie.original_title);
        $('.poster-discription').html(movie.overview);
        $('.thumb').attr('src', img2);
        $('.movie-posters').fadeIn(200).css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });
        $('body').css('overflow', 'hidden');
    });

    $('.icon').click(function () {
        $('.movie-posters').fadeOut(250);
        $('body').css('overflow-y', 'scroll');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.movies-cards').length) {
            $('.movie-posters').fadeOut(250);
            $('body').css('overflow-y', 'scroll');
        }
    });
    // --- logic for fetch data and render to the card ---

let heroMovie = null;   // global variable for movie info

async function fetchMovieWithVideo(movieIndex = 11) {
    try {
        const posterUrl = `${url}/trending/all/day?api_key=${api_key}`;
        const posterRes = await fetch(proxy + encodeURIComponent(posterUrl));
        const posterData = await posterRes.json();
        const movies = posterData.results[movieIndex];
        if (!movies) return;

        const videoUrl = `${url}/movie/${movies.id}/videos?api_key=${api_key}`;
        const movieKeyRes = await fetch(proxy + encodeURIComponent(videoUrl));
        const data = await movieKeyRes.json();
        const videoKey = data.results?.[0]?.key || null;

        // 🔹 Assign to global variables
        heroMovie = movies;
        videoIdKey = videoKey;

    } catch (err) {
        console.error("Error fetching movie + video:", err);
    }
}
    await fetchMovieWithVideo(9);
    if (heroMovie) {
    // ✅ safe check for video key
    const urlKey = heroMovie.results[0]?.key || null;
    videoIdKey = urlKey;

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

    // Banner HTML
    const parentDiv = $('.parent-hero-div');
    const bannerPoster = `
        <div class="child-hero-div" >
            <div class="title-div">
                <h2>${heroMovie.original_title}</h2>
                <span>${heroMovie.overview}</span>
                <div class="btnDivs">
                    <button class="home-page-play-button" >
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
        player.loadVideoById(videoIdKey);
        hidePosterBackground(); // video play hone pe bg hide
    }
    const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`;
}


    
});