// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var stockController = require('../controllers/appController');
var shareController = require('../controllers/shareController');

// Contact routes
router.route('/stocks')
    .get(stockController.index)
    // .post(stockController.new);

router.route('/stocks/:stock_id')
.get(stockController.view)
.patch(stockController.update)
.put(stockController.update)
.delete(stockController.delete);

router.route('/updated')
    .patch(stockController.update_vol);

router.route('/share/test')
    .post(shareController.add_new_share)
    .get(shareController.view_all_shares); 


router.route('/shares').get(shareController.view_all_shares);   

// Export API routes
module.exports = router;