module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
