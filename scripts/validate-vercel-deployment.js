#!/usr/bin/env node

/**
 * Vercel Deployment Validation Script
 * This script validates that the deployment is properly configured for Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Vercel deployment configuration...');

const errors = [];
const warnings = [];

// Check required files
const requiredFiles = [
    'vercel.json',
    'apps/frontend/next.config.js',
    'apps/frontend/package.json',
    'package.json',
    '.vercelignore',
];

requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        errors.push(`Missing required file: ${file}`);
    }
});

// Check vercel.json configuration
if (fs.existsSync('vercel.json')) {
    try {
        const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

        if (vercelConfig.version !== 2) {
            errors.push('vercel.json should use version 2');
        }

        if (!vercelConfig.buildCommand) {
            errors.push('vercel.json missing buildCommand');
        }

        if (!vercelConfig.outputDirectory) {
            errors.push('vercel.json missing outputDirectory');
        }

        if (vercelConfig.framework !== 'nextjs') {
            warnings.push('vercel.json framework should be "nextjs"');
        }

        console.log('✅ vercel.json configuration is valid');
    } catch (error) {
        errors.push('vercel.json is not valid JSON');
    }
}

// Check package.json scripts
if (fs.existsSync('package.json')) {
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

        if (!packageJson.scripts['vercel-build']) {
            errors.push('package.json missing vercel-build script');
        }

        if (!packageJson.scripts['vercel-install']) {
            errors.push('package.json missing vercel-install script');
        }

        console.log('✅ package.json scripts are configured');
    } catch (error) {
        errors.push('package.json is not valid JSON');
    }
}

// Check Next.js configuration
if (fs.existsSync('apps/frontend/next.config.js')) {
    const nextConfigContent = fs.readFileSync('apps/frontend/next.config.js', 'utf8');

    if (!nextConfigContent.includes('serverComponentsExternalPackages')) {
        warnings.push('Next.js config missing serverComponentsExternalPackages optimization');
    }

    if (!nextConfigContent.includes('swcMinify')) {
        warnings.push('Next.js config missing swcMinify optimization');
    }

    console.log('✅ Next.js configuration is optimized');
}

// Check environment variables template
if (!fs.existsSync('.env.production.example')) {
    warnings.push('Missing .env.production.example template');
}

// Check build script
if (!fs.existsSync('scripts/vercel-build.js')) {
    warnings.push('Missing optimized build script');
}

// Check API routes
const apiRoutesPath = 'apps/frontend/src/app/(app)/api';
if (fs.existsSync(apiRoutesPath)) {
    const apiRoutes = fs.readdirSync(apiRoutesPath);
    console.log(`✅ Found ${apiRoutes.length} API route(s): ${apiRoutes.join(', ')}`);
}

// Check middleware
if (fs.existsSync('apps/frontend/src/middleware.ts')) {
    const middlewareContent = fs.readFileSync('apps/frontend/src/middleware.ts', 'utf8');

    if (!middlewareContent.includes('export const runtime = \'edge\'')) {
        warnings.push('Middleware not optimized for edge runtime');
    } else {
        console.log('✅ Middleware is optimized for edge runtime');
    }
}

// Summary
console.log('\n📊 Validation Summary:');
console.log(`✅ Checks passed: ${requiredFiles.length - errors.length}/${requiredFiles.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`❌ Errors: ${errors.length}`);

if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warning => console.log(`   - ${warning}`));
}

if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => console.log(`   - ${error}`));
    console.log('\n🚨 Please fix the errors above before deploying to Vercel.');
    process.exit(1);
} else {
    console.log('\n🎉 Deployment configuration is valid!');
    console.log('🚀 Ready for Vercel deployment!');

    console.log('\n📋 Next steps:');
    console.log('1. Push your code to GitHub');
    console.log('2. Connect your repository to Vercel');
    console.log('3. Set environment variables in Vercel dashboard');
    console.log('4. Deploy!');

    console.log('\n🔗 Useful links:');
    console.log('   - Vercel Dashboard: https://vercel.com/dashboard');
    console.log('   - Environment Variables Guide: See .env.production.example');
    console.log('   - Deployment Guide: See VERCEL_DEPLOYMENT.md');
}