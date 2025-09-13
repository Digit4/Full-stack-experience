const express = require('express');
const router = express.Router();
const {
  fetchAllAssets,
  fetchAssetById,
  createAsset,
  updateAsset,
  reserveAsset,
  pingAsset,
} = require('../controllers/asset.controller');
const { checkUser } = require('../middlewares/auth');

router.get('/all', fetchAllAssets);
router.get('/:id', fetchAssetById);
router.get('/:id/ping', pingAsset);
router.post('/', checkUser, createAsset);
router.post('/:id/reserve', reserveAsset);
router.put('/:id', checkUser, updateAsset);

module.exports = router;
