/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{hostname:'tokens.1inch.io'},{hostname:"d23exngyjlavgo.cloudfront.net"},{hostname:"seeklogo.com"}]
    }
};

export default nextConfig;
