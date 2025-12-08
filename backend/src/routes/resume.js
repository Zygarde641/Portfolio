const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /api/resume - Download resume
router.get('/', (req, res) => {
  const resumePath = path.join(__dirname, '../../public/Arjun_Resume.pdf');

  // Check if file exists
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ error: 'Resume not found' });
  }

  // Set headers for download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Arjun_Srivastava_Resume.pdf"');

  // Stream the file
  const fileStream = fs.createReadStream(resumePath);
  fileStream.pipe(res);
});

// GET /api/resume/view - View resume in browser
router.get('/view', (req, res) => {
  const resumePath = path.join(__dirname, '../../public/Arjun_Resume.pdf');

  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ error: 'Resume not found' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="Arjun_Srivastava_Resume.pdf"');

  const fileStream = fs.createReadStream(resumePath);
  fileStream.pipe(res);
});

module.exports = router;
