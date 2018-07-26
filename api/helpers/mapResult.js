import config from './config';

function mapUrls(data) {
  const { profile_pic, ...rest } = data;
  return { ...rest, profile_pic: config.static + profile_pic };
}

export default { mapUrls };