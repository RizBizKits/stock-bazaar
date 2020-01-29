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

// Contact routes
router.route('/stocks')
    .get(stockController.index)
    .post(stockController.new);
    router.route('/stocks/:stock_id')
    .get(stockController.view)
    .patch(stockController.update)
    .put(stockController.update)
    .delete(stockController.delete);

// Export API routes
module.exports = router;