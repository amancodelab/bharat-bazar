const express = require('express');
const BannerController = require('../controllers/BannerController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const bannerRouter = express.Router();

bannerRouter.post('/add', adminAuthMiddleware, BannerController.createBanner);
bannerRouter.get("/all", BannerController.fetchBannerAll);

bannerRouter.put('/update/:bannerId', adminAuthMiddleware, BannerController.updateBannerById);

bannerRouter.delete('/delete/:bannerId', adminAuthMiddleware, BannerController.deleteBannerById);

bannerRouter.get('/:bannerId', BannerController.fetchBannerById);


module.exports = bannerRouter;