import { NextRequest, NextResponse } from 'next/server';
import { db } from './src/utils';

export const config = {
  matcher: ['/'],
};

export default async function middleware(req: NextRequest) {
  console.log('Middleware Intercepted');
  const url = req.nextUrl;

  const hostname = req.headers.get('host');

  const slug =
    db.find((site) => site.domain.includes(hostname))?.slug ?? 'root';

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (url.pathname.startsWith(`/_sites`)) {
    url.pathname = `/404`;
  } else {
    // rewrite to the current subdomain under the pages/sites folder
    url.pathname = `/_sites/${slug}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
