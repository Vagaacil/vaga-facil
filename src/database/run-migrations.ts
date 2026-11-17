import { appDataSource } from '../config/data-source.js';

const run = async (): Promise<void> => {
  try {
    await appDataSource.initialize();
    await appDataSource.runMigrations();
    console.log('Migrations executed successfully.');
  } catch (error) {
    console.error('Failed to run TypeORM migrations.', error);
    process.exitCode = 1;
  } finally {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  }
};

void run();
