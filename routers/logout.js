const express=require('express')
const router = express.Router();

const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.text());


// post route for logout
router.post('/',(req,res)=>{
    console.log(req.body);
    fs.readFile("./db/users.json", 'utf8', (err, data) => {
        if(err){
            console.log(err);
            
        }else{
            let  dataObj = JSON.parse(data); 
            let index = dataObj.findIndex(x => x.userName === req.body);
            dataObj[index].isLoggedIn=false;
            fs.writeFile('./db/users.json', JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.log(err);
                }
            })
            res.send('successful');
        }
    })
    
})

module.exports=router;