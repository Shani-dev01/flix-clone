// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/original';
const proxy = "https://api.allorigins.win/raw?url=";
$(document).ready(async function () {

    const genreCodes = async () => {
        // logic for get all movies genre code
        let errArr = []
        const genreCode = `${url}/genre/movie/list?api_key=${api_key}`
        const genreKey = await fetch(proxy + encodeURIComponent(genreCode));
        const genreData = await genreKey.json();
        const genres = genreData.genres || []

        const slicedMovies = genres.slice(0, 2);
        slicedMovies.forEach((genre, index) => {
            const genreName = genre.name
            const genreId = genre.id
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
        })
    }
    genreCodes();


    const moviesPoster = async (genreId, genreName, containerIndex) => {
        var moviesId = null;
        let keys = null;

        const allMovies = `${url}/discover/movie?api_key=${api_key}&with_genres=${genreId}`
        const moviesCategory = await fetch(proxy + encodeURIComponent(allMovies));
        const allMoviesData = await moviesCategory.json() || [];


        $(`#movie-images${containerIndex}`).empty();
        const fetchMovies = async () => {
            const moviePromises = allMoviesData.results.slice(0, 10).map(async (movie) => {
                const videoIds = `${url}/movie/${movie.id}/videos?api_key=${api_key}`
                const videos = await fetch(proxy + encodeURIComponent(videoIds));
                const vidId = await videos.json() || [];
                const videoKey = vidId.results[0].key;
                return { movie, videoKey }
            });

            const moviesWithVideos = await Promise.all(moviePromises);
            moviesWithVideos.forEach(({ movie, videoKey }) => {
                const embedUrl = `https://www.youtube.com/embed/${videoKey}?controls=0&showinfo=0&rel=0&enablejsapi=1&autoplay=1&mute=1`;
                const poster_img = `${img_base_url}${movie.backdrop_path}`;

                const htmlRender = `<div class="movies-card">
            <h3 class="movies-name">${movie.title}</h3>
            <img src="${poster_img}" alt="${movie.title}" class="lazy-load" loading="lazy" >
            <iframe class="iframeContainer" src=${embedUrl} frameborder="0"></iframe>
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
        fetchMovies()
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
        var movieId = $(this).data('movieid');
        var player = players[movieId];
        if (player) {
            player.seekTo(0);
            player.playVideo();
        }
        const iframeContainer = $(this).find('.iframeContainer');
        if (!iframeContainer.has('iframe').length) {
            const videoKey = iframeContainer.data('video');
            const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0`;
            iframeContainer.html(`<iframe src="${embedUrl}" frameborder="0"></iframe>`);
        }


    });



    // Logic for pause videos on card leave
    $(document).on('mouseleave', '.movies-card', function (e) {
        $(this).closest('.slider-div').find('.btn-div').css({ 'display': 'none' });
        $(this).removeClass('hover-active');
        $(this).closest('.slider-div').find('.iframeContainer').css({ 'display': 'block' });
        $(this).removeClass('hover-active');
        var movieId = $(this).data('movieid');
        var player = players[movieId];
        if (player) {
            player.pauseVideo();
        }

    });

    $(document).on('mouseenter', '.buttons', function (e) {
        e.stopPropagation();
        alert('clicked');
    });




});