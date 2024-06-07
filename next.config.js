/** @type {import('next').NextConfig} */
const nextConfig = {
images:{
  remotePatterns:[{
    hostname:"tokens.1inch.io"
  },{
    hostname:"127.0.0.1"
  }]
}

 
}

module.exports = nextConfig
