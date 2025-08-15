$(document).ready(function(){
    $('.email-input , .name-input, .password-input').click(function(e) {
        const $current = $(e.target).find('.inner-box, input')
        $current.parent().css({
            outline: '2px solid white',
            border: '1px solid #cccccc5b'
        })
        console.log($current)
    })



    $('#signUp').on('submit',function(e) {
        e.preventDefault()
        const $name = $('#name').val()
        const $email = $('#email').val()
        const $password = $('#password').val()

        console.log(name, $email, $password)
    })
})