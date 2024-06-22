// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const db = require('./db/conn');
// const User = require('./models/userModal');


// const cors = require('cors');

// app.use(cors());

// //middleware
// app.use(express.json());


// app.post('/register', (req, res) => {

//     // const {name,email,category,password}=req.body;
//     // console.log(name);
//     User.create(req.body)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
//     // res.status(200).json({message:'registration successful'});    



//     // Assuming 'User' is your Mongoose model for users

//     // User.findOne({ email: req.body.email })
//     //     .then(existingUser => {
//     //         if (existingUser) {
//     //             // User already exists, return an error
//     //             res.status(400).json({ error: 'User already exists' });
//     //         } else {
//     //             // User does not exist, create a new account
//     //             User.create(req.body)
//     //                 .then(result => res.json(result))
//     //                 .catch(err => res.json(err));
//     //         }
//     //     })
//     //     .catch(err => res.status(500).json({ error: 'Internal server error' }));


// });


// app.post('/login', async (req, res) => {

//     const { email, category, password } = req.body;

//     User.findOne({ email: email })
//         .then(user => {
//             console.log(user);
//             if (user) {
//                 if (user.password === password && user.category === category) {
//                     res.json("Success")
//                 }
//                 else {
//                     res.json("the password is incorrect or choose correct category");
//                 }
//             }
//             else {
//                 res.json("No record existed")
//             }
//         })


// });



// app.listen(port, () => {

//     console.log(`Server is running on port ${port}`);

// });
