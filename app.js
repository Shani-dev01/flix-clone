$(document).ready(function () {
    $('.get-start-button, .input-tag').click(function () {
        $('.input-tag').css({
            outline: '2px solid white',
            transition: '0.1s ease',
            display: 'flex',
            justifyContent: "end"
        })
        $('.input-tag label').css({
            fontSize: '14px',
            transition: '0.4s ease',
        })
        $('.inputId').css({
            height: '30px',
            fontSize: '18px',
            color: 'white',
            display: 'block',
            background: 'transparent',
            border: 'none',
            paddingBottom: '0px'
        }).focus()
    })

    // logic for movies cards click render
    $('.movies-cards').on('click', function () {
        const imgSrc = $(this).find('img').attr('src')
        const img = $('.thumb').attr('src', imgSrc)
        console.log(img)
        $('.movie-posters').css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }).hide().fadeIn(200)
    })
    $('.icon').click(function () {
        $('.movie-posters').fadeOut(250)
    })
    // logic for movies cards click render

    // FAQ logic section
    $('.main-question-box').on('click', function (e) {
        e.stopPropagation();

    // logic for get all faq-discription boxes
    const $current = $(this).find('.faqs-discription');

    // logic for close all faq-discription boxes
    $('.faqs-discription').not($current).slideUp(180);

    // logic for show only faq-discription current box
    $current.slideToggle(200);

    // FAQ exit buttons rotate logic starts here
    const $quit = $(this).find('.fa-plus');

    $quit.toggleClass('rotate')
    $('.fa-plus').not($quit).removeClass('rotate')
    // FAQ exit buttons rotate logic ends here
    
    // FAQ exit buttons logic ends here
    })

    // FAQ logic section  ends
});



$(document).click(function (e) {
    if (!$(e.target).closest(".get-start-button, .input-tag").length) {
        $('.input-tag').removeAttr('style');
        $('.input-tag label').removeAttr('style');
        $('.inputId').css({
            transition: '0.4s ease',
            paddingTop: '0',
            display: 'none',
            height: '0'
        })
        if ($('.inputId').val() === '') {
            $('.alert-text').css({
                display: 'block'
            })
            $('.input-tag').css({
                border: '1px solid red'
            })

        } else {
            $('.alert-text').css({
                display: 'none'
            })
            $('.inputId').css({
                height: '30px',
                fontSize: '18px',
                color: 'white',
                display: 'block',
                background: 'transparent',
                border: 'none',
                paddingBottom: '0px'
            }).focus()
        }
    }
})
