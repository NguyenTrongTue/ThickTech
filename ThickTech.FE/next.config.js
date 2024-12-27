/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "localhost", "*", "lh3.googleusercontent.com"], // Thêm vào đây các domains mà bạn sử dụng để tải hình ảnh
  },
};

module.exports = nextConfig;
