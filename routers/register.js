const express=require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.text());

// get register page
router.get('/', function (req, res) {
    res.render('pages/register')

})

//registring new user
router.post('/', function (req, res) {
    fs.readFile("./db/users.json", 'utf8', (err, data) => {
        if(err){
            console.log(err);
            
        }else{
            let status = true;
            let dataObj = JSON.parse(data);
            let newUser = JSON.parse(req.body)
        
                if ( dataObj.filter(u => u.userName === newUser.userName ).length) {
                    res.send('false');
                    status = false;
                
                }
            if (status) {
                let lastUsers = data.slice(0, -1);
                fs.writeFile('./db/users.json', `${lastUsers},\n${req.body}]`, (err) => {
                    if (err) {
                        console.log(err);
    
                    } else {
                       let registerStatus=true;
                        module.exports.regStatus=registerStatus;
                        res.send('true');
                    }
                })
            } 
        }
    })
})


module.exports=router;
