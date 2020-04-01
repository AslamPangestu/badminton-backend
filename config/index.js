const env = process.env;
export {
  URI: `${env.DB_DRIVER}://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`
};
