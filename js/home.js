$(document).ready(function () {
    history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1); // forward push kar deta hai → login page wapas nahi aayega
        };

    let lastScroll = 0;
    $(window).on('scroll', function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {
            $('.Navbar').addClass('scroll')
            alert('sign out')
            window.location.href='../html/index.html'
            localStorage.clear()
        } else {
            $('.Navbar').removeClass('scroll')
        }

        // console.log(lastScroll)
    });
});