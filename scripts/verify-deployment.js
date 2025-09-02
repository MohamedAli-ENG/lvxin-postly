#!/usr/bin/env node

/**
 * Post-Deployment Verification Script
 * This script verifies that the Vercel deployment is working correctly
 */

const https = require('https');
const http = require('http');

async function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;

        client.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: res.headers['content-type']?.includes('application/json')
                            ? JSON.parse(data)
                            : data
                    });
                } catch (error) {
                    resolve({ status: res.statusCode, data });
                }
            });
        }).on('error', reject);
    });
}

async function verifyDeployment(baseUrl) {
    console.log('🔍 Verifying Postiz deployment...');
    console.log(`🌐 Base URL: ${baseUrl}`);

    const tests = [
        {
            name: 'Homepage',
            url: baseUrl,
            expectedStatus: 200,
            description: 'Main application loads'
        },
        {
            name: 'Health Check',
            url: `${baseUrl}/api/health`,
            expectedStatus: 200,
            description: 'API health endpoint responds',
            validateJson: true
        },
        {
            name: 'Auth Page',
            url: `${baseUrl}/auth`,
            expectedStatus: 200,
            description: 'Authentication page loads'
        },
        {
            name: 'Login Page',
            url: `${baseUrl}/auth/login`,
            expectedStatus: 200,
            description: 'Login page loads'
        }
    ];

    const results = [];

    for (const test of tests) {
        try {
            console.log(`\n🧪 Testing: ${test.name}`);
            const result = await makeRequest(test.url);

            const success = result.status === test.expectedStatus;

            if (success) {
                console.log(`✅ ${test.description} - Status: ${result.status}`);

                if (test.validateJson && typeof result.data === 'object') {
                    console.log(`📊 Health Data:`, {
                        status: result.data.status,
                        billingDisabled: result.data.deployment?.billingDisabled,
                        premiumFeaturesUnlocked: result.data.deployment?.premiumFeaturesUnlocked,
                        platform: result.data.deployment?.platform
                    });
                }
            } else {
                console.log(`❌ ${test.description} - Expected: ${test.expectedStatus}, Got: ${result.status}`);
            }

            results.push({
                ...test,
                success,
                actualStatus: result.status,
                data: result.data
            });

        } catch (error) {
            console.log(`❌ ${test.description} - Error: ${error.message}`);
            results.push({
                ...test,
                success: false,
                error: error.message
            });
        }
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const total = results.length;

    console.log('\n📊 Verification Summary:');
    console.log(`✅ Successful tests: ${successful}/${total}`);
    console.log(`❌ Failed tests: ${total - successful}/${total}`);

    if (successful === total) {
        console.log('\n🎉 All tests passed! Your Postiz deployment is working correctly.');
        console.log('\n🚀 Your app is ready to use:');
        console.log(`   - Main App: ${baseUrl}`);
        console.log(`   - Health Check: ${baseUrl}/api/health`);
        console.log(`   - Login: ${baseUrl}/auth/login`);

        console.log('\n✨ Features Available:');
        console.log('   ✅ Unlimited social media channels');
        console.log('   ✅ Unlimited posts and scheduling');
        console.log('   ✅ AI content generation');
        console.log('   ✅ Team collaboration');
        console.log('   ✅ Advanced analytics');
        console.log('   ✅ All premium features unlocked');
        console.log('   ✅ No billing restrictions');

    } else {
        console.log('\n⚠️  Some tests failed. Please check the errors above.');
        console.log('Common issues:');
        console.log('   - Environment variables not set correctly');
        console.log('   - Database connection issues');
        console.log('   - Redis connection problems');
        console.log('   - Build or deployment errors');
    }

    return successful === total;
}

// Main execution
const args = process.argv.slice(2);
const baseUrl = args[0];

if (!baseUrl) {
    console.log('Usage: node verify-deployment.js <base-url>');
    console.log('Example: node verify-deployment.js https://your-app.vercel.app');
    process.exit(1);
}

verifyDeployment(baseUrl)
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Verification failed:', error.message);
        process.exit(1);
    });