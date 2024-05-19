import { connect } from '../src/model/connection.js';
import app from './index.js';
const { MONGO_URI } = process.env;
const { PORT } = process.env || 4000;

connect(MONGO_URI)
  .then(() => {
    console.log('connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err.message, err);
    console.log('Something went wrong', err);
  });
