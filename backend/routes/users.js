const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res) {
    database.table('users')
        .withFields([ 'username' , 'email', 'fname', 'lname', 'age', 'role', 'id','photoUrl' ])
        .getAll().then(users => {
            if (users.length > 0) {
                res.status(200).json({
                    count: users.length,
                    korisnici: users
                });
            } else {
                res.json({message: "No products found"});
            }
        }).catch(err => res.json(err));
});

/**
 * ROLE 777 = ADMIN
 * ROLE 555 = CUSTOMER
 */


/* GET ONE USER MATCHING ID */
router.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    database.table('users').filter({id: userId})
        .withFields([ 'username' , 'email','fname', 'lname', 'age', 'role', 'id' ])
        .get().then(user => {
        if (user) {
            res.json(user);
        } else {
            res.json({message: `NO USER FOUND WITH ID : ${userId}`});
        }
    }).catch(err => res.json(err) );
});

/* UPDATE USER DATA */
router.put('/korisnik/:userId', async (req, res) => {
    let userId = req.params.userId;     // Get the User ID from the parameter

  // Search User in Database if any
    let user = await database.table('users').filter({id: userId}).get();
    if (user) {

        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let userFirstName = req.body.fname;
        let userLastName = req.body.lname;
        let userUsername = req.body.username;
        let age = req.body.age;
        let role = req.body.role;

        // Replace the user's information with the form data ( keep the data as is if no info is modified )
        database.table('users').filter({id: userId}).update({
            email: userEmail !== undefined ? userEmail : user.email,
            password: userPassword !== undefined ? userPassword : user.password,
            username: userUsername !== undefined ? userUsername : user.username,
            fname: userFirstName !== undefined ? userFirstName : user.fname,
            lname: userLastName !== undefined ? userLastName : user.lname,
            age: age !== undefined ? age : user.age,
            role: role !== undefined ? role: user.role
        }).then(result => res.json('User updated successfully')).catch(err => res.json(err));
    }
}); 

// DELETE USER

router.delete('/:userId', (req,res)=>{
    const userId = req.params.userId;

    database.table('users')
    .filter({id: userId})
    .remove()
    .then(result =>{
        if(result > 0){
            res.status(200).json({
                message: `User with id ${userId} has been removed!`
            });
        }
        else {
            res.json({ message: `No user was found!`});
        }
    })
    .catch(err => res.json(err));
});

//CREATE USER

router.post('/create', async (req,res)=>{
    const id = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;
    const role = req.body.role;
    const password = await bcrypt.hash(req.body.password, 10);

    database.table('users').insert(
        {
            id: id,
            username: username,
            email: email,
            fname: fname,
            lname: lname,
            age: age,
            role: role,
            password: password
        }
    ).then(result=>{
        if (result > 0) {
            res.status(200).json({ message: `User was inserted.` });
          } else {
            res.json({ message: `error` });
          }
    });

});



module.exports = router;
