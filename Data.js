// Api call logic starts
const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
const url = 'https://api.themoviedb.org/3';
const img_base_url = 'https://image.tmdb.org/t/p/w500';


// logic for fetch data and render to the card
$(document).ready(function () {
    const $card = $('.movies')
    const renderMoviesCaed = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
            const data = await res.json()
            const pages = data.results
            // console.log(pages);
            $(pages).each((i, Element) => {
                const img = `${img_base_url}${Element.poster_path}`;
                if (i < 9) {
                    const cardHtml = `
                <div class="movies-cards" data-id=${Element.id}>
                 <img class="movies-thumb"  src="${img}" alt="">
                   <span>
                    ${i + 1}
                   </span>
                </div>`;
                    $card.append(cardHtml);

                    // logic for movies cards click render
                    $('.movies').on('click', '.movies-cards', function () {
                        // logic for cards img render to movies-poster


                        // logic for render card img on poster img using data-id
                        const $movieId = $(this).data('id')
                        const movies = pages.find(m => m.id === $movieId)
                        const img2 = `${img_base_url}${movies.backdrop_path}`
                        $('.poster-movie-title').html(movies.original_title)
                        $('.poster-discription').html(movies.overview)
                        // logic for render card img on poster img using data-id


                        // logic for cards img render to movies-poster
                        const imgSrc = $(this).find('img').attr('src')
                        const img = $('.thumb').attr('src', img2)
                        // logic for cards img render to movies-poster

                        // logic for movies-poster toggle
                        $('.movie-posters').css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }).hide().fadeIn(200)
                        // logic for movies-poster toggle

                        // logic for stop scroll on movies-cards click
                        if ($(this).find('.movies-posters')) {
                            $('body').css('overflow', 'hidden');
                        }
                        // logic for stop scroll on movies-cards click
                    })

                    // logic for start scroll on movies-cards click
                    $('.icon').click(function () {
                        $('.movie-posters').fadeOut(250)
                        $('body').css('overflow-y', 'scroll');
                    })
                    // logic for start scroll on movies-cards click

                    // ??logic for hide box without clicking x icon
                    $(document).on('click', function (e) {
                        if (!$(e.target).closest('.movies-cards').length) {
                            $('.movie-posters').fadeOut(250)
                            $('body').css('overflow-y', 'scroll');
                        }
                    })
                     // ??logic for hide box without clicking x icon


                }
                // logic for movies cards click render
            })
        } catch (error) {
            console.error('Error :', error);
        }
    }

    renderMoviesCaed()
})
// logic for fetch data and render to the card