module.exports = {
  HOST: "ep-wild-cake-a8gy3ia5-pooler.eastus2.azure.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_zkLAnV3fDl0w",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};