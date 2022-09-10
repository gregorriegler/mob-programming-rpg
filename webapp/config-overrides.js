module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    zlib: false,
    http: false,
    https: false,
    crypto: false,
    stream: false
  };
  return config;
};