const express = require('express');
const router = express.Router();
const {
  fetchAllAssets,
  fetchAssetById,
  createAsset,
  reserveAsset,
} = require('../controllers/asset.controller');

router.get('/all', fetchAllAssets);
router.get('/:id', fetchAssetById);
router.post('/', createAsset);
router.post('/:id/reserve', reserveAsset);

module.exports = router;
