import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import withAuth from "./Middleware/withAuth";

const baseMiddleware = async () => {
    return NextResponse.next();
};

const requireAuthPaths: string[] = ["/admin", "/editor"];

export default withAuth(baseMiddleware, requireAuthPaths);

export const config = {
    matcher: ["/admin", "/admin/:path*", "/editor", "/editor/:path*"],
}