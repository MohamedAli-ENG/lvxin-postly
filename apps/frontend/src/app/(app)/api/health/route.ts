import { NextRequest, NextResponse } from 'next/server';

// Optimize for Vercel deployment
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            environment: process.env.NODE_ENV,
            deployment: {
                platform: 'vercel',
                region: process.env.VERCEL_REGION || 'unknown',
                billingDisabled: true,
                premiumFeaturesUnlocked: true,
                storageProvider: process.env.STORAGE_PROVIDER || 'cloudflare',
            },
            features: {
                billing: false,
                premiumFeatures: true,
                aiGeneration: true,
                unlimitedPosts: true,
                unlimitedChannels: true,
                teamCollaboration: true,
                analytics: true,
                webhooks: true,
                publicApi: true,
            },
        };

        return NextResponse.json(healthData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                error: 'Health check failed',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}