import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, 'test.env');

dotenv.config({ path:envPath });

console.log('Environment variables loaded for testing:', process.env);