$(document).ready(function () {

    $('.header-container').load('../html/navbar.html', function () {
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


        // --- search bar logic --- 
        $('.user-icons').on('click', function (e) {
            e.stopPropagation();
            if ($(e.target).closest('.search-input').length) {
                $('.search-input').css({
                    'width': '280px',
                    'border': '1px solid #ccc',
                    'background': '#000'
                });
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.search-input').length) {
                $('.search-input').css({
                    'width': '30px',
                    'border': 'none',
                    'background': 'transparent',
                    'transition': '0.3s ease'
                });
            }
        });
        // --- search bar logic ---



        // --- sign out ---
        $('.sign-out').on('click', function () {
            alert('sign out');
            localStorage.clear();   // pehle clear karo
            window.location.replace('../html/index.html');
            // phir redirect
        });
        // --- sign out ---

        

    })
})