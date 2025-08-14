// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/w500';


// logic for fetch data and render to the card
$(document).ready(function () {
    $('.header-container').load('/header.html', function () {
        $('.headSignBtn button').click(function () {
            $(this).window.location.hre = 'login.html';
        })
    });

    const $card = $('.movies')
    // const renderMoviesCaed = async () => {
    //     try {
    //         const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
    //         const data = await res.json()
    //         const pages = data.results
    //         // console.log(pages);
    //         $(pages).each((i, Element) => {
    //             const img = `${img_base_url}${Element.poster_path}`;
    //             if (i < 9) {
    //                 const cardHtml = `
    //             <div class="movies-cards" data-id=${Element.id}>
    //              <img class="movies-thumb"  src="${poster}" alt="">
    //                <span>
    //                 ${i + 1}
    //                </span>
    //             </div>`;
    //                 $card.append(cardHtml);




    //             }
    //             // logic for movies cards click render
    //         })
    //     } catch (error) {
    //         console.error('Error :', error);
    //     }
    // }

    // renderMoviesCaed()


//     const imdbId = [
//          'tt0816692',
//          'tt1375666',
//          'tt0133093',
//          'tt0468569',
//          'tt0109830',
//          'tt0111161',
//          'tt0172495',
//          'tt0110912',
//          'tt0137523',
//     ]
//     const settings = {
// 	async: true,
// 	crossDomain: true,
// 	url: 'https://movie-database-api1.p.rapidapi.com/list_movies.json?limit=20&page=1&quality=all&genre=all&minimum_rating=0&query_term=0&sort_by=date_added&order_by=desc&with_rt_ratings=false',
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'cd5d3f47dbmshae70fcafd169ef2p11bccbjsn432571426880',
// 		'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
// 	}
// };
$.ajax({
    url: 'https://apilist.fun/api/netflix-roulette/random/movie',
    method: 'GET', // GET method is required
    success: function(data) {
        const res = data.json()
        console.log(res);
    }
});
    // $.ajax(settings).done(function (data) {
    //     console.log(data);

    //     // const title = data.primaryTitle;
    //     // const description = data.description;
    //     // const poster = data.primaryImage;

    //     // console.log(poster);
    //     const cardHtml = `
    //             <div class="movies-cards" data-id=${Element.id}>
    //              <img class="movies-thumb"  src="${poster}" alt="">
    //                <span>
    //                 ${1}
    //                </span>
    //             </div>`;
    //     $card.append(cardHtml);

    //     // logic for movies cards click render
    //     $('.movies').on('click', '.movies-cards', function () {
    //         // logic for cards img render to movies-poster


    //         // logic for render card img on poster img using data-id
    //         const $movieId = $(this).data('id')
    //         console.log($movieId)
    //         const movies = pages.find(m => m.id === $movieId)
    //         const img2 = `${img_base_url}${movies.backdrop_path}`
    //         $('.poster-movie-title').html(movies.original_title)
    //         $('.poster-discription').html(movies.overview)
    //         // logic for render card img on poster img using data-id


    //         // logic for cards img render to movies-poster
    //         const imgSrc = $(this).find('img').attr('src')
    //         const img = $('.thumb').attr('src', img2)
    //         // logic for cards img render to movies-poster

    //         // logic for movies-poster toggle
    //         $('.movie-posters').css({
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //         }).hide().fadeIn(200)
    //         // logic for movies-poster toggle

    //         // logic for stop scroll on movies-cards click
    //         if ($(this).find('.movies-posters')) {
    //             $('body').css('overflow', 'hidden');
    //         }
    //         // logic for stop scroll on movies-cards click
    //     })

    //     // logic for start scroll on movies-cards click
    //     $('.icon').click(function () {
    //         $('.movie-posters').fadeOut(250)
    //         $('body').css('overflow-y', 'scroll');
    //     })
    //     // logic for start scroll on movies-cards click

    //     // ??logic for hide box without clicking x icon
    //     $(document).on('click', function (e) {
    //         if (!$(e.target).closest('.movies-cards').length) {
    //             $('.movie-posters').fadeOut(250)
    //             $('body').css('overflow-y', 'scroll');
    //         }
    //     })
    //     // ??logic for hide box without clicking x icon

    // });
})
// logic for fetch data and render to the card