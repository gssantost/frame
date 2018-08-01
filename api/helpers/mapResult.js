import config from './config';

function mapUrls(data) {
  const { profile_pic, ...rest } = data;
  return { ...rest, profile_pic: config.static + profile_pic };
}

function mapMedia(data) {
  const { media_url, ...rest } = data;
  return { ...rest, media_url: config.static + media_url };
}

export default { mapUrls, mapMedia };