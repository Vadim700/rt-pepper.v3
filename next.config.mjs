/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'storage.yandexcloud.net'
		] // Next.js разрешит использование изображений с этого домена
	},
};

export default nextConfig;
