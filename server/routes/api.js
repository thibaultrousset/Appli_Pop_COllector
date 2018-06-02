const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const Figure = require('../models/figures');
const db = 'mongodb://thibaultrousset:Vivezidane123!@ds139219.mlab.com:39219/api_piscines'

mongoose.connect(db, err => {
    if (err) {
        console.error('Error !' + err)
    } else {
        console.log('Connected to mangodb')
    }
})
router.get('/', (req, res) => {
    res.send('From api routes')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.error('Error !' + error)
        } else {

            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.error('Error !' + error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else{
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    res.status(200).send(user)
                }    
            }
        }
    })
})


router.get('/figures/:univers', (req, res) => {
    let univers = req.params.univers;
    univers = univers.replace("_", " ");
    if (univers === "All") {
        Figure.find(function (err, figures) {
            if (err) {
                res.send(err);
            }
            res.json(figures);
        });
    } else {
        Figure.find({ univers: univers }, (err, figures) => {
            if (err) {
                res.send(err);
            }
            res.json(figures);
        });
    }
})

router.get('/myFigures/:id', (req, res) => {
    let id = req.params.id;
    Figure.find({ creator: id }, (err, figures) => {
        if (err) {
            res.send(err);
        }
        res.json(figures);
    });
})


router.post('/figures', (req, res) => {
    let id = req.body.user_id;
    console.log(req.body);
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        Figure.findOne({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {
                user.Usercollection.push(figure)
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    // Si tout est ok
                    res.json({ message: 'Bravo, mise à jour des données OK' });
                });
            }
        });
    });

})

router.put('/collection', (req, res) => {
    let id = req.body.user_id;
    console.log(req.body);
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        Figure.findOne({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {

                for (let i = 0; i < user.Usercollection.length; i++) {
                    if (user.Usercollection[i].toString() == figure._id.toString()) {
                        user.Usercollection.splice(i, 1)

                        user.save(function (err) {
                            if (err) {
                                res.send(err);
                            }
                            // Si tout est ok
                            res.json({ message: 'Bravo, mise à jour des données OK' });
                        });
                    }
                }
            };
        });
    });
})


router.put('/myFigures', (req, res) => {
    let id = req.body.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        Figure.findOneAndRemove({ nom: req.body.figure }, (error, figure) => {
            if (error) {
                console.error('Error !')
            } else {
                for (let i = 0; i < user.Usercollection.length; i++) {

                    console.log("toto" + user.Usercollection[i])
                    console.log("toti" + figure._id)

                    if (user.Usercollection[i].toString() == figure._id.toString()) {
                        console.log("toto")
                        user.Usercollection.splice(i, 1)
                        user.save(function (err) {
                            if (err) {
                                res.send(err);
                            }
                            // Si tout est ok
                            res.json({ message: 'Bravo, mise à jour des données OK' });
                        });
                    }
                }
            };
        });
    });
})


router.post('/newFigure', (req, res) => {
    let figureData = req.body
    let figure = new Figure(figureData)
    figure.save((error, addedFigure) => {
        if (error) {
            console.error('Error !' + error)
        } else {
            res.status(200).send(addedFigure)
        }
    })
})


router.post('/updateFigure', (req, res) => {
    let figureData = req.body;
    console.log(figureData)
    Figure.findOne({ nom: figureData.figure_name }, function (err, figure) {
        if (err) {
            console.error('Error !' + err)
        } else {
            figure.nom = figureData.nom;
            figure.picture = figureData.picture;
            figure.univers = figureData.univers;
            figure.price = figureData.price;
        } figure.save((err, addedFigure) => {
            if (err) {
                console.error('Error !' + err)
            } else {
                res.status(200).send(addedFigure)
            }
        })
    })

})


router.get('/collection/:univers/:id', (req, res, next) => {
    let collec = [];
    let sendCollec = [];
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        collec = user.Usercollection;
        if (req.params.univers == "All") {
            for (let i = 0; i < collec.length; i++) {

                Figure.findById(collec[i], (error, figure) => {
                    sendCollec.push(figure);
                    if (sendCollec.length >= collec.length) {
                        res.send(sendCollec);
                    }
                });
            }
        } else {
            for (let i = 0; i < collec.length; i++) {

                Figure.findById(collec[i], (error, figure) => {
                    if (figure.univers == req.params.univers) {
                        sendCollec.push(figure);
                    }
                    if (sendCollec.length >= collec.length) {
                        res.send(sendCollec);
                    }
                });
            }
        }
    });
})


router.post('/profil', (req, res) => {
    let mybody = req.body
    User.findOne({ _id: mybody.user_id }, function (err, user) {
        if (err) {
            res.send(err);
        }
        user.email = mybody.UserData.email;
        user.password = mybody.UserData.password;

        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Bravo, le profil est maintenant stockée en base de données' });
        })
    });
})


router.delete('/profil/:id', (req, res) => {
    User.remove({ _id: req.params.id }, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User was deleted succefsfuly ");
    });
})


module.exports = router;