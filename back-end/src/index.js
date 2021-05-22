import app from './app';

const port = process.env.PORT || 3000;

const run = async () => {
  app.listen(port, () => console.log(`Running on ${port}`));
};

run().catch(console.error);
