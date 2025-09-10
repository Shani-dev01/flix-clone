// Api call logic starts
// const proxies = [
//   "https://api.allorigins.win/raw?url=",
//   "https://thingproxy.freeboard.io/fetch/",
//   "https://api.codetabs.com/v1/proxy/?quest="
// ];

$(document).ready(async function () {

  const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
  const url = 'https://api.themoviedb.org/3';
  const img_base_url = 'https://image.tmdb.org/t/p/original';
  

//   // ✅ Helper function to fetch with fallback
//   async function fetchWithFallback(endpoint) {
//     for (let proxy of proxies) {
//       try {
//         const res = await fetch(proxy + encodeURIComponent(endpoint));
//         if (res.ok) {
//           return res.json();
//         }
//       } catch (err) {
//         console.warn("❌ Proxy failed:", proxy, err);
//       }
//     }
//     throw new Error("All proxies failed for " + endpoint);
//   }

// // ✅ Get all genres
//     const genreCodes = async () => {
//       const endpoint = `${url}/genre/movie/list?api_key=${api_key}`;
//       const genreData = await fetchWithFallback(endpoint);
//       const genres = genreData.genres || [];

//       const slicedMovies = genres.slice(0, 5);
//       slicedMovies.forEach((genre, index) => {
//         const genreName = genre.name;
//         const genreId = genre.id;

//         let sliderHtml = `
//         <div class="slider-div">
//           <h2 class="movies-title">${genreName}</h2>
//           <div class="btn-div">
//             <button class="buttons left"><li class="fas fa-chevron-left"></li></button>
//             <button class="buttons right"><li class="fas fa-chevron-right"></li></button>
//           </div>
//           <div class="slider-cards-buttons">
//             <div class="movie-images" id="movie-images${index + 1}"></div>
//           </div>
//         </div>`;
//         $('.home-page-slider-div').append(sliderHtml);

//         moviesPoster(genreId, genreName, index + 1);
//       });
//     }
//     genreCodes();

//     // ✅ Fetch movies by genre
//     const moviesPoster = async (genreId, genreName, containerIndex) => {
//       const endpoint = `${url}/discover/movie?api_key=${api_key}&with_genres=${genreId}`;
//       const allMoviesData = await fetchWithFallback(endpoint);

//       $(`#movie-images${containerIndex}`).empty();

//       const moviePromises = allMoviesData.results.slice(0, 10).map(async (movie) => {
//         const videoEndpoint = `${url}/movie/${movie.id}/videos?api_key=${api_key}`;
//         const vidId = await fetchWithFallback(videoEndpoint);
//         const videoKey = vidId.results.length ? vidId.results[0].key : null;

//         return { movie, videoKey };
//       });

//       const moviesWithVideos = await Promise.all(moviePromises);

//       moviesWithVideos.forEach(({ movie, videoKey }) => {
//         const poster_img = `${img_base_url}${movie.backdrop_path}`;
//         const htmlRender = `
//         <div class="movies-card"  data-movieid="${movie.id}" data-video-key="${videoKey}" >
//           <h3 class="movies-name">${movie.title}</h3>
//           <img src="${poster_img}" alt="${movie.title}" class="lazy-load" loading="lazy" >
//           <iframe class="iframeContainer" data-loaded="false" frameborder="0"></iframe>
//           <div class="title-bar">
//             <div class="title-bar-icons">
//               <button class="button-play"><i class="fa-solid fa-play"></i></button>
//               <button class="button-play second"><i class="fa-solid fa-plus"></i></button>
//               <button class="button-play second"><i class="far fa-thumbs-up"></i></button>
//             </div>
//             <div class="movies-detail">
//               <ul><li>${genreName} - Trailer</li></ul>
//             </div>
//           </div>
//         </div>`;

//         $(`#movie-images${containerIndex}`).append(htmlRender);
//       });

//     }


//   $(document).on('mouseleave', '.movies-card', function (e) {
//     e.stopPropagation();
//     const card = $(this);
//     card.closest('.slider-div').find('.iframeContainer').css({
//       'display': 'flex',
//       'position': 'absolute',
//       'z-index': '-1'
//     });
//   });


//   var players = {}; // global object to store all iframe players

//   function onYouTubeIframeAPIReady() {
//     $('.iframeContainer').each(function (index, iframe) {
//       var movieId = $(iframe).closest('.movies-card').data('movieid');
//       players[movieId] = new YT.Player(iframe, {
//         events: {
//           'onReady': onPlayerReady
//         }
//       });
//     });
//   }

//   function onPlayerReady(event) {
//     // event.target is the player object
//   }


//   // Logic for play videos on card hover
//   $(document).on('mouseenter', '.movies-card', function (e) {
//     e.stopPropagation();
//     const card = $(this);
//     const iframeContainer = card.find('.iframeContainer')

//     card.closest('.slider-div').find('.btn-div').css({ 'display': 'flex' });
//     if ($(e.target).closest('.buttons').length) {
//       card.closest('.slider-div').find('.btn-div').css({ 'display': 'flex' });
//       card.removeClass('hover-active');
//     }
//     card.addClass('hover-active');

//     card.find('.iframeContainer').css({
//       'display': 'flex',
//       'position': 'absolute',
//       'z-index': '2',
//       'pointer-events': 'none',
//       'transition': 'none',
//       'width': '265px',
//       'height': '60%'
//     });

//     $('.movies-card').not(card).find('.iframeContainer').css({
//       'display': 'flex',
//       'position': 'absolute',
//       'z-index': '-1',
//       'pointer-events': 'none'
//     });
//     const videoKey = card.data('video-key');

//     // Agar iframe already loaded nahi hai
//     if (iframeContainer.data('loaded') === false) {
//       // Set iframe src only on hover
//       const embedUrl = `https://www.youtube.com/embed/${videoKey}?controls=0&rel=0&enablejsapi=1&autoplay=1&mute=1`;
//       iframeContainer.attr('src', embedUrl);
//       iframeContainer.data('loaded', true);

//       // Initialize YT.Player for hover control
//       players[videoKey] = new YT.Player(iframeContainer[0], {
//         events: {
//           onReady: (event) => {
//             event.target.playVideo(); // play on hover
//           }
//         }
//       });
//     } else {
//       // Already loaded, just play
//       if (players[videoKey]) players[videoKey].playVideo();
//     }
//   });

//   // Logic for pause videos on card leave
//   $(document).on('mouseleave', '.movies-card', function (e) {
//     $(this).closest('.slider-div').find('.btn-div').css({ 'display': 'none' });
//     $(this).removeClass('hover-active');
//     $(this).closest('.slider-div').find('.iframeContainer').css({ 'display': 'block' });
//     $(this).removeClass('hover-active');
//     const card = $(this);
//     const videoKey = card.data('video-key');

//     if (players[videoKey] && typeof players[videoKey].pauseVideo === "function") {
//       console.log('mouse leaved');
//       players[videoKey].pauseVideo();
//     }

//   });

//   $(document).on('mouseenter', '.buttons', function (e) {
//     e.stopPropagation();
//     alert('clicked');
//   });

});