# Rajac Admission Portal

A comprehensive admission management system built with React, TypeScript, and Supabase.

## 🚀 Features

- **Student Registration**: Complete admission form with student, parent, and academic information
- **Parent Dashboard**: Real-time application status tracking
- **Admin Panel**: Application management and approval system
- **Multi-language Support**: English and Arabic interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Secure Authentication**: Supabase-powered user management

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Forms**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd rajac-admission-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env.local
```

Update the `.env.local` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=Rajac Admission Portal
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🚀 Deployment on Vercel

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In your Vercel project settings, add the following environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_APP_NAME`
     - `VITE_APP_VERSION`
     - `VITE_ENABLE_ANALYTICS`
     - `VITE_ENABLE_DEBUG_MODE`

3. **Deploy**
   - Vercel will automatically detect the Vite configuration
   - Click "Deploy"

### Method 3: Deploy with Custom Domain

1. **Follow Method 1 or 2 above**

2. **Add Custom Domain**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS records as instructed by Vercel

3. **SSL Certificate**
   - Vercel automatically provides SSL certificates for custom domains

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── locales/            # Internationalization files
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_VERSION` | Application version | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | No |
| `VITE_ENABLE_DEBUG_MODE` | Enable debug mode | No |

## 🔒 Security Considerations

- All Supabase keys are public keys (safe for client-side use)
- Server-side operations are protected by Row Level Security (RLS)
- Environment variables are properly configured for production
- HTTPS is enforced in production

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Rajac School.

## 🆘 Support

For support and questions, please contact the development team.
