import type { NextConfig } from "next";

/**
 * Content Security Policy.
 * 'unsafe-inline' em script/style é exigido pelo runtime do Next (hidratação)
 * e pelas animações do Motion; todo o restante fica travado na própria origem.
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * Origens do Google Analytics. Só entram na política quando NEXT_PUBLIC_GA_ID
 * está definido — sem analytics, a CSP continua totalmente fechada na origem.
 */
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const gaScript = gaEnabled ? " https://www.googletagmanager.com" : "";
const gaConnect = gaEnabled
  ? " https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com"
  : "";
const gaImg = gaEnabled
  ? " https://www.google-analytics.com https://*.google-analytics.com"
  : "";

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' apenas em dev: o React usa eval() para debug (source maps,
  // callstacks). Em produção a política permanece sem eval.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${gaScript}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${gaImg}`,
  "font-src 'self'",
  `connect-src 'self'${gaConnect}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
