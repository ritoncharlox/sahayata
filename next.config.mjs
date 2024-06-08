/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
