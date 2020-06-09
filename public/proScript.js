// func for logout
function logoutFunc(){
    let areYouSure = confirm("مطمئنید میخواهید خارج شوید؟");
    if (areYouSure) {
     
    $.ajax({
        type: "POST",
        url: "/logout",
        data: $('#user-name').val(),
        contentType:'text/plain',
        dataType: "text",
        success: function (res) {
            if(res==='successful'){
                document.location="/login";
                $('#alert').css('visibility','hidden')
            }else{
                $('#alert').css('visibility','visible')
                $('#alert-txt').html('مشکلی پیش آمده')
            }
            
        }
    });
}
}


