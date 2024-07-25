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
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'www.bankrate.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'wallpapers.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'acom.pk',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
