import { NextRequest, NextResponse } from 'next/server';
import { getMediaUrl } from '@/lib/media';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const rawUrl = searchParams.get('url');

  let targetUrl = '';
  if (path) {
    targetUrl = getMediaUrl(path);
  } else if (rawUrl) {
    // Only allow fetching from Firebase Storage or local paths for security
    if (
      rawUrl.startsWith('https://firebasestorage.googleapis.com/') ||
      rawUrl.startsWith('https://pub-2e9ba426189547d286d9a9f2f8fb7928.r2.dev/')
    ) {
      targetUrl = rawUrl;
    } else {
      targetUrl = getMediaUrl(rawUrl);
    }
  }

  if (!targetUrl) {
    return new NextResponse('Missing path or url query parameter', { status: 400 });
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        // Forward Range headers if requested by audio elements
        ...(request.headers.get('range') ? { range: request.headers.get('range')! } : {}),
      },
    });

    if (!upstreamRes.ok) {
      return new NextResponse(`Upstream media fetch failed with status ${upstreamRes.status}`, {
        status: upstreamRes.status,
      });
    }

    const contentType =
      upstreamRes.headers.get('content-type') ||
      (targetUrl.endsWith('.mp3')
        ? 'audio/mpeg'
        : targetUrl.endsWith('.png')
        ? 'image/png'
        : targetUrl.endsWith('.jpg') || targetUrl.endsWith('.jpeg')
        ? 'image/jpeg'
        : 'application/octet-stream');

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');

    if (upstreamRes.headers.get('content-length')) {
      headers.set('Content-Length', upstreamRes.headers.get('content-length')!);
    }
    if (upstreamRes.headers.get('content-range')) {
      headers.set('Content-Range', upstreamRes.headers.get('content-range')!);
    }

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      headers,
    });
  } catch (error) {
    console.error('Media proxy error:', error);
    return new NextResponse('Error streaming media file', { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
    },
  });
}
