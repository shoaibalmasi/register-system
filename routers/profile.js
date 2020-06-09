const express=require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
let editPage=require('./edit');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.text());

// get user profile page
router.get('/:name', function (req, res) {
    fs.readFile("./db/users.json", 'utf8', (err, data) => {
        if(err){
            console.log(err);
            
        }else{
            let editMode=editPage.editStatus;
            let name = req.params.name;
            data=JSON.parse(data);
            let user = data.filter(u => u.userName == name );
            user=user[0];
            if(user.isLoggedIn===true){
                res.render('pages/profile', {user,editMode});
            }else{
                res.send('شما به این صفحه دسترسی ندارید')
            }
        }
})
})


module.exports=router;