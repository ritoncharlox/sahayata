/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img-s-msn-com.akamaized.net',
                port: '',
            },
        ],
    },
};

export default nextConfig;
