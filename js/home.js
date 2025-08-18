$(window).on(function(){
    window.location.replace('../html/index.html');    
}); 
$(document).ready(function () {
    // --- stop navigation ---

    // --- your scroll logic ---
    let lastScroll = 0;
    $(window).on('scroll', function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {
            $('.Navbar').addClass('scroll');
        } else {
            $('.Navbar').removeClass('scroll');
        }
        lastScroll = currentScroll; // yeh zaruri hai scroll detect ke liye
    });

    // --- sign out ---
    $('.sign-out').on('click', function() {
        alert('sign out');
        localStorage.clear();   // pehle clear karo
        window.location.href = '../html/index.html';
        window.location.replace('../html/index.html');
         // phir redirect
    });
});

