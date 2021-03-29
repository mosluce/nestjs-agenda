export default () => ({
  db: {
    url: process.env.MONGODB_URL,
    collection: process.env.MONGODB_COLLECTION,
  },
});
