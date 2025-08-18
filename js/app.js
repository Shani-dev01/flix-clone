$(window).on(function(){
       window.location.replace('../html/index.html');
    }) 
$(document).ready(function () {
    const validiateUserFunc = () => {  // logic for get user data
        let email = JSON.parse(localStorage.getItem('email'));
        let password = JSON.parse(localStorage.getItem('pass'));
        let userEmail = JSON.parse(localStorage.getItem('UserEmail'));
        let userPassword = JSON.parse(localStorage.getItem('UserPassword'));
        // logic for get user data

        // logic for goto home page and signin page
        $('.signin-button').on('click', function () {

            if (email === userEmail && password === !userPassword) {
                window.location.replace('../html/home.html');
            } else {
                window.location.href = '../html/signin.html';
            }

            if (!email || !userEmail || !password || !userPassword) {
                window.location.href='../html/signin.html';
                window.location.replace('../html/signin.html');
            } else {
                window.location.replace('../html/home.html');
                window.location.replace('../html/home.html');
            }
        });
    }
    $('.header-container').load('../html/header.html', function () {
        // logic for goto home page and signin page
        validiateUserFunc();
    });

    // FAQ logic section starts here
    $('.main-question-box').on('click', function (e) {
        e.stopPropagation()

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
    });
    // FAQ logic section ends here

    // logic for target slider buttons
    const $leftButton = $('.btn-left');
    const $rightButton = $('.btn-right');
    let current = 0;
    let $slideLenght = 0;
    // logic for target slider buttons
    // logic for slide movies-cards left
    $($rightButton).on('click', function (e) {
        const $cards = $('.movies-cards')
        $slideLenght = $cards.length
        if (!$(e.target).closest('.movies-cards').length) {
            if (current < $slideLenght - 7) {
                current = current + 1
                $cards.css({
                    transform: `translateX(${-current * 550}px)`,
                    transition: '0.3s ease-in'
                });
                $('.btn-left').show(200);
                console.log(current)
                if (current > 1 && current === 2) {
                    $('.btn-left').show(200)
                    $('.btn-right').hide(200)
                }

            }
        }
    })
    // logic for logic for slide movies-cards left

    // logic for logic for slide movies-cards right

    $($leftButton).on('click', function (e) {
        const $cards = $('.movies-cards')
        $slideLenght = $cards.length

        if (!$(e.target).closest('.movies-cards').length) {
            if (current > 0) {
                current = (current - 1)
                $cards.css({
                    transform: `translateX(${-current * 550}px)`,
                    transition: '0.3s ease-in'
                });
                $('.btn-right').show(200);
                console.log(current)
                if (current === 0 || current < 1) {
                    $('.btn-right').show(200);
                    $('.btn-left').hide(200);
                }
            }

        }
    })
    // logic for logic for slide movies-cards righ


    // logic for input focus on click fet button and input box
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
    });
    
    // logic for input focus on click fet button and input box

    // function trigger on click
    $('.get-start-button').click(function(){
        getInputVal()
    })
    
    // logic for main page input value
const getInputVal = () => { 
     const input = $('.inputId').val().trim()===''
        const email = JSON.parse(localStorage.getItem('email'))
        console.log(input);
        if (input === email) {
            window.location.replace('../html/signin.html');
        }else{
            alert('Enter Valid  Id "Setflix@" or Create Id ');
        }
 }
});



//2):- logic for input infocus on click outside
$(document).click(function (e) {
    if (!$(e.target).closest(".get-start-button, .input-tag").length
        && $(e.target).closest(".hero-section, .inner-sectio").length) {
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
                display: 'none',
                background: 'transparent',
                border: 'none',
                paddingBottom: '0px'
            }).focus()
        }
    }
})
// logic for input infocus on click outside

