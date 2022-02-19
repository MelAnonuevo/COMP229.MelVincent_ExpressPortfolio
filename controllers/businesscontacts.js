// Author: Mel Vincent Anonuevo
// Student ID: 301167069
// Date: Feb 1, 2022

let BusinessContacts = require('../models/businesscontacts');

exports.list = function(req, res, next) {

    BusinessContacts.find((err, businesscontactsList) => {
            //sort contact by name
            businesscontactsList.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA < nameB){
                    return -1
                }
                if (nameA > nameB){
                    return 1
                }
                return 0
            
        })
        if(err)
        {
            return console.error(err);
        }
        else{
            res.render(
                'businesscontacts/list', 
                { 
                    title: 'Business Contacts List',
                    BusinessContactsList: businesscontactsList,
                    userName: req.user ? req.user.username : ''
                }
            );
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    
    let newItem = BusinessContacts();

    res.render('businesscontacts/add_edit', {
        title: 'Add new Contact',
        item: newItem,
        userName: req.user ? req.user.username : '' 
    })          
}

module.exports.processAddPage = (req, res, next) => {
    
    let newItem = BusinessContacts({
         "_id": req.body.id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    BusinessContacts.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/businesscontacts/list');
        }
    });
}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businesscontacts/add_edit', {
                title: 'Edit Item', 
                item: itemToEdit,
                userName: req.user ? req.user.username : '' 
            })
        }
    });
}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedItem = BusinessContacts({
        "_id": req.body.id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    // console.log(updatedItem);

    BusinessContacts.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/businesscontacts/list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/businesscontacts/list');
        }
    });
}
