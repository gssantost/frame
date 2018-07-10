import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
  secret: 'theseViolentDelightsHaveViolentEnds',
  port: process.env.PORT || 8888,
  baseDir: path.dirname(require.main.filename || process.mainModule.filename),
}

export default config;