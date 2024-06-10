/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
