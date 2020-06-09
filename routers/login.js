const express=require('express')
const router = express.Router();
let register=require('./register');
let editPage=require('./edit');
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.text());

//get login page
router.get('/', function (req, res) {
    let registerMode=register.regStatus;
    let editMode=editPage.editStatus;
    res.render('pages/login' ,{registerMode,editMode})
})

//post username and password
router.post('/', function (req, res) {
   
    fs.readFile("./db/users.json", 'utf8', (err, data) => {
        if(err){
            console.log(err);
            
        }else{
            let status = false;
            let index;
            let  dataObj = JSON.parse(data);
            let userInfo=JSON.parse(req.body);
                if ( dataObj.filter(u => u.userName == userInfo.userName ).length) {
                    status=true;
                     index = dataObj.findIndex(x => x.userName === userInfo.userName);
                }
            if(status){
                if(dataObj[index].password===userInfo.password){
                    dataObj[index].isLoggedIn=true;
                    fs.writeFile('./db/users.json', JSON.stringify(dataObj), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    res.send('successful');

                }else{
                    res.send('passwordISWrong');
                }
            }else{
                res.send('userNotFound');
            }
        }
})
})

module.exports=router;