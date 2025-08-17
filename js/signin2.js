$(document).ready(function () {
    
    $('.email-input , .name-input, .password-input').click(function () {
        const $current = $(this).find('.inner-box, input')

        // logic for input box click active 
        $current.parent().css({
            outline: '2px solid white',
            border: '1px solid #cccccc5b'
        })

        $('.input-container').not($current.parent()).css({
            outline: 'none',
            border: 'none',
        })
        // logic for input box click active 

        // logic starts here for input active on click
        const $input = $(this).find('input')
        $('.inner-box, input').css({
            'background-color': 'transparent'
        })

        $($input).css({
            display: 'flex',
            background: 'transparent'
        }).focus()
        // console.log($('.inner-box, label'))

    })

    $('.signin-btn').on('click', function (e) {
        e.preventDefault()

        let email = $('#email').val().trim();
        let password = $('#password').val().trim();
        let $email = $('#name')
        // let $password = $('#name')
        console.log(email, password);
        // logic for email input
        const $regex = /^(?=.{5,})(?=.*@).+$/
        if (!$regex.test(email)) {
            // $email.parent().siblings('h3')[0].style.display = 'block'
        } else {
            // $email.parent().siblings('h3')[0].style.display = 'none'
        }
        // logic for password input
        if (password.length < 4) {
            // $password.parent().siblings('h3')[2].style.display = 'block'
            alert('password contain must 6 characters')
        } else {
            // $email.parent().siblings('h3')[2].style.display = 'none'
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("User signed in:", userCredential.user.password);
                window.location.href='../html/home.html';
            }).catch((error) => {
                console.error(error.code, error.message);
                alert(error.message);
            });
         

    });

});