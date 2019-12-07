const { withPlugins, optional } = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const typescript = require("@zeit/next-typescript");

const images = require("next-images");

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT
} = require("next-server/constants");

module.exports = withPlugins([
  [
    sass,
    {
      cssLoaderOptions: {
        localIdentName: "[local]___[hash:base64:5]"
      },
      [PHASE_PRODUCTION_BUILD + PHASE_EXPORT]: {
        cssLoaderOptions: {
          localIdentName: "[hash:base64:8]"
        }
      }
    }
  ],
  typescript,
  images
]);
