/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['tesseract.js'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.proto']
  },
  output: 'standalone',
  images: {
    domains: ['localhost']
  }
};

export default nextConfig;
