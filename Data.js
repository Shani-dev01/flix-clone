// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/w500';


// logic for fetch data and render to the card
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
        $('.movies').on('click', '.movies-cards', function() {
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
       

});
// logic for fetch data and render to the card