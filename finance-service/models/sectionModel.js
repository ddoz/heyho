const db = require('../db');

// Create a new section
const createSection = (name, createdBy) => {
  return db.query('INSERT INTO sections (name, created_by) VALUES (?, ?)', [name, createdBy]);
};

// Get all sections (including soft-deleted ones)
const getAllSections = () => {
  return db.query('SELECT * FROM sections');
};

// Get a specific section by ID
const getSectionById = (sectionId) => {
  return db.query('SELECT * FROM sections WHERE id = ?', [sectionId]);
};

// Update a section by ID
const updateSectionById = (sectionId, name, updatedBy) => {
  return db.query('UPDATE sections SET name = ?, updated_by = ? WHERE id = ?', [name, updatedBy, sectionId]);
};

// Delete a section by ID (soft delete)
const deleteSectionById = (sectionId, deletedBy) => {
  return db.query('UPDATE sections SET deleted = 1, deleted_by = ? WHERE id = ?', [deletedBy, sectionId]);
};

module.exports = {
  createSection,
  getAllSections,
  getSectionById,
  updateSectionById,
  deleteSectionById
};
