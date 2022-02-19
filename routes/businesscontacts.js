let express = require('express');
let router = express.Router();
let businesscontactsController = require('../controllers/businesscontacts');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
         //req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

router.get('/list', requireAuth,  businesscontactsController.list);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, businesscontactsController.displayAddPage);
/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, businesscontactsController.processAddPage);

// Routers for edit
router.get('/edit/:id', requireAuth, businesscontactsController.displayEditPage);
router.post('/edit/:id', requireAuth, businesscontactsController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, businesscontactsController.performDelete);

module.exports = router;