// service-finance/routes/sectionRoutes.js

const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.requireAuth, sectionController.getAllSections);
router.get('/:sectionId', authMiddleware.requireAuth, sectionController.getSectionById);
router.post('/', authMiddleware.requireAuth, sectionController.createSection);
router.put('/:sectionId', authMiddleware.requireAuth, sectionController.updateSectionById);
router.delete('/:sectionId', authMiddleware.requireAuth, sectionController.deleteSectionById);

module.exports = router;
