#!/bin/bash

# Postiz Vercel Deployment Script
echo "🚀 Preparing Postiz for Vercel deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm run prisma-generate

# Build the frontend
echo "🏗️ Building frontend..."
cd apps/frontend
pnpm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for Vercel deployment."
    echo ""
    echo "📋 Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Vercel"
    echo "3. Set the following environment variables in Vercel:"
    echo "   - DATABASE_URL (PostgreSQL connection string)"
    echo "   - REDIS_URL (Redis connection string)"
    echo "   - JWT_SECRET (random string)"
    echo "   - FRONTEND_URL (your Vercel domain)"
    echo "   - NEXT_PUBLIC_BACKEND_URL (your backend API URL)"
    echo "   - CLOUDFLARE_* variables (for file storage)"
    echo "   - Social media API keys (optional)"
    echo "4. Deploy!"
    echo ""
    echo "🔗 For detailed configuration: http://docs.postiz.com/configuration/reference"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi