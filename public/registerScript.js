let passwordMode = false;
let userNameMode=false;
let passConMode=false;
let genderMode=false;
let emailMode=false;
let selected;

//user constructor
function User(userName, email, gender, password, isLoggedIn) {
    this.userName = userName;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.isLoggedIn = isLoggedIn;
  }

// func for correct mode
function blueMode(x,y){
    $(`#${x}`).css("color", "rgb(19, 180, 255)");
    $(`#${y}`).css("border-bottom", "solid 2px rgb(19, 180, 255)");
    $(`#${y}`).css("caret-color", "rgb(19, 180, 255)");
}

// func for wrong mode
function redMode(x,y){
    $(`#${x}`).css("color", "red");
    $(`#${y}`).css("border-bottom", "solid 2px red")
    $(`#${y}`).css("caret-color", "red")
}

//func for checking inputs mode
function checkModes(){
    if(passwordMode===true && passConMode===true && userNameMode===true &&
        emailMode===true && genderMode===true){
            $('#alert').css('visibility','hidden');
            $('#edit-alert').css('visibility','hidden');
            return true ;
        }
}

//check password
function checkPassword() {
    let password = $("#password").val();
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.length >= 8) {
        if (password.match(/[0-9]/g) && password.match(format)) {
            blueMode("pass-main","password")
            passwordMode = true;
            checkPasswordCon();

        } else {
            redMode("pass-main","password")
            passwordMode = false;
        }
    } else {
        redMode("pass-main","password")
        passwordMode = false;
    }
    checkModes();
}

//check password confirm
function checkPasswordCon() {
    if (passwordMode) {
        if ($("#password").val() === $("#passCon").val()) {
            blueMode("passCon-main","passCon");
            passConMode=true;
        } else {
            redMode("passCon-main","passCon");
            passConMode=false;
        }
    } else {
        redMode("passCon-main","passCon");
        passConMode=false;

    }
    checkModes();
}

//func for show or hide password
$("#eye").click(function () {
    if ($("#eye").attr("class") === 'fa fa-eye-slash') {
        $("#eye").attr("class", 'fa fa-eye');
        $("#password").attr("type", "text")
    } else {
        $("#eye").attr("class", 'fa fa-eye-slash');
        $("#password").attr("type", "password")
    }
});

//check gender
function checkGender() {
    $('#gender').change(function () {
         selected = $(this).children('option:selected').attr('id');
            if(selected==="male" || selected==="female"){
                blueMode("gender-main","gender") ;
                genderMode=true; 
            }else{
                redMode("gender-main","gender")  ;
                genderMode=false; 

            }
            checkModes();
    })  
}


//check email 
function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

function checkEmail(){
 let email = $("#email").val();

 if (validateEmail(email)) {
    blueMode("email-main","email");
    emailMode=true;   
}else{
    redMode("email-main","email") ;
    emailMode=false;
}
checkModes();
}

//check username
function checkName(){
let username=$('#userName').val()
$('#alert').css('visibility','hidden')
if(username===""){
    redMode("username-main","userName");
    userNameMode=false;
}else{
    userNameMode=true;
    blueMode("username-main","userName")
}
checkModes();
}

// final check and registering
function registerFunc(){
 
    if(checkModes()){

              let newUser=new User($("#userName").val(), $("#email").val(), selected,
               $("#password").val(), false)
            $.ajax({
                type: "POST",
                url: "/register",
                data: JSON.stringify(newUser),
                contentType:'text/plain',
                dataType: "text",
                success: function (res) {
                    if(res==='true'){
                        document.location="/login";
                
                    }else{
                        $('#alert').css('visibility','visible')
                        $('#alert-txt').html('نام کاربری قبلا استفاده شده است')
                        redMode("username-main","userName");
                    }   
                }
            });
           
        }else{
            $('#alert').css('visibility','visible')
            $('#alert-txt').html('لطفا همه فیلدها را به درستی پر کنید')
        }
}

//func for edit button
function editFunc(){
    $('#infoDiv').css('display',"none")
    $('#editDiv').css('display',"flex")
     passwordMode = true;
     userNameMode=true;
     passConMode=true;
     genderMode=true;
     emailMode=true;
}

// func for save changes after edit
function saveEditFunc(){
   
    if(checkModes()){
              let newUser=new User($("#userName").val(), $("#email").val(),$('#gender').find(':selected').attr('id'),
               $("#password").val(), true)
               let lastUserName=$('#user-name').val();
            $.ajax({
                type: "POST",
                url: "/saveEdit",
                data: `{"lastUserName":"${lastUserName}","newUser":${JSON.stringify(newUser)}}`,
                contentType:'text/plain',
                dataType: "text",
                success: function (res) {
                    if(res==='true'){
                        document.location=`/profile/${newUser.userName}`;
                    }else if(res=='userName or password has changed'){
                        document.location='/login';
                    }
                    else{
                        $('#edit-alert').css('visibility','visible')
                        $('#edit-alert-txt').html('نام کاربری قبلا استفاده شده است')
                        redMode("username-main","userName");
                    }   
                }
            });
           
        }else{
            $('#edit-alert').css('visibility','visible')
            $('#edit-alert-txt').html('لطفا همه فیلدها را به درستی پر کنید')
        }
}
