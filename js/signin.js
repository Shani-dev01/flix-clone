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
        let $email = $('.input-container')
        let $password = $('.input-container')

        // logic for email input
        const $regex = /^(?=.{5,})(?=.*@).+$/
        if (!$regex.test(email)) {
            $email.siblings('h3')[0].style.display = 'block'
        } else {
            $email.siblings('h3')[0].style.display = 'none'
        }
        // logic for password input
        if (password.length < 4 && password.length === 0) {
            $password.siblings('h3')[1].style.display = 'block'
        } else {
            $email.siblings('h3')[1].style.display = 'none'
        }
        window.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
                alert("Signin successful! ✅"); alert
                window.location.href = '../html/home.html';
                var user = firebase.auth().currentUser;
                console.log("Email:", user.email);
                // LocalStorage me save karna
                localStorage.setItem('userEmail', user.email);
            }).catch((error) => {
                console.error(error.code, error.message);
                alert(error.message);
            });
        // firebase authentication
    });

});