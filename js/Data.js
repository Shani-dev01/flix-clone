let posterImg = '';
var player;
var videoIdKey;
var playerReady = false;
console.log(videoIdKey)
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-container', {
        'height': '100%',
        'width': '100vw',
        videoId: '',
        playerVars: {
            autoplay: 1,
            mute: 0,
            rel: 0,
            controls: 0,
            modestbranding: 1,
            playsinline: 1,
            wmode: 'transparent',
             fs: 1 
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}
function onPlayerReady(event) {
    playerReady = true;
    if (videoIdKey) {
        player.loadVideoById(videoIdKey);
    }
    event.target.playVideo(); // autoplay
    event.target.mute()
    hidePosterBackground();   // video play hone se bg remove
}

$(document).on("click", ".volumBtn", function () {
    if (player && player.isMuted()) {
        player.unMute();
        $(this).text("Mute"); // Button text change
    } else {
        player.mute();
        $(this).text("Unmute");
    }
});


// Document ready ke bahar function
function hidePosterBackground() {
    if ($('.parent-hero-div').length) {
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
    if(event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED){
        showPosterBackground(posterImg); // bg wapas
    }
}

$(document).ready(async function () {

    // Api call logic starts
    const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
    const url = 'https://api.themoviedb.org/3';
    const img_base_url = 'https://image.tmdb.org/t/p/original';


    // --- logic for fetch data and render to the card ---
    $card = $('.movies')
    const cardRes = await fetch(`${url}/trending/movie/day?api_key=${api_key}`);
    const cardData = await cardRes.json();
    const pages = cardData.results;
    pages.slice(0, 9).forEach((Element, i) => {
        const img = `${img_base_url}${Element.poster_path}`;
        const cardHtml = `
                <div class="movies-cards" data-id=${Element.id}>
                    <img class="movies-thumb" src="${img}" alt="">
                    <span>${i + 1}</span>
                </div>`;
        $card.append(cardHtml);
    });

    // Click listener outside the loop
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

    //  --- logic for movies poster homepage  --- 
    const posterRes = await fetch(`${url}/trending/all/day?api_key=${api_key}`);
    const posterData = await posterRes.json();
    const page = posterData.results;
    const movie = page[1];
    const movieId = movie.id;
    console.log(page,);
    


    //  --- logic for fetch moives for poster ---

    const res = await fetch(`${url}/movie/${movieId}/videos?api_key=${api_key}`)
    const data = await res.json()
    console.log(data.results)
    const urlKey = data.results[0].key;
    videoIdKey = urlKey;
    if (data.results && data.results.length > 0) {
        videoIdKey
        // Sirf tab load karo jab player ready ho
        if (playerReady) {
            player.loadVideoById(videoIdKey);
        } 

        posterImg = `${img_base_url}${movie.backdrop_path}`;
            $('.parent-hero-div').css({
                    'background-image': `url('${posterImg}')`,
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'position': 'relative',
                    'z-index': '1',
                }); 
        const parentDiv = $('.parent-hero-div')
        const bannerPoster = `
                <div class="child-hero-div" >
                <div class="title-div">
                    <h2>${movie.original_title}</h2>
                    <span>${movie.overview}</span>
                    <div class="btnDivs">
                    <button class="home-page-play-button" >
                    <li class="fa-solid fa-play"></li>Play
                    </button>
                    <button class="volumBtn" >unmute</button>
                    </div>
                </div>    
            </div>`
        parentDiv.append(bannerPoster);

    }
    const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`;
});