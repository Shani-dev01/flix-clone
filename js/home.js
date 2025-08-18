$(document).ready(function () {

    let name = localStorage.getItem('userEmail');
    console.log(name);
    $('#user-name').html(name);

    $(window).on('scroll', function () {
        let lastScroll = 0;
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {
            $('.Navbar').addClass('scroll')
            console.log('Down', currentScroll)
        } else {
            $('.Navbar').removeClass('scroll')
            console.log('Up:', currentScroll)
        }

        // console.log(lastScroll)
    });
});