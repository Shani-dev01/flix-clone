$(document).ready(function () {
const firebaseConfig = {
    apiKey: "AIzaSyCW9nlPVWjH3Ve_cvmLNLtd-iJ4SCjCeMM",
    authDomain: "setflix-63b2f.firebaseapp.com",
    projectId: "setflix-63b2f",
    storageBucket: "setflix-63b2f.firebasestorage.app",
    messagingSenderId: "1085714291731",
    appId: "1:1085714291731:web:97a1e7917f83742ea073e6",
    measurementId: "G-HG8RZGP4P3"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Ab yaha auth use kar sakte ho
  const auth = firebase.auth();

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

    // fucntion for warn on empty input
    // const warnFunc = () => {
    //      $('h3').css({
    //                 display:'block'
    //             })
    //             $('.input-container').css({
    //                 border: '1px solid red',
    //                 outline: 'none'
    //             });
    // }


    // logic for form submition starts here
    $('.signin-btn').on('click', function (e) {
        e.preventDefault()
        let name = $('#name').val().trim();
        localStorage.setItem('name', JSON.stringify(name));
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();
        let $name = $('#name')
        let $email = $('#name')
        let $password = $('#name')
        // logic for email input
        const $regex = /^(?=.{5,})(?=.*@).+$/
        if (!$regex.test(email)) {
            $email.parent().siblings('h3')[0].style.display = 'block'
        } else{
            $email.parent().siblings('h3')[0].style.display = 'none'
        }

        // logic for name input
        if (name === '' || /\d/.test(name)) {
            $name.parent().siblings('h3')[1].style.display = 'block'
        } else{
            $email.parent().siblings('h3')[1].style.display = 'none'
        }
        // logic for password input
        if (password.length < 4) {
            $password.parent().siblings('h3')[2].style.display = 'block'
        } else{
            $email.parent().siblings('h3')[2].style.display = 'none'
        }
       auth.createUserWithEmailAndPassword(email,password)
      .then((userCredential) => {
          console.log(userCredential.user);
        alert("Signup successful! ✅");
        // window.location.href='../html/home.html'
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
    });
    // logic for tick sign
    // $('.radio-btn').click(function () {
    //     let $name = $('#name');
    //     let $email = $('#email');
    //     let $password = $('#password');

    //     $(this).toggleClass('checked');
    //     if ($(this).toggleClass('checked')) {
    //         console.log($email.val(), $name.val(), $password.val());
    //     } else {
    //         console.log('radio not checked!');
    //     }
    // });
    // logic for tick sign
    // logic for form submition ends here


});