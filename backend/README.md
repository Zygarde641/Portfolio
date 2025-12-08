# Portfolio Backend

Express.js API server for the portfolio website.

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev

# Run production server
npm start
```

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form

### GitHub
- `GET /api/github/repos` - Fetch repositories
- `GET /api/github/user` - Fetch user info
- `GET /api/github/stats` - Fetch statistics

### Resume
- `GET /api/resume` - Download resume
- `GET /api/resume/view` - View resume in browser

## Environment Variables

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=Zygarde641
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_email@gmail.com
```

## Deployment on Render

1. Create new Web Service
2. Connect GitHub repository
3. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy
