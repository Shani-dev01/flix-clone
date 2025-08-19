$(document).ready(function () {
    
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1); // back button ko disable kar dega
    };

    // --- your scroll logic ---
    let lastScroll = 0;
    $(window).on('scroll', function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {
            $('.Navbar').addClass('scroll');
        } else {
            $('.Navbar').removeClass('scroll');
        }
    });
    // --- your scroll logic ---


    // --- sign out ---
    $('.sign-out').on('click', function () {
        alert('sign out');
        localStorage.clear();   // pehle clear karo
        window.location.replace('../html/index.html');
        // phir redirect
    });
    // --- sign out ---


});

