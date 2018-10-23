const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Contact = require('../models/contact');

const methodOverride = require('method-override');
router.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg) {
    err.message =`${err.message} ${msg}`;
    err.status = res.statusCode;
    res.json(err);
}

// READY to build our API
router.route('/')
    // GET all contacts
    .get((req, res, next) => {
        Contact.find({}, (err, contacts) => {
            if (err) {
                handleError(err, res, 'Could not find any contacts.');
                return;
            } else {
                res.json(contacts);
            }
        });
    })
    // POST new contact
    .post((req, res) => {
        Contact.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            homePhone: req.body.homePhone,
            cellPhone: req.body.cellPhone,
            birthDay: req.body.birthDay,
            website: req.body.website,
            address: req.body.address
        }, (err, contact) => {
            if (err) {
                handleError(err, res, 'Error creating contact.');
                return;
            } else {
                res.json(contact);
            }
        });
    });

/*  [Middleware] Define function to use as middleware.
    Should do some ID validation without querying DB.
*/


router.route('/:id')
    // GET a contact by id
    /*  [Middleware] Use containsId middleware */
    .get((req, res) => {
        Contact.findById(req.id, (err, contact) => {
            if (err) {
                res.status(404);
                handleError(err, res, 'GET error, problem retrieving data');
            } else {
                res.json(contact);
            }
        });
    })
    // UPDATE a contact by id
    /*  [Middleware] Use containsId middleware in this
        new version of update that queries the database once. 
        Introduces null values in database.
    */
    .put((req, res) => {
        Contact.findOneAndUpdate(
            {_id: req.id}, 
            {$set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                homePhone: req.body.homePhone,
                cellPhone: req.body.cellPhone,
                birthDay: req.body.birthDay,
                website: req.body.website,
                address: req.body.address
            }}, 
            // update multiple fields, return updated document in response
            {multi:true,new:true} 
        )
            .exec((err, person) => {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem updating contact');
                } else {
                    res.json(person);
                }
            });
    })

    // DELETE a contact by id
    /*  [Middleware] Use containsId middleware */
    .delete((req, res) => {
        Contact.findByIdAndRemove(req.id)
            .exec((err) => {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem deleting contact');
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
    });

module.exports = router;