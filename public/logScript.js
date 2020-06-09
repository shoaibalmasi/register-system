
//func for correct mode
function blackMode(x, y) {
    $(`#${x}`).css("color", "black");
    $(`#${y}`).css("border-bottom", "solid 1px black");
    $(`#${y}`).css("caret-color", "black");
}
//func for wrong mode
function redMode(x, y) {
    $(`#${x}`).css("color", "red");
    $(`#${y}`).css("border-bottom", "solid 2px red")
    $(`#${y}`).css("caret-color", "red")
}

//login func

function loginFunc() {
    let userName = $('#userName').val();
    let password = $('#password').val();
    if (userName === "" || password === "") {
        $('#alert-txt').html('لطفا تمامی فیلدها را پر کنید')
        $('#alert').css('visibility', 'visible')
        if (userName === "") {
            redMode('user-main', 'userName')
        } else {
            blackMode('user-main', 'userName')
        }
        if (password === "") {
            redMode('pass-main', 'password');
        } else {
            blackMode('pass-main', 'password');
        }
    } else {
        $('#alert').css('visibility', 'hidden')
    
        let userInfo = {
            userName: userName,
            password: password
        }
            $.ajax({
                type: "POST",
                url: "/login",
                data: JSON.stringify(userInfo) ,
                contentType:'text/plain',
                dataType: "text",
                success: function (res) {
                    if(res==='userNotFound'){
                        $('#alert-txt').html('نام کاربری یافت نشد')
                        $('#alert').css('visibility', 'visible')
                    }else if(res==='passwordISWrong'){
                        $('#alert-txt').html('رمز عبور نادرست است')
                        $('#alert').css('visibility', 'visible')
                    }else{
                        document.location=`/profile/${userInfo.userName}`;
                    }
                },
                error: function(err){
                    console.log(err);   
                }
            });
       }
}