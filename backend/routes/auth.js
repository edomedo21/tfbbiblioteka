const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], async (req, res) => {

    const myemail = req.body.email;

    const user = await helper.database.table('users').filter({email: myemail}).get();
        if(user){
            const myrole = user.role;
            const userId = user.id;
            const myname = user.fname;
            const mylname = user.lname;
            const slika = user.photoUrl;
            console.log(user);
            let token = jwt.sign({state: 'true',id: userId, email: myemail, role: myrole, fname: myname, lname: mylname, photoUrl: slika }, helper.secret, {
                algorithm: 'HS512',
                expiresIn: '4h'
            });
            res.json({token: token, auth: true,id: userId, email:myemail, role: myrole, fname: myname, lname: mylname, photoUrl: slika});
        }
        else {
            console.log(user);
        }
    
});

router.post('/register', async(req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
  

    helper.database.table('users').insert({
        id: id,
        fname: fname,
        lname: lname,
        email: email,
        username: username,
        password: password
    });

  });

    router.get('/search', (req,res)=>{
    const query = req.query.q;
    helper.database.table('products')
    .filter({ title: query })
    .withFields(['id', 'title', 'image', 'images', 'description', 'price', 'quantity', 'short_desc', 'cat_id'])
    .get()
    .then((product) => {
      if (product) {
        res.json([ product] );
      } else {
        res.json({ message: `NO PRODUCT FOUND WITH username: ${query}` });
      }
    })
    .catch((err) => res.json(err));
}); 




module.exports = router;
