// Api call logic starts
    const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
    const url = 'https://api.themoviedb.org/3';
    const img_base_url = 'https://image.tmdb.org/t/p/original';
    const proxy = "https://api.allorigins.win/raw?url=";
    $(document).ready( async function(){

    

const genreCodes = async(genreName, genreId) => { 

// logic for get all movies genre code
    let errArr = []
    const genreCode = `${url}/genre/movie/list?api_key=${api_key}`
    const genreKey = await fetch(proxy + encodeURIComponent(genreCode));
    const genreData = await genreKey.json();
    const genres = genreData.genres || []
    const catogaries = $('.slider-div');
    const slicedMovies = genres.slice(0, 8);
    for (let genre of slicedMovies) {
        const genreName = genre.name
        const genreId = genre.id
        const html = `<h2 class="movies-title" >${genreName}</h2>
        <div class="slider-cards-buttons">
            <button class="buttons left">
                <li class="fas fa-chevron-left" ></li>
            </button>
            <div class="movie-images">
                <div class="movies-img">
                </div>
            </div>
            <button class="buttons right">
                <li class="fas fa-chevron-right" ></li>
            </button>
        </div>
        </div>
        `
        catogaries.append(html);
        moviesPoster(genreId, genreName);
        }
 }
 genreCodes();

 const moviesPoster = async(genreId, genreName) => { 
        
        const pageNum = Math.floor(Math.random() * 5) + 1
        const allMovies = `${url}/discover/movie?api_key=${api_key}&with_genres=${genreId}&page=${pageNum}`
        const moviesCategory = await fetch(proxy + encodeURIComponent(allMovies));
        const allMoviesData = await moviesCategory.json() || [];
        $('.movies-card img').on('mouseenter', function () {
            $(this).siblings('.iframeContainer').css({
                'display': 'block',
                'position': 'relative',
                'z-index': '10'
            });
        });

        $('.movies-card img').on('mouseleave', function () {
            $(this).siblings('.iframeContainer').css('display', 'none');
        });

        
        allMoviesData.results.slice(0, 10).forEach((movie) => {
        const posterImages = `${img_base_url}${movie.backdrop_path}`;
        const htmlData = `
            <div class="movies-card" > 
            <h3 class="movies-name">${movie.title}</h3> 
                <img src=${posterImages} class="lazy-load"  alt="">
                    <iframe class="iframeContainer" src=  frameborder="0"></iframe>
                    <div class="title-bar" >
                        <div class="title-bar-icons" >
                            <button class="button-play" >
                                <i class="fa-solid fa-play" ></i>
                            </button>
                            <button class="button-play second" >
                               <i class="fa-solid fa-plus" ></i>
                            </button>
                            <button class="button-play second">
                            <i class="far fa-thumbs-up"></i>
                            </button>
                        </div>
                        <div class="movies-detail">
                            <ul>
                            <li>${genreName} - video</li>
                            </ul>
                        </div>
                    </div>
         </div>`
         $('.movies-img').append(htmlData);
        });
     }
    });