#!/usr/bin/env node

/**
 * Vercel Build Optimization Script
 * This script optimizes the build process for Vercel deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel-optimized build process...');

// Set environment variables for build
process.env.NODE_ENV = 'production';
process.env.IS_GENERAL = 'true';
process.env.SKIP_ENV_VALIDATION = 'true';

try {
    // Step 1: Generate Prisma client
    console.log('📦 Generating Prisma client...');
    execSync('pnpm run prisma-generate', { stdio: 'inherit' });

    // Step 2: Build frontend
    console.log('🏗️ Building frontend application...');
    process.chdir('apps/frontend');
    execSync('pnpm run build', { stdio: 'inherit' });

    // Step 3: Optimize build output
    console.log('⚡ Optimizing build output...');

    // Create a build info file
    const buildInfo = {
        buildTime: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        vercelOptimized: true,
        billingDisabled: true,
        premiumFeaturesUnlocked: true
    };

    fs.writeFileSync('.next/build-info.json', JSON.stringify(buildInfo, null, 2));

    console.log('✅ Build completed successfully!');
    console.log('📊 Build statistics:');
    console.log(`   - Build time: ${buildInfo.buildTime}`);
    console.log(`   - Node version: ${buildInfo.nodeVersion}`);
    console.log(`   - Platform: ${buildInfo.platform}`);
    console.log(`   - Billing disabled: ${buildInfo.billingDisabled}`);
    console.log(`   - Premium features: ${buildInfo.premiumFeaturesUnlocked}`);

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}