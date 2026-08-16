<div align="center">
<img width="1200" height="475" alt="Delivery App Onboarding" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Delivery App Onboarding

A full-stack TypeScript application for managing delivery driver and merchant onboarding flows, powered by Google's Gemini AI API.

**View your app in AI Studio:** https://ai.studio/apps/9066cbb6-d90d-48c6-939a-60e23c04aaee

## Project Structure

```
delivery-app-onboarding/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models & types
│   │   ├── middleware/     # Express middleware
│   │   ├── config/         # Configuration files
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
├── frontend/                # React/Next.js app
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/     # React components
│   │   ├── services/       # API client services
│   │   ├── context/        # React context
│   │   └── types/          # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
└── shared/                  # Shared types & utilities
    ├── types.ts            # Common interfaces
    └── constants.ts        # Shared constants
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Gemini API Key** (get one at [ai.google.dev](https://ai.google.dev))

## Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env.local`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Locally

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Server runs at `http://localhost:3001`

**Terminal 2 - Frontend App:**
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:3000`

## Available Scripts

### Backend
- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm start` — Run production build
- `npm run lint` — Run ESLint

### Frontend
- `npm run dev` — Start Next.js dev server
- `npm run build` — Build for production
- `npm start` — Run production build
- `npm run lint` — Run ESLint

## Features

- **AI-Powered Onboarding:** Gemini API integration for intelligent form assistance
- **Full-Stack TypeScript:** Type-safe development across backend and frontend
- **RESTful API:** Express backend with proper routing and middleware
- **Modern Frontend:** Next.js with React for responsive UI
- **Environment Management:** Secure configuration via `.env.local`

## Onboarding Flows (To Be Implemented)

### Driver Onboarding
- Personal information collection
- Document verification (license, insurance)
- Background check initiation
- Vehicle registration
- Training & agreement acceptance

### Merchant Onboarding
- Business information
- Store setup & menu management
- Payment setup
- Delivery zone configuration
- Integration testing

## API Endpoints (Planned)

```
POST   /api/onboarding/driver        — Start driver onboarding
GET    /api/onboarding/driver/:id    — Get driver onboarding status
PUT    /api/onboarding/driver/:id    — Update driver info

POST   /api/onboarding/merchant      — Start merchant onboarding
GET    /api/onboarding/merchant/:id  — Get merchant onboarding status
PUT    /api/onboarding/merchant/:id  — Update merchant info

POST   /api/ai/assist                — Get AI assistance for forms
POST   /api/ai/verify                — Verify data with AI
```

## Deployment

### Backend (Node.js/Vercel/Railway)
```bash
cd backend
npm run build
npm start
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

## Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ | `AIzaSy...` | API key for Gemini API |
| `PORT` | ❌ | `3001` | Backend server port (default: 3001) |
| `NODE_ENV` | ❌ | `development` | Environment mode |
| `FRONTEND_URL` | ❌ | `http://localhost:3000` | Frontend URL for CORS |
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:3001` | Backend API endpoint |

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in backend/.env.local or kill process on port 3001
kill -9 $(lsof -t -i :3001)
```

**Gemini API Key errors:**
- Verify key is set in `.env.local`
- Check key is valid at [console.cloud.google.com](https://console.cloud.google.com)
- Ensure billing is enabled

**CORS errors:**
- Verify `FRONTEND_URL` matches your frontend URL
- Check `NEXT_PUBLIC_API_URL` matches your backend URL

## Next Steps

1. Implement driver onboarding form components
2. Create merchant onboarding workflow
3. Integrate Gemini API for intelligent form assistance
4. Set up database (PostgreSQL/MongoDB)
5. Add authentication (JWT/OAuth)
6. Implement document upload & verification

## Contributing

Feel free to open issues and pull requests for improvements.

## License

MIT
