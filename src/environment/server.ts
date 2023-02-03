import * as envalid from 'envalid';

const environment = envalid.cleanEnv(process.env, {
  API_KEY: envalid.str(),
  AUTH_DOMAIN: envalid.str(),
  PROJECT_ID: envalid.str(),
  STORAGE_BUCKET: envalid.str(),
  MESSAGING_SENDER_ID: envalid.str(),
  APP_ID: envalid.str(),
});

export default environment;
