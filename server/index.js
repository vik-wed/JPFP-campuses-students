const port = process.env.PORT || 3000;
const app = require("./app");
const seedDb = require("./seed");

// this function calls the seed function established in seed.js, which seeds the database, in this case because this file is our start-server entrypoint it will automatically be called every time the page loads
const syncAndSeed = async () => {
  await seedDb.seed();
  app.listen(port, () => console.log(`listening on port ${port}`));
};

syncAndSeed();
