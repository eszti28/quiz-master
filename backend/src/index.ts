import app from './app';
import { db } from './data/connection';
import { emailService } from './services/emailService';

const PORT = process.env.PORT || 3000;

db.checkConnection();

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

emailService.sendStartUpEmail();
