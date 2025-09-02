import { NextRequest, NextResponse } from 'next/server';
import { createReadStream, statSync, existsSync } from 'fs';
// @ts-ignore
import mime from 'mime';

// Optimize for Vercel deployment
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
async function* nodeStreamToIterator(stream: any) {
  for await (const chunk of stream) {
    yield chunk;
  }
}
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}
export const GET = (
  request: NextRequest,
  context: {
    params: {
      path: string[];
    };
  }
) => {
  try {
    // Handle Cloudflare storage provider (redirect to external URL)
    if (process.env.STORAGE_PROVIDER === 'cloudflare') {
      const cloudflareUrl = `${process.env.CLOUDFLARE_BUCKET_URL}/${context.params.path.join('/')}`;
      return NextResponse.redirect(cloudflareUrl, 302);
    }

    // Handle local storage
    const filePath =
      process.env.UPLOAD_DIRECTORY + '/' + context.params.path.join('/');

    // Check if file exists
    if (!existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const response = createReadStream(filePath);
    const fileStats = statSync(filePath);
    const contentType = mime.getType(filePath) || 'application/octet-stream';
    const iterator = nodeStreamToIterator(response);
    const webStream = iteratorToStream(iterator);

    return new Response(webStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileStats.size.toString(),
        'Last-Modified': fileStats.mtime.toUTCString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
