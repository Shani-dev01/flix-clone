    $('.header-container').load('../html/header.html', function () {
        $('.headSignBtn button').click(function () {
            window.location.href = '../html/signin.html';
        })
    });
    