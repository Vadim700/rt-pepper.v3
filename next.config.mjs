/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'] //Next.js разрешит использование изображений с этого домена
	},
	// webpack: (config) => {
	// 	config.externals = [...config.externals, "bcrypt"];
	// 	return config;
	// },
};

export default nextConfig;
