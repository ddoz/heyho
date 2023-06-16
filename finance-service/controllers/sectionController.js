const SectionModel = require('../models/sectionModel');

// Create a new section
const createSection = async (req, res) => {
  try {
    const { name } = req.body;

    const createdBy = req.userId; // Assuming you have the authenticated user's ID

    await SectionModel.createSection(name, createdBy);

    res.status(201).json({ message: 'Section created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create section', error: error.message });
  }
};

// Get all sections (including soft-deleted ones)
const getAllSections = async (req, res) => {
  try {
    const sections = await SectionModel.getAllSections();

    res.json({ sections });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sections', error: error.message });
  }
};

// Get a specific section by ID
const getSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await SectionModel.getSectionById(sectionId);

    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json({ section });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch section', error: error.message });
  }
};

// Update a section by ID
const updateSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { name } = req.body;

    const updatedBy = req.userId; // Assuming you have the authenticated user's ID

    const section = await SectionModel.getSectionById(sectionId);

    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await SectionModel.updateSectionById(sectionId, name, updatedBy);

    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update section', error: error.message });
  }
};

// Delete a section by ID (soft delete)
const deleteSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deletedBy = req.userId; // Assuming you have the authenticated user's ID

    const section = await SectionModel.getSectionById(sectionId);

    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await SectionModel.deleteSectionById(sectionId, deletedBy);

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete section', error: error.message });
  }
};

module.exports = {
  createSection,
  getAllSections,
  getSectionById,
  updateSectionById,
  deleteSectionById
};
