module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || './dist/models/**/*.js'],
  migrations: [process.env.TYPEORM_MIGRATIONS || './dist/models/**/*.js'],
  subscribers: [process.env.TYPEORM_SUBSCRIBES || './dist/subscribers/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDIR: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
