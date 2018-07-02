import dotenv from 'dotenv';

dotenv.config();

const config = {
  secret: 'theseViolentDelightsHaveViolentEnds',
  port: process.env.PORT || 8888
}

export default config;