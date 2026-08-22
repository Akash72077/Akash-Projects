import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Disk Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `evidence-${uniqueSuffix}${ext}`);
  },
});

// File validation filter
function checkFileType(file, cb) {
  if (!file.originalname || !path.extname(file.originalname)) {
    const mimeExt = (file.mimetype || '').split('/')[1] || 'jpg';
    const safeExt = ['jpeg', 'jpg', 'png', 'webp', 'gif'].includes(mimeExt) ? mimeExt : 'jpg';
    file.originalname = `evidence.${safeExt === 'jpeg' ? 'jpg' : safeExt}`;
  }

  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP, GIF) are allowed'));
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB maximum file size
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});
