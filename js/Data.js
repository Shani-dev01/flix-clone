// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/original';
const movieNmae = 'War'

// --- logic for fetch data and render to the card ---
$(document).ready(function () {
    $('.header-container').load('/header.html', function () {
        $('.headSignBtn button').click(function () {
            $(this).window.location.href = 'login.html';
        })
    });

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



    // --- logic for fetch data and render to home page ---
    const moviesData = async () => {
        let res = await fetch(`${url}/genre/movie/list?api_key=${api_key}`)
        let data = await res.json()
        console.log(data);
        // await SearchMovies()
        homePagePoster();
    }


    //  --- logic for search moives --- 
    // const SearchMovies = async() => {
    //     let res = await fetch(`${url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(movieNmae)}`);
    //     let data = await res.json();
    //     console.log(data);
    //  }
    //  --- logic for search moives --- 

    //  --- logic for movies poster homepage  --- 
    const homePagePoster = async () => {
        const res = await fetch(`${url}/trending/all/day?api_key=${api_key}`);
        const data = await res.json();
        const page = data;
        console.log(data.results);
        const poster = $('.parent-hero-div')
        $(page).each(function (i, Element) {
            const posterImg = `${img_base_url}${Element.results[5].backdrop_path}`
            $('.parent-hero-div').css({
                'background-image': `url("${posterImg}")`,
                'background-size': 'cover',
                'background-position': 'center'
            })
            const htmlData = `
            <div class="child-hero-div" >
            </div>
            `;
            //  <img src=${posterImg} alt="">
            poster.append(htmlData);
            console.log(img_base_url, Element.results[0].poster_path);

        })
    }

    moviesData()
});