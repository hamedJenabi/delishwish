require('dotenv').config();
const {
  BRANCH,
  GRAPHCMSURL,
  GRAPHCMSPROJECTID,
  domain,
  clientId,
  clientSecret,
  scope,
  redirectUri,
  postLogoutRedirectUri,
  cookieSecret,
  BACKEND_URL,
  GRAPHCMS_TOKEN,
  CDNBASE,
  APIURL,
  APIKEY,
} = process.env;

module.exports = {
  publicRuntimeConfig: {
    backend: { BACKEND_URL },
  },
  serverRuntimeConfig: {
    graphcms: {
      BRANCH,
      GRAPHCMSURL,
      GRAPHCMSPROJECTID,
      GRAPHCMS_TOKEN,
      CDNBASE,
      APIURL,
      APIKEY,
    },
    auth: {
      domain,
      clientId,
      clientSecret,
      scope,
      redirectUri,
      postLogoutRedirectUri,
    },
    cookieSecret,
  },
}