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
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('pass', JSON.stringify(password));


        let $email = $('.input-container')
        let $password = $('.input-container')

        // --- logic for email input ---
        const $regex = /^(?=.{5,})(?=.*@).+$/
        if (!$regex.test(email)) {
            $email.siblings('h3')[0].style.display = 'block'
        } else {
            $email.siblings('h3')[0].style.display = 'none'
        }
        // --- logic for password input ---
        if (password.length < 4 && password.length === 0) {
            $password.siblings('h3')[1].style.display = 'block'
        } else {
            $email.siblings('h3')[1].style.display = 'none'
        }
        // --- logic for password input ---

        window.auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                localStorage.setItem('UserEmail', JSON.stringify(email));
                localStorage.setItem('UserPassword', JSON.stringify(password));
                let userEmail = JSON.parse(localStorage.getItem('UserEmail'));
                let userPassword = JSON.parse(localStorage.getItem('UserPassword'));


                    if (email === userEmail && password === userPassword) {
                        alert("Signin successful! ✅");
                        // window.location.href='../html/home.html'
                        window.location.replace('../html/home.html')
                    } else {
                        window.location.href = '../html/signin.html';
                    }

                    if (!email || !userEmail || !password || !userPassword) {
                        window.location.href = '../html/signin.html';
                    } else {
                        window.location.replace('../html/home.html');
                    }

                }).catch((error) => {
                    console.error(error.code, error.message);
                    alert(error.message);
                    localStorage.clear();
                });
                // firebase authentication
            });
    });