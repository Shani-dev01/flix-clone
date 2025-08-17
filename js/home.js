$(document).ready(function(){
    
    let name = localStorage.getItem('userEmail');
    console.log(name);
    $('#user-name').html(name);
})