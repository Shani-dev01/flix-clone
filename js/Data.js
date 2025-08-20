var player;
var videoIdKey;
var playerReady = false;
console.log(videoIdKey)
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-container', {
        'height': '100%',
        'width': '100vw',
        videoId: '',
        playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            wmode: 'transparent'
        },
        events: {
            'onReady': onPlayerReady
        }
    })
}
function onPlayerReady(event) {
    console.log("Player is ready!");
    playerReady = true;
    if (videoIdKey) {
        player.loadVideoById(videoIdKey);
    }
    event.target.playVideo(); // autoplay bhi kara sakte ho
}

$(document).ready(async function () {

    // Api call logic starts
    const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
    const url = 'https://api.themoviedb.org/3';
    const img_base_url = 'https://image.tmdb.org/t/p/original';


    // --- logic for fetch data and render to the card ---
    $card = $('.movies')
    const cardRes = await fetch(`${url}/trending/movie/day?api_key=${api_key}`);
    const cardData = await cardRes.json();
    const pages = cardData.results;
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

    //  --- logic for movies poster homepage  --- 
    const posterRes = await fetch(`${url}/trending/all/day?api_key=${api_key}`);
    const posterData = await posterRes.json();
    const page = posterData.results;
    let genre_id = page[3].id
    console.log(page[3])


    //  --- logic for fetch moives for poster ---

    const res = await fetch(`${url}/movie/${genre_id}/videos?api_key=${api_key}`)
    const data = await res.json()
    const urlKey = data.results[7].key
    console.log(data.results[0])
    videoIdKey = urlKey;
    if (data.results.length > 0) {
        videoIdKey

        // Sirf tab load karo jab player ready ho
        if (playerReady) {
            player.loadVideoById(videoIdKey);
        } else {
            const posterImg = `${img_base_url}${page[3].backdrop_path}`;
            $('.parent-hero-div').css({
                'background-image': `url("${posterImg}")`,
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'position': 'relative',
                'z-index': '1',
            });
            const parentDiv = $('.parent-hero-div')
            const bannerPoster = `
                <div class="child-hero-div" >
                <div class="title-div">
                    <h2>${page[3].original_title}</h2>
                    <span>${page[3].overview}</span>
                    <div class="btnDivs">
                    <button class="home-page-play-button" >
                    <li class="fa-solid fa-play"></li>Play
                    </button>
                    <button class="volumBtn" >volume</button>
                    </div>
                </div>    
            </div>`
            parentDiv.append(bannerPoster);
        }
    }
    const youtubeUrl = `https://www.youtube.com/watch?v=${urlKey}`;
});


// var player;
// var videoIdKey;
// var playerReady = false; // track if player ready hai

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player-container', {
//         height: '100%',
//         width: '100%',
//         videoId: '', // initially blank
//         playerVars: { autoplay: 0, controls: 0 },
//         events: {
//             onReady: function(event) {
//                 playerReady = true;
//                 console.log("Player ready!");

//                 // Agar videoIdKey pehle se fetch ho gayi ho
//                 if(videoIdKey){
//                     player.loadVideoById(videoIdKey);
//                 }
//             }
//         }
//     });
// }

// $(document).ready(async function() {
//     const api_key = 'abd6102284b0a6e60a5a118ba23efedb';
//     const url = 'https://api.themoviedb.org/3';

//     async function fetchVideoKey() {
//         const res = await fetch(`${url}/trending/all/day?api_key=${api_key}`);
//         const data = await res.json();
//         const page = data.results;
//         console.log(page[12])
//         let genre_id = page[12].genre_ids[1];

//         const videoRes = await fetch(`${url}/movie/${genre_id}/videos?api_key=${api_key}`);
//         const videoData = await videoRes.json();
//         if(videoData.results.length > 0){
//             videoIdKey = videoData.results[0].key;
//             console.log("videoIdKey set ho gaya:", videoIdKey);

//             // Sirf tab load karo jab player ready ho
//             if(playerReady){
//                 player.loadVideoById(videoIdKey);
//             }
//         }
//     }

//     await fetchVideoKey();
// });
