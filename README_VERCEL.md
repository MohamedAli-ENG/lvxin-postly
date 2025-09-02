# 🚀 Deploy Postiz to Vercel - Complete Guide

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/postiz-app/postiz-app&project-name=postiz-app&repository-name=postiz-app)

## 🎯 What You Get

✅ **All Premium Features Unlocked** - No billing restrictions  
✅ **Unlimited Everything** - Posts, channels, team members  
✅ **AI-Powered Content** - Content and image generation  
✅ **All Social Platforms** - Twitter, LinkedIn, Facebook, Instagram, YouTube, TikTok, and more  
✅ **Team Collaboration** - Full team features  
✅ **Advanced Analytics** - Complete analytics dashboard  
✅ **API & Webhooks** - Full API access  
✅ **Perfect Performance** - Optimized for Vercel  

## 🚀 Quick Deploy (5 Minutes)

### Step 1: One-Click Deploy
Click the deploy button above or use this link:
```
https://vercel.com/new/clone?repository-url=https://github.com/postiz-app/postiz-app
```

### Step 2: Set Environment Variables
In Vercel dashboard, add these **required** variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://username:password@host:port/database
REDIS_URL=redis://username:password@host:port

# Security (Required)
JWT_SECRET=your-super-long-random-string-at-least-32-characters

# URLs (Required - Update after deployment)
FRONTEND_URL=https://your-app.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com

# System (Required)
NODE_ENV=production
IS_GENERAL=true
STORAGE_PROVIDER=cloudflare

# File Storage (Required for Cloudflare R2)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY=your-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_BUCKETNAME=your-bucket-name
CLOUDFLARE_BUCKET_URL=https://your-bucket.r2.cloudflarestorage.com/
```

### Step 3: Deploy!
Click "Deploy" and wait 3-5 minutes. That's it! 🎉

## 📋 Detailed Setup Guide

### Prerequisites
1. **Database**: PostgreSQL (get free at [Neon](https://neon.tech) or [Supabase](https://supabase.com))
2. **Redis**: Redis instance (get free at [Upstash](https://upstash.com))
3. **Storage**: Cloudflare R2 bucket (very cheap, S3-compatible)
4. **GitHub**: Repository access
5. **Vercel**: Free account

### Database Setup

#### Option 1: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. Use as `DATABASE_URL`

#### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Use as `DATABASE_URL`

### Redis Setup

#### Upstash (Recommended)
1. Go to [upstash.com](https://upstash.com)
2. Create free account
3. Create Redis database
4. Copy connection string
5. Use as `REDIS_URL`

### File Storage Setup

#### Cloudflare R2 (Recommended)
1. Go to Cloudflare dashboard
2. Create R2 bucket
3. Generate API tokens
4. Configure CORS for your domain
5. Use credentials in environment variables

### Environment Variables Guide

#### Required Variables
```bash
# Database Connection
DATABASE_URL="postgresql://user:pass@host:5432/db"
REDIS_URL="redis://user:pass@host:6379"

# Security
JWT_SECRET="your-very-long-random-string-make-it-secure"

# Application URLs
FRONTEND_URL="https://your-app.vercel.app"
NEXT_PUBLIC_BACKEND_URL="https://your-backend.com"

# System Configuration
NODE_ENV="production"
IS_GENERAL="true"
STORAGE_PROVIDER="cloudflare"

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_ACCESS_KEY="your-access-key"
CLOUDFLARE_SECRET_ACCESS_KEY="your-secret-key"
CLOUDFLARE_BUCKETNAME="your-bucket-name"
CLOUDFLARE_BUCKET_URL="https://bucket.r2.cloudflarestorage.com/"
```

#### Optional Variables (Social Media APIs)
```bash
# Add these for social media integrations
X_API_KEY="your-twitter-api-key"
X_API_SECRET="your-twitter-api-secret"
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
# ... add others as needed
```

## 🔧 Advanced Configuration

### Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Update `FRONTEND_URL` environment variable

### Email Configuration (Optional)
```bash
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM_ADDRESS="noreply@yourdomain.com"
EMAIL_FROM_NAME="Your App Name"
```

### AI Features (Optional)
```bash
OPENAI_API_KEY="your-openai-api-key"
```

## 🎯 Features Unlocked

### ✅ All Premium Features
- **Unlimited social media channels**
- **Unlimited posts per month**
- **AI content generation**
- **AI image generation**
- **Video generation**
- **Team collaboration (unlimited members)**
- **Advanced analytics**
- **Webhook integrations**
- **Public API access**
- **Custom branding**
- **Priority features**

### ✅ Supported Platforms
- Twitter/X
- LinkedIn
- Facebook
- Instagram
- YouTube
- TikTok
- Pinterest
- Reddit
- Discord
- Slack
- GitHub
- Mastodon
- Threads
- Dribbble

## 🚨 Troubleshooting

### Build Errors
1. Check environment variables are set correctly
2. Ensure database is accessible
3. Verify Redis connection
4. Check Vercel function logs

### Runtime Errors
1. Check `/api/health` endpoint
2. Verify database migrations ran
3. Check file storage configuration
4. Review Vercel function logs

### Performance Issues
1. Enable Vercel Analytics
2. Check function execution times
3. Monitor database performance
4. Consider upgrading Vercel plan

## 📊 Monitoring

### Health Check
Your app includes a health check endpoint:
```
GET /api/health
```

Returns deployment status and feature availability.

### Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance metrics
- Track user engagement
- Review error rates

## 🔄 Updates

### Updating Your Deployment
1. Push changes to GitHub
2. Vercel auto-deploys
3. Monitor deployment status
4. Test new features

### Database Migrations
Run migrations after updates:
```bash
pnpm dlx prisma db push
```

## 💰 Cost Estimation

### Free Tier (Perfect for Testing)
- **Vercel**: Free (100GB bandwidth, 100 function executions/day)
- **Neon**: Free (0.5GB storage, 1 database)
- **Upstash**: Free (10K requests/day)
- **Cloudflare R2**: Free (10GB storage, 1M requests/month)

### Production Tier
- **Vercel Pro**: $20/month (1TB bandwidth, unlimited functions)
- **Neon Pro**: $19/month (10GB storage, multiple databases)
- **Upstash**: $0.2 per 100K requests
- **Cloudflare R2**: $0.015/GB storage, $0.36/million requests

## 🆘 Support

### Getting Help
1. **Health Check**: Visit `/api/health` on your deployment
2. **GitHub Issues**: [Report problems](https://github.com/postiz-app/postiz-app/issues)
3. **Discord**: [Join community](https://discord.gg/postiz)
4. **Documentation**: [Official docs](http://docs.postiz.com/)

### Common Issues
- **Build fails**: Check environment variables
- **Database errors**: Verify connection string
- **File upload issues**: Check Cloudflare R2 setup
- **Social media errors**: Verify API credentials

## 🎉 Success!

Once deployed, you'll have:
- ✅ Full-featured social media management platform
- ✅ All premium features unlocked
- ✅ No billing restrictions
- ✅ Global CDN performance
- ✅ Automatic scaling
- ✅ 99.9% uptime

**Your Postiz deployment is ready to manage unlimited social media content! 🚀**

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

**Happy posting! 📱✨**