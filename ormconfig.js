module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || 'dist/model/**/*.js'],
  migrations: [process.env.TYPEORM_MIGRATIONS || 'dist/database/magrations/**/*.js'],
  subscribers: [process.env.TYPEORM_SUBSCRIBES || 'dist/subscribers/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
