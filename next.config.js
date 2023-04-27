const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  pwa:{
    des:"public",
    register:true,
    skipWaiting:true
  }
})

/* const nextConfig = 

module.exports = nextConfig */
