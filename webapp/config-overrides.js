module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    zlib: false,
    http: false,
    https: false,
    crypto: require.resolve("crypto-browserify"),
    stream: false
  };
  return config;
};