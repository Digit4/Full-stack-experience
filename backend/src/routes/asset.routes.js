const express = require('express');
const router = express.Router();
const {
  fetchAllAssets,
  fetchAssetById,
  createAsset,
} = require('../controllers/asset.controller');

router.get('/all', fetchAllAssets);
router.get('/:id', fetchAssetById);
router.post('/', createAsset);

module.exports = router;
