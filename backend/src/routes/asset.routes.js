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

router.get('/all', fetchAllAssets);
router.get('/:id', fetchAssetById);
router.get('/:id/ping', pingAsset);
router.post('/', createAsset);
router.post('/:id/reserve', reserveAsset);
router.put('/:id', updateAsset);

module.exports = router;
