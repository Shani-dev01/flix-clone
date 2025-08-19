// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/original';
const movieNmae = 'War'

// --- logic for fetch data and render to the card ---
$(document).ready(function () {

    $card = $('.movies')
    const renderMoviesCaed = async () => {
        try {
            const res = await fetch(`${url}/trending/movie/day?api_key=${api_key}`);
            const data = await res.json();
            const pages = data.results;
            // console.log(data.results)
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

        } catch (error) {
            console.error('Error:', error);
        }
    }

    renderMoviesCaed()

    // --- logic for fetch data and render to the card ---



    // --- logic for fetch data and render to slider ---
    const moviesData = async () => {
        let res = await fetch(`${url}/genre/movie/list?api_key=${api_key}`)
        let data = await res.json()
        // console.log(data.genres[0])
        // await SearchMovies()
        homePagePoster();
    }
    // --- logic for fetch data and render to slider ---


    //  --- logic for fetch moives for poster --- 
    // const SearchMovies = async() => {
    //     let res = await fetch(`${url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(movieNmae)}`);
    //     let data = await res.json();
    //     console.log(data);
    //  }
    //  --- logic for search moives --- 




    //  --- logic for movies poster homepage  --- 
    const homePagePoster = async () => {

        try {
            const res = await fetch(`${url}/trending/all/day?api_key=${api_key}`);
            const data = await res.json();
            const page = data.results;
            const poster = $('.parent-hero-div');
            let genre_id = page[4].id
            const posterImg = `${img_base_url}${page[4].backdrop_path}`
            $('.parent-hero-div').css({
                'background-image': `url("${posterImg}")`,
                'background-size': 'cover',
                'background-position': 'center'
            });
            const htmlData = `
            <div class="child-hero-div" >
                </div>    
            </div>`;
            poster.append(htmlData);
            videoPlay(genre_id, page);
        } catch (error) {
            console.log('Error', error);
        }
    }
    //  --- logic for fetch moives for poster ---

    const videoPlay = async (genre_id, page) => {
        try {
            const res = await fetch(`${url}/movie/${genre_id}/videos?api_key=${api_key}`)
            const data = await res.json()
            const trailer_key = data.results[0].key
            console.log(trailer_key);
            const youtubeUrl = `https://www.youtube.com/watch?v=${trailer_key}`
            console.log(youtubeUrl);
            const parentDiv = $('.home-page-hero-section')
            const videoPlay = `
                <div class="parent-hero-div" >
                <div class="child-hero-div" >
                <iframe class="videoLink" src="https://www.youtube.com/embed/${trailer_key}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${trailer_key}&mute=1" allowfullscreen></iframe>
                <div class="title-div">
                    <h2>${page[4].original_title}</h2>
                    <span>${page[4].overview}</span>
                    <div class="btnDivs">
                    <button class="home-page-play-button" >
                    <li class="fa-solid fa-play"></li>    Play
                    </button>
                    <button class="volumBtn" >volume</button>
                    </div>
            </div>
        </div>`
            parentDiv.append(videoPlay)
        } catch (error) {
            console.error('Error', error);
        }
    }

    moviesData()
});