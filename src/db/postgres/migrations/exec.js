import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { pool } from '../client.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const execMigrations = async () => {
  const client = await pool.connect();

  try {
    const migrationFilePath = path.join(__dirname, '01-init.sql');
    const script = fs.readFileSync(migrationFilePath, 'utf8');
    await client.query(script);
    console.log('Migrations executed successfully');
  } catch (error) {
    console.error('Error reading migration file:', error);
  } finally {
    client.release();
  }
};

execMigrations();
