var posterImg = '';
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
    let videoData = event.target.getVideoData();
    localStorage.setItem('link', JSON.stringify(videoData));

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
    
    const proxy = [
        "https://api.allorigins.win/raw?url=",
        "https://thingproxy.freeboard.io/fetch/",
        "https://api.codetabs.com/v1/proxy/?quest="
    ];


    // logic for home page data render
    const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
    const url = 'https://api.themoviedb.org/3';
    const img_base_url = 'https://image.tmdb.org/t/p/original';
    

    // logic for homepage movies render
    const homePage = async (proxy) => {

        let heroMovie = null;   // global variable for movie info

        async function fetchMovieWithVideo(movieIndex, proxy) {
            try {
                const posterUrl = `${url}/trending/all/day?api_key=${api_key}`;
                const posterRes = await fetch(proxy[0] + encodeURIComponent(posterUrl));
                const posterData = await posterRes.json();
                const movies = posterData.results[movieIndex];
                // if (!movies) return;

                const videoUrl = `${url}/movie/${movies.id}/videos?api_key=${api_key}`;
                const movieKeyRes = await fetch(proxy[0] + encodeURIComponent(videoUrl));
                const data = await movieKeyRes.json();
                const videoKey = data.results?.[0]?.key || null;


                // 🔹 Assign to global variables
                heroMovie = movies;
                videoIdKey = videoKey;

            } catch (err) {
                console.error("Error fetching movie + video:", err);
            }
        }

        await fetchMovieWithVideo(10,proxy);
        if (heroMovie) {
            // ✅ safe check for video key

            const urlKey = videoIdKey;

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
            const displayName = heroMovie?.name || heroMovie?.title || "Unknown Title";
            const bannerPoster = `
        <div class="child-hero-div" >
            <div class="title-div">
                <h2>${displayName}</h2>
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
            $('.home-page-play-button').on('click', function () {
                window.location.href = '../html/watch.html';
            })

            // Agar player ready hai aur key mil gayi hai, video load karo
            if (playerReady && videoIdKey) {
                setTimeout(() => {
                    player.loadVideoById(videoIdKey);
                    hidePosterBackground(); // video play hone pe bg hide
                }, 6000);
            }
            const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`;
        }

    }

    // logic for movies cards render
    const moviesCards = async (proxy) => {


        // ✅ Helper function to fetch with fallback
        async function fetchWithFallback(endpoint, proxy) {
            for (let prox of proxy) {
                try {
                    const res = await fetch(prox + encodeURIComponent(endpoint));
                    if (res.ok) {
                        return res.json();
                    }
                } catch (err) {
                    console.warn("❌ Proxy failed:", prox, err);
                }
            }
            throw new Error("All proxy failed for " + endpoint);
        }

        // ✅ Get all genres
        const genreCodes = async () => {
            const endpoint = `${url}/genre/movie/list?api_key=${api_key}`;
            const genreData = await fetchWithFallback(endpoint, proxy);
            const genres = genreData.genres || [];

            const slicedMovies = genres.slice(0, 5);
            slicedMovies.forEach((genre, index) => {
                const genreName = genre.name;
                const genreId = genre.id;

                let sliderHtml = `
        <div class="slider-div">
          <h2 class="movies-title">${genreName}</h2>
          <div class="btn-div">
            <button class="buttons left"><li class="fas fa-chevron-left"></li></button>
            <button class="buttons right"><li class="fas fa-chevron-right"></li></button>
          </div>
          <div class="slider-cards-buttons">
            <div class="movie-images" id="movie-images${index + 1}"></div>
          </div>
        </div>`;
                $('.home-page-slider-div').append(sliderHtml);

                moviesPoster(genreId, genreName, index + 1);
            });
        }
        genreCodes();

        // ✅ Fetch movies by genre
        const moviesPoster = async (genreId, genreName, containerIndex) => {
            const endpoint = `${url}/discover/movie?api_key=${api_key}&with_genres=${genreId}`;
            const allMoviesData = await fetchWithFallback(endpoint, proxy);

            $(`#movie-images${containerIndex}`).empty();

            const moviePromises = allMoviesData.results.slice(0, 10).map(async (movie) => {
                const videoEndpoint = `${url}/movie/${movie.id}/videos?api_key=${api_key}`;
                const vidId = await fetchWithFallback(videoEndpoint, proxy);
                const videoKey = vidId.results.length ? vidId.results[0].key : null;

                return { movie, videoKey };
            });

            const moviesWithVideos = await Promise.all(moviePromises);

            moviesWithVideos.forEach(({ movie, videoKey }) => {
                const poster_img = `${img_base_url}${movie.backdrop_path}`;
                const htmlRender = `
        <div class="movies-card"  data-movieid="${movie.id}" data-video-key="${videoKey}" >
          <h3 class="movies-name">${movie.title}</h3>
          <img src="${poster_img}" alt="${movie.title}" class="lazy-load" loading="lazy" >
          <iframe class="iframeContainer" data-loaded="false" frameborder="0"></iframe>
          <div class="title-bar">
            <div class="title-bar-icons">
              <button class="button-play"><i class="fa-solid fa-play"></i></button>
              <button class="button-play second"><i class="fa-solid fa-plus"></i></button>
              <button class="button-play second"><i class="far fa-thumbs-up"></i></button>
            </div>
            <div class="movies-detail">
              <ul><li>${genreName} - Trailer</li></ul>
            </div>
          </div>
        </div>`;

                $(`#movie-images${containerIndex}`).append(htmlRender);
            });

        }


        $(document).on('mouseleave', '.movies-card', function (e) {
            e.stopPropagation();
            const card = $(this);
            card.closest('.slider-div').find('.iframeContainer').css({
                'display': 'flex',
                'position': 'absolute',
                'z-index': '-1'
            });
        });


        var players = {}; // global object to store all iframe players

        function onYouTubeIframeAPIReady() {
            $('.iframeContainer').each(function (index, iframe) {
                var movieId = $(iframe).closest('.movies-card').data('movieid');
                players[movieId] = new YT.Player(iframe, {
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            });
        }

        function onPlayerReady(event) {
            // event.target is the player object
        }


        // Logic for play videos on card hover
        $(document).on('mouseenter', '.movies-card', function (e) {
            e.stopPropagation();
            const card = $(this);
            const iframeContainer = card.find('.iframeContainer')

            card.closest('.slider-div').find('.btn-div').css({ 'display': 'flex' });
            if ($(e.target).closest('.buttons').length) {
                card.closest('.slider-div').find('.btn-div').css({ 'display': 'flex' });
                card.removeClass('hover-active');
            }
            card.addClass('hover-active');

            card.find('.iframeContainer').css({
                'display': 'flex',
                'position': 'absolute',
                'z-index': '2',
                'pointer-events': 'none',
                'transition': 'none',
                'width': '265px',
                'height': '60%'
            });

            $('.movies-card').not(card).find('.iframeContainer').css({
                'display': 'flex',
                'position': 'absolute',
                'z-index': '-1',
                'pointer-events': 'none'
            });
            const videoKey = card.data('video-key');

            // Agar iframe already loaded nahi hai
            if (iframeContainer.data('loaded') === false) {
                // Set iframe src only on hover
                const embedUrl = `https://www.youtube.com/embed/${videoKey}?controls=0&rel=0&enablejsapi=1&autoplay=1&mute=1`;
                iframeContainer.attr('src', embedUrl);
                iframeContainer.data('loaded', true);

                // Initialize YT.Player for hover control
                players[videoKey] = new YT.Player(iframeContainer[0], {
                    events: {
                        onReady: (event) => {
                            event.target.playVideo(); // play on hover
                        }
                    }
                });
            } else {
                // Already loaded, just play
                if (players[videoKey]) players[videoKey].playVideo();
            }
        });

        // Logic for pause videos on card leave
        $(document).on('mouseleave', '.movies-card', function (e) {
            $(this).closest('.slider-div').find('.btn-div').css({ 'display': 'none' });
            $(this).removeClass('hover-active');
            $(this).closest('.slider-div').find('.iframeContainer').css({ 'display': 'block' });
            $(this).removeClass('hover-active');
            const card = $(this);
            const videoKey = card.data('video-key');

            if (players[videoKey] && typeof players[videoKey].pauseVideo === "function") {
                console.log('mouse leaved');
                players[videoKey].pauseVideo();
            }

        });

        $(document).on('mouseenter', '.buttons', function (e) {
            e.stopPropagation();
            alert('clicked');
        });
    }
    if (window.location.href.includes('home.html')) {
        homePage(proxy);
        moviesCards(proxy)
    } else if (window.location.href.includes('news-and-popular.html')) {
        console.log('welcom to home page')
    }
})