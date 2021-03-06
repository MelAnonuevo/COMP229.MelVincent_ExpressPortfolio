// Author: Mel Vincent Anonuevo
// Student ID: 301167069
// Date: Feb 1, 2022

let Inventory = require('../models/inventory');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.list = function(req, res, next) {

    Inventory.find((err, inventoryList) => {
        if(err)
        {
            return console.error(err);
        }
        else{
            // res.render(
            //     'inventory/list', 
            //     { 
            //         title: 'Inventory List',
            //         InventoryList: inventoryList,
            //         userName: req.user ? req.user.username : '' 
            //     }
            // );
            res.status(200).json(inventoryList);
        }
    });
}

// module.exports.displayAddPage = (req, res, next) => {
    
//     let newItem = Inventory();

//     res.render('inventory/add_edit', {
//         title: 'Add a new Item',
//         item: newItem,
//         userName: req.user ? req.user.username : '' 
//     })          
// }

module.exports.processAdd = (req, res, next) => {
    
    let newItem = Inventory({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size_h,
            w: req.body.size_w,
            uom: req.body.size_uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    Inventory.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else
        {
            // refresh the book list
            console.log(item);
            // res.redirect('/inventory/list');
            return res.status(200).json(item);
        }
    });
}


// module.exports.displayEditPage = (req, res, next) => {
//     let id = req.params.id;

//     Inventory.findById(id, (err, itemToEdit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('inventory/add_edit', {
//                 title: 'Edit Item', 
//                 item: itemToEdit,
//                 userName: req.user ? req.user.username : '' 
//             })
//         }
//     });
// }


module.exports.processEdit = (req, res, next) => {
    let id = req.params.id
    
    let updatedItem = Inventory({
        _id: id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size_h,
            w: req.body.size_w,
            uom: req.body.size_uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    console.log(updatedItem);

    Inventory.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).json(
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            // res.redirect('/inventory/list');
            return res.status(200).json(
                { 
                  success: true, 
                  message: 'Item updated successfully.'
                }
            );
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Inventory.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).json(
                { 
                  success: false, 
                  message: getErrorMessage(err)
                }
            );
        }
        else
        {
            // refresh the book list
            // res.redirect('/inventory/list');
            return res.status(200).json(
                { 
                  success: true, 
                  message: 'Item removed successfully.'
                }
            );
        }
    });
}
