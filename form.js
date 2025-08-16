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

// logic for form submition starts here
  $('.signin-btn').on('click', function (e) {
        e.preventDefault()
        const $name = $('#email').val()
        const $email = $('#name').val()
        const $password = $('#password').val()
        if ($name === '' && $email === '' && $password === '') {
            $('h3').css({
                display:'block'
            })
            $('.input-container').css({
                border: '1px solid red',
                outline: 'none'
            })
            console.log('input field is blank')
        }
        console.log($name, $email, $password);
    });
// logic for form submition ends here
});