
// I wiil use express
const express = require('express');

// I use express to use the router 
const router = express.Router();

// I import my user model
const User = require('../models/user');

// I will use mongoose
const mongoose = require('mongoose');

// I import my figure model
const Figure = require('../models/figures');

// I set my database with everything I need

const db = 'mongodb://thibaultrousset:Vivezidane123!@ds139219.mlab.com:39219/api_piscines'


// I connect to my database
mongoose.connect(db, err => {
    if (err) {
        console.error('Error !' + err)
    } else {
        console.log('Connected to mangodb')
    }
})

// On the root of my app send back a message
router.get('/', (req, res) => {
    res.send('From api routes')
})


// If I get a post request from the register url I do that
router.post('/register', (req, res) => {
    // I get back the user data sent in the body
    let userData = req.body
    // I set the email to lowercase in database
    userData.email = userData.email.toString().toLowerCase();
    // I create a new User with the data sent with the user model I imported
    let user = new User(userData)
    // I save it in the database
    user.save((error, registeredUser) => {
        if (error) {
            console.error('Error !' + error)
        } else {
            // I send back to the client the user created
            res.status(200).send(registeredUser)
        }
    })
})


// If I get a post request from the login url I do that
router.post('/login', (req, res) => {
    let userData = req.body

    // I found the user with the same email I send in the body in my database
    User.findOne({ email: userData.email.toString().toLowerCase() }, (error, user) => {
        if (error) {
            console.error('Error !' + error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                // if the mail exist I check the password
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    // if everything is ok then I send back to the client the user found
                    res.status(200).send(user)
                }
            }
        }
    })
})

// If I get a get request from the figure url with univers in the url I do that
router.get('/figures/:univers', (req, res) => {
    // I get the univers sent in the url
    let univers = req.params.univers;
    // I test if the univers is All to get all the figures of database
    if (univers === "All") {
        Figure.find(function (err, figures) {
            if (err) {
                res.send(err);
            }// I send back to the client all the figures
            res.json(figures);
        });
    } else {
        // If the univers isn't "All" I find the figures that has the univers send in the url 
        Figure.find({ univers: univers }, (err, figures) => {
            if (err) {
                res.send(err);
            }// I send back to the client all the figures with good univers
            res.json(figures);
        });
    }
})


// If I get a get request from the myFigures url whith an id in the url I do that

router.get('/myFigures/:id', (req, res) => {
    // I get the connected user id sent in the url
    let id = req.params.id;
    // I found the figures with  a creator same as the connected user id
    Figure.find({ creator: id }, (err, figures) => {
        if (err) {
            res.send(err);
        }// I send back to the client the figures
        res.json(figures);
    });
})

// If I get a post request from the figures url I do that
router.post('/figures', (req, res) => {
    // I get the connected user id sent in the body
    let id = req.body.id;
    // I found the user with the id sent in parameter
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        // I found the figure that has the name sent in parameter
        Figure.findOne({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {
                // If I found it I push it in the collection of the user found above
                user.Usercollection.push(figure)
                // I save the changes in my database
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    // Si tout est ok
                    res.json({ message: 'Figure added to user collection' });
                });
            }
        });
    });

})

// If I get a put request from the collection url I do that

router.put('/collection', (req, res) => {
    // I get the connected user id sent in the body
    let id = req.body.id;
    // I found the user with the id sent in parameter
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        // I found the figure that has the name sent in parameter
        Figure.findOne({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {
                // I go through the collection of the user found above
                for (let i = 0; i < user.Usercollection.length; i++) {
                    // If the figure id match the user collection item I remove it from the collection array
                    if (user.Usercollection[i].toString() == figure._id.toString()) {
                        user.Usercollection.splice(i, 1)
                        // I save the changes in my database
                        user.save(function (err) {
                            if (err) {
                                res.send(err);
                            }
                            // Si tout est ok
                            res.json({ message: 'Figure removed from collection' });
                        });
                    }
                }
            };
        });
    });
})


// If I get a put request from the myFigures url I do that

router.put('/myFigures', (req, res) => {
    // I get the connected user id sent in the body
    let id = req.body.id;
    // I found the user with the id sent in parameter
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        // I found the figure that has the name sent in parameter and remove it from my database
        Figure.findOneAndRemove({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {
                // I go through the collection of the user found above
                for (let i = 0; i < user.Usercollection.length; i++) {
                    // If the figure id match the user collection item I remove it from the collection array
                    if (user.Usercollection[i].toString() == figure._id.toString()) {
                        user.Usercollection.splice(i, 1)
                        // I save the changes in my database
                        user.save(function (err) {
                            if (err) {
                                res.send(err);
                            }
                            // Si tout est ok
                            res.json({ message: 'Figure updated' });
                        });
                    }
                }
            };
        });
    });
})


// If I get a post request from the newFigure url I do that

router.post('/newFigure', (req, res) => {
    // I get the parapeters send in the body
    let figureData = req.body;
    // I create a new figure with my model I imported with the datas sent in parapeter
    let figure = new Figure(figureData)
    // I save the figure in my database
    figure.save((error, addedFigure) => {
        if (error) {
            console.error('Error !' + error)
        } else {
            res.status(200).send(addedFigure)
        }
    })
})


// If I get a post request from the updateFigure url I do that

router.post('/updateFigure', (req, res) => {
    // I get the parapeters send in the body
    let figureData = req.body;
    // I found the figure that has the name sent in parameter
    Figure.findOne({ nom: figureData.figure_name }, function (err, figure) {
        if (err) {
            console.error('Error !' + err)
        } else {
            // I reset the values of the figure with the parameters I sent 
            figure.nom = figureData.nom;
            figure.picture = figureData.picture;
            figure.univers = figureData.univers;
            figure.price = figureData.price;
            // I save the changes in my database
        } figure.save((err, addedFigure) => {
            if (err) {
                console.error('Error !' + err)
            } else {
                res.status(200).send(addedFigure)
            }
        })
    })

})


// If I get a get request from the collection url with an id in the url I do that
router.get('/collection/:id', (req, res, next) => {
    // I set an array that will have the figures of the user collection
    let sendCollec = [];
    // I found the user that has the id send in the url
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        // I go through the user collection 
        for (let i = 0; i < user.Usercollection.length; i++) {
            // For each collection item I foud the figure that maches the figure id in my collection
            Figure.findById(Usercollection[i], (error, figure) => {
                // And I push each figure found in the array set above
                sendCollec.push(figure);
                if (sendCollec.length >= Usercollection.length) {
                    // If I got through all the user collection I send back to the client the figure array
                    res.send(sendCollec);
                }
            });
        }
    });
})

// If I get a post request from the profil url I do that

router.post('/profil', (req, res) => {
    // I get the parameters sent in the body
    let userData = req.body
    // I found the user with the id sent in parameter
    User.findOne({ _id: userData.id }, function (err, user) {
        if (err) {
            res.send(err);
        }
        // I reset the user datas with the parameters sent in the body
        user.email = userData.email;
        user.password = userData.password;
        // I save the changes in my database
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'User was updated' });
        })
    });
})

// If I get a delete request from the profil url with an id in the url I do that

router.delete('/profil/:id', (req, res) => {
    // I remove all the figures that has a creator with the id of the user connected
    Figure.remove({ creator: req.params.id }, function (err) {
        if (err) {
            res.send(err);
        } // I remove the user with the id sent in the url from my database
        User.remove({ _id: req.params.id }, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("User was deleted succefsfuly ");
        });
    })
    
})


module.exports = router;