$(document).ready(function () {

  const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
  const url = 'https://api.themoviedb.org/3';
  const img_base_url = 'https://image.tmdb.org/t/p/original';
  const proxy = "https://api.allorigins.win/raw?url=";

  // Enter press par search
  $(document).on("keyup", ".search-input input", async function (e) {
    let searchQuery = $(this).val();

    try {

      let movieDivs = 10;
      
      const finalUrl = `${url}/search/movie?api_key=${api_key}&query=${searchQuery}`;
      const response = await fetch(proxy + encodeURIComponent(finalUrl)); // proxy use kiya
      const data = await response.json();
      const slicedMovies = data.results

      const movieVideos = async (movie) => {
        if ( movie.id && movie.id !== null ) {
          const videoEndpoint = `${url}/movie/${movie.id}/videos?api_key=${api_key}`;
          const keyResponse = await fetch(proxy + encodeURIComponent(videoEndpoint)); // proxy use kiya
          const videos = await keyResponse.json();
          return videos.results.length ? videos.results[0].key : null;
        }
      }


      for (let i = 0; i < movieDivs; i++) {
        $('.home-page-hero-section').hide();
        $('.home-page-slider-div').css({
          'padding-top': '150px',
          'background': 'black',
          'padding-bottom': '0px'
        });
        $(`#movie-images${i}`).empty().hide();
        $('.movies-title').hide();
      }

      
      // const moviesPoster = async(movies, containerId) => {
        
      //   $(containerId).empty();

      //   for (let movie of movies) {    
      //     const videoKey = await movieVideos(movie);
      //     console.log(videoKey);
          
      //     let imgPath;
      //     if (movie.backdrop_path !== null || movie.poster_path !== null) {
      //       imgPath = movie.backdrop_path || movie.poster_path;
      //     }
          
      //     const poster_img = `${img_base_url}${imgPath}`;
      //     const name = movie.name || movie.title;
      //     const htmlRender = `
      //        <div class="movies-card" data-movieid="${movie.id}" data-video-key="${videoKey}">
      //        <h3 class="movies-name">${name}</h3>
      //           <img src="${poster_img}" alt="${name}" class="lazy-load" loading="lazy">
      //         <iframe class="iframeContainer" data-loaded="false" frameborder="0"></iframe>
      //        <div class="title-bar">
      //       <div class="title-bar-icons">
      //         <button class="button-play"><i class="fa-solid fa-play"></i></button>
      //         <button class="button-play second"><i class="fa-solid fa-plus"></i></button>
      //         <button class="button-play second"><i class="far fa-thumbs-up"></i></button>
      //       </div>
      //       <div class="movies-detail">
      //         <ul><li> - Trailer</li></ul>
      //       </div>
      //        </div>
      //        </div>`;
      //     $(containerId).append(htmlRender).show();
      //   };
      // }
      const moviesPoster = async (movies, containerId) => {
    $(containerId).empty();
  

  // Sare movies ke video keys ek saath fetch karo
  const videoKeys = await Promise.all(
    movies.map(movie => movieVideos(movie))
  );
  
  movies.forEach((movie, index) => {
    const videoKey = videoKeys[index];
    let imgPath = movie.backdrop_path || movie.poster_path;

    if (!imgPath) return; // agar image hi nahi h to skip

    const poster_img = `${img_base_url}${imgPath}`;
    const name = movie.name || movie.title;

    const htmlRender = `
      <div class="movies-card" data-movieid="${movie.id}" data-video-key="${videoKey}">
        <h3 class="movies-name">${name}</h3>
        <img src="${poster_img}" alt="${name}" class="lazy-load" loading="lazy">
        <iframe class="iframeContainer" data-loaded="false" frameborder="0"></iframe>
        <div class="title-bar">
          <div class="title-bar-icons">
            <button class="button-play"><i class="fa-solid fa-play"></i></button>
            <button class="button-play second"><i class="fa-solid fa-plus"></i></button>
            <button class="button-play second"><i class="far fa-thumbs-up"></i></button>
          </div>
          <div class="movies-detail">
            <ul><li> - Trailer</li></ul>
          </div>
        </div>
      </div>`;
    $(containerId).append(htmlRender).show();
  });
};


      await moviesPoster(slicedMovies.slice(0, 6), '#movie-images1')
      await moviesPoster(slicedMovies.slice(6, 11), '#movie-images2')
      await moviesPoster(slicedMovies.slice(11, 17), '#movie-images3')
      await moviesPoster(slicedMovies.slice(17, 22), '#movie-images4')

    } catch (error) {
      console.error("❌ Error fetching movies:", error);
    }

  });

});
