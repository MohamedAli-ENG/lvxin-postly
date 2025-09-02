# Postiz Vercel Deployment Guide

This guide will help you deploy Postiz to Vercel with all billing features disabled and all premium features unlocked.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/postiz-app)

## 📋 Prerequisites

1. **Database**: PostgreSQL database (recommended: [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [PlanetScale](https://planetscale.com/))
2. **Redis**: Redis instance (recommended: [Upstash](https://upstash.com/))
3. **File Storage**: Cloudflare R2 or local storage
4. **GitHub Account**: For repository hosting
5. **Vercel Account**: For deployment

## 🛠️ Setup Instructions

### 1. Prepare Your Repository

1. Fork or clone this repository
2. Push to your GitHub account

### 2. Database Setup

Create a PostgreSQL database and get the connection string:
```
postgresql://username:password@host:port/database
```

### 3. Redis Setup

Create a Redis instance and get the connection string:
```
redis://username:password@host:port
```

### 4. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`

### 5. Environment Variables

Set these required environment variables in Vercel:

#### **Required Variables**
```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"
REDIS_URL="redis://username:password@host:port"

# Security
JWT_SECRET="your-long-random-string-here"

# URLs (replace with your actual Vercel domain)
FRONTEND_URL="https://your-app.vercel.app"
NEXT_PUBLIC_BACKEND_URL="https://your-backend-api.com"
BACKEND_INTERNAL_URL="https://your-backend-api.com"

# File Storage
STORAGE_PROVIDER="cloudflare"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_ACCESS_KEY="your-access-key"
CLOUDFLARE_SECRET_ACCESS_KEY="your-secret-access-key"
CLOUDFLARE_BUCKETNAME="your-bucket-name"
CLOUDFLARE_BUCKET_URL="https://your-bucket-url.r2.cloudflarestorage.com/"
CLOUDFLARE_REGION="auto"

# System
IS_GENERAL="true"
NODE_ENV="production"
```

#### **Optional Variables**
```bash
# Email (for user activation)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM_ADDRESS="noreply@yourdomain.com"
EMAIL_FROM_NAME="Your App Name"

# Social Media APIs (add as needed)
X_API_KEY="your-x-api-key"
X_API_SECRET="your-x-api-secret"
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
# ... add other social media APIs as needed

# AI Features
OPENAI_API_KEY="your-openai-api-key"
```

### 6. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-app.vercel.app`

## 🎯 Features Unlocked

With billing disabled, all users get access to:

- ✅ **Unlimited social media channels**
- ✅ **Unlimited posts per month**
- ✅ **AI-powered content generation**
- ✅ **Team collaboration features**
- ✅ **Advanced analytics**
- ✅ **Auto-posting and scheduling**
- ✅ **Video generation**
- ✅ **Image generation**
- ✅ **Public API access**
- ✅ **Webhooks**
- ✅ **All premium features**

## 🔧 Configuration Notes

### Backend API
Since this is a frontend-only deployment, you'll need to deploy the backend separately or use a different service. Consider:

1. **Railway**: Easy Node.js deployment
2. **Render**: Free tier available
3. **DigitalOcean App Platform**: Scalable option
4. **AWS/GCP/Azure**: Enterprise options

### File Storage
- **Cloudflare R2**: Recommended for production (S3-compatible, cheaper)
- **Local Storage**: Only for development/testing

### Database Migrations
Run database migrations after deployment:
```bash
pnpm dlx prisma db push --schema ./libraries/nestjs-libraries/src/database/prisma/schema.prisma
```

## 🐛 Troubleshooting

### Build Errors
1. Check that all environment variables are set
2. Ensure database is accessible
3. Verify Prisma schema is valid

### Runtime Errors
1. Check Vercel function logs
2. Verify database connection
3. Check Redis connectivity

### Performance Issues
1. Enable Vercel Analytics
2. Monitor function execution times
3. Consider upgrading Vercel plan for better performance

## 📚 Additional Resources

- [Postiz Documentation](http://docs.postiz.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## 🆘 Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/postiz-app/postiz-app/issues)
2. Join the [Discord Community](https://discord.gg/postiz)
3. Review the [Documentation](http://docs.postiz.com/)

---

**Note**: This deployment configuration has billing completely disabled, making all premium features free for all users. This is perfect for self-hosting or providing a free service to your users.