# 🚀 Postiz Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public or you have Vercel Pro for private repos
- [ ] All sensitive data is removed from code
- [ ] `.env` files are not committed to repository

### 2. Database Setup
- [ ] PostgreSQL database is created and accessible
- [ ] Database connection string is ready
- [ ] Database allows connections from Vercel IPs (0.0.0.0/0 for simplicity)
- [ ] Database has sufficient storage and connection limits

### 3. Redis Setup
- [ ] Redis instance is created and accessible
- [ ] Redis connection string is ready
- [ ] Redis allows connections from Vercel IPs

### 4. File Storage Setup
- [ ] Cloudflare R2 bucket is created (recommended)
- [ ] Cloudflare API credentials are ready
- [ ] Bucket is configured for public read access
- [ ] CORS is configured for your domain

### 5. Environment Variables Prepared
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `REDIS_URL` - Redis connection string  
- [ ] `JWT_SECRET` - Long random string (32+ characters)
- [ ] `FRONTEND_URL` - Your Vercel app URL
- [ ] `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- [ ] `CLOUDFLARE_*` variables - File storage credentials
- [ ] `IS_GENERAL="true"` - Required system setting
- [ ] Social media API keys (optional)
- [ ] `OPENAI_API_KEY` (optional, for AI features)

## 🔧 Deployment Steps

### 1. Vercel Project Setup
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "New Project"
- [ ] Import your repository
- [ ] Vercel detects Next.js framework automatically

### 2. Configure Build Settings
- [ ] Framework Preset: **Next.js**
- [ ] Build Command: `pnpm run vercel-build` (auto-detected)
- [ ] Output Directory: `apps/frontend/.next` (auto-detected)
- [ ] Install Command: `pnpm run vercel-install` (auto-detected)

### 3. Environment Variables
- [ ] Add all required environment variables in Vercel dashboard
- [ ] Set `NODE_ENV=production`
- [ ] Set `IS_GENERAL=true`
- [ ] Set `STORAGE_PROVIDER=cloudflare`
- [ ] Verify all variables are correctly formatted

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (usually 3-5 minutes)
- [ ] Check build logs for any errors

## 🧪 Post-Deployment Testing

### 1. Basic Functionality
- [ ] App loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard is accessible

### 2. Database Connection
- [ ] User data is saved correctly
- [ ] Posts can be created
- [ ] Data persists between sessions

### 3. File Upload
- [ ] Images can be uploaded
- [ ] Files are accessible via URL
- [ ] File storage is working correctly

### 4. Social Media Integration
- [ ] Social media accounts can be connected
- [ ] Posts can be scheduled
- [ ] Posts are published correctly

### 5. AI Features (if enabled)
- [ ] AI content generation works
- [ ] Image generation works (if configured)
- [ ] No billing restrictions are present

## 🔍 Troubleshooting Common Issues

### Build Failures
- [ ] Check Node.js version compatibility (20.x required)
- [ ] Verify all dependencies are installed
- [ ] Check for TypeScript errors
- [ ] Ensure Prisma schema is valid

### Runtime Errors
- [ ] Verify database connection string
- [ ] Check Redis connectivity
- [ ] Validate environment variables
- [ ] Review Vercel function logs

### Performance Issues
- [ ] Monitor Vercel Analytics
- [ ] Check function execution times
- [ ] Optimize database queries
- [ ] Consider upgrading Vercel plan

### File Upload Issues
- [ ] Verify Cloudflare R2 credentials
- [ ] Check bucket permissions
- [ ] Validate CORS configuration
- [ ] Test file upload endpoints

## 📊 Monitoring & Maintenance

### 1. Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Configure error tracking (Sentry is pre-configured)
- [ ] Set up uptime monitoring
- [ ] Monitor database performance

### 2. Regular Maintenance
- [ ] Update dependencies regularly
- [ ] Monitor database storage usage
- [ ] Review and rotate API keys
- [ ] Backup database regularly

### 3. Scaling Considerations
- [ ] Monitor function execution limits
- [ ] Consider database connection pooling
- [ ] Plan for increased storage needs
- [ ] Evaluate Vercel plan upgrades

## 🆘 Getting Help

If you encounter issues:

1. **Check Logs**: Vercel Dashboard → Functions → View Logs
2. **GitHub Issues**: [Postiz Issues](https://github.com/postiz-app/postiz-app/issues)
3. **Discord**: [Join Community](https://discord.gg/postiz)
4. **Documentation**: [Postiz Docs](http://docs.postiz.com/)

## 🎉 Success Criteria

Your deployment is successful when:

- [ ] ✅ App loads without errors
- [ ] ✅ Users can register and login
- [ ] ✅ Social media accounts can be connected
- [ ] ✅ Posts can be created and scheduled
- [ ] ✅ All premium features are accessible (no billing restrictions)
- [ ] ✅ File uploads work correctly
- [ ] ✅ AI features work (if configured)
- [ ] ✅ No console errors in browser
- [ ] ✅ Database operations work correctly

---

**🎊 Congratulations!** You've successfully deployed Postiz to Vercel with all premium features unlocked!