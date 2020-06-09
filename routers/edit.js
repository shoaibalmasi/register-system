const express = require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.text());

// post for save user changes
//If the password or username changes, the user will be redirected to the login page
//Otherwise, it will be redirected to the user's profile page
router.post('/', function (req, res) {
    fs.readFile("./db/users.json", 'utf8', (err, data) => {
        if (err) {
            console.log(err);

        } else {
            let status = true;
            let dataObj = JSON.parse(data);
            let userInfo = JSON.parse(req.body);
            let index = dataObj.findIndex(x => x.userName === userInfo.lastUserName);
            if (dataObj[index].isLoggedIn === true) {
                let lastUserInfo = dataObj.splice(index, 1);
                if (JSON.stringify(lastUserInfo[0]) === JSON.stringify(userInfo.newUser)) {
                    res.send('true');
                } else {
                    if (dataObj.filter(u => u.userName == userInfo.newUser.userName).length) {
                        status = false;
                        res.send('false')
                    }
                    if (status) {
                        if (lastUserInfo[0].userName !== userInfo.newUser.userName || lastUserInfo[0].password !== userInfo.newUser.password) {
                            userInfo.newUser.isLoggedIn = false;
                        }
                        dataObj.push(userInfo.newUser)
                        fs.writeFile('./db/users.json', JSON.stringify(dataObj), (err) => {
                            if (err) {
                                console.log(err);

                            } else {
                                if (userInfo.newUser.isLoggedIn) {
                                    res.send('true');
                                } else {

                                    res.send('userName or password has changed');
                                }
                                let editStatus = true;
                                module.exports.editStatus = editStatus;
                            }
                        })
                    }
                }
            }
        }
    })
})

module.exports = router;