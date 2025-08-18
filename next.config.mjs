/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,  
  images:{     
    domains : [
      "images.pexels.com",
      "google.com",
      "localhost",
      "127.0.0.1",
      "teamwebdevelopers.com"
    ]
  },
  env:{    
    APP_PREFIX: process.env.APP_PREFIX,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    APP_URL: process.env.APP_URL,   
    API_URL: process.env.API_URL,  
    FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
    FILE_UPLOAD_URL: process.env.FILE_UPLOAD_URL,    
    RECAPTCHAV2_SITEKEY: process.env.RECAPTCHAV2_SITEKEY,
    RECAPTCHAV2_SECRET: process.env.RECAPTCHAV2_SECRET,
  },
  devIndicators: false && {
    position : 'bottom-left',  // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  }, 
  eslint: {
    ignoreDuringBuilds: true, // for ignore build error validation
  }, 
  //=== add this for cors header ===
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",  
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  
};

export default nextConfig;
