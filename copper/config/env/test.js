'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-test',
  http: {
    port: 3001
  },
  aggregate: false,
  assets: {
    hash: false
  },
  logging: {
    format: 'common'
  },
  app: {
    name: 'MEAN - A Modern Stack - Test'
  },
  strategies: {
    local: {
      enabled: true 
    },
    landingPage: '/',
    facebook: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      enabled: false
    },
    twitter: {
      clientID: 'CONSUMER_KEY',
      clientSecret: 'CONSUMER_SECRET',
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      enabled: false
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      enabled: false
    },
    google: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      enabled: false
    },
    linkedin: {
      clientID: 'API_KEY',
      clientSecret: 'SECRET_KEY',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      enabled: false
    }
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  },
  eloqua :
  {
    authorizationURL: 'https://login.eloqua.com/auth/oauth2/authorize',
    tokenURL: 'https://login.eloqua.com/auth/oauth2/token',
    clientID: '3edb1752-f1a8-47e3-b928-c14a88aa9c68',
    clientSecret: '1d4Bo2JLV7E2-Z3sW5UeLO0sRq~U12cOpKdbNTKyCbq8XXxpHo0ZxmbYT9WpRwbdPCFvYacsyxyrejgCnK3PRqAl6EOx3if95Xge',
    callbackURL: 'https://relatedpixelseloqua1275124.vagrantshare.com/eloquaservices/accounts/eloqua/callback',
    company: 'TechnologyPartnerLeadMgtTechSolutionsAB',
    username: 'Simon.Diel',
    password: 'DSpZlkaRIJ8807t0',
    host: 'https://secure.p02.eloqua.com'
    /*
        authorizationURL: 'https://login.eloqua.com/auth/oauth2/authorize',
        tokenURL: 'https://login.eloqua.com/auth/oauth2/token',
        clientID: '3edb1752-f1a8-47e3-b928-c14a88aa9c68',
        clientSecret: '1d4Bo2JLV7E2-Z3sW5UeLO0sRq~U12cOpKdbNTKyCbq8XXxpHo0ZxmbYT9WpRwbdPCFvYacsyxyrejgCnK3PRqAl6EOx3if95Xge',
        callbackURL: 'https://relatedpixelseloqua1275124.vagrantshare.com/eloquaservices/accounts/eloqua/callback',

        company: 'BonnierBusinessMediaTest',
        username: 'Eloqua.Api',
        password: 'Y1BqtOeH9gRvy1awPGCm1rA3',
        host: 'https://secure.p06.eloqua.com'*/

    },
  secret: 'SOME_TOKEN_SECRET',
  public: 
  {
    languages: 
    [
    {
      locale: 'en',
      direction: 'ltr',
    }, 
    {
      locale: 'he',
      direction: 'rtl',
    }],
    currentLanguage: 'en',
    loginPage: '/auth/login',
    cssFramework: 'bootstrap',
     eloqua:
    {
      bounceBackAddress: 'TechnologyPartnerLeadMgtTechSolutionsAB@s1926145509.m.en25.com',
      replyToName: 'Leadteq',
      replyToEmail: 'support@leadteq.com',
      campaignFolder: '482',
      emailFolder: '483',
      segmentFolder: '484',
      footer: '10',
      header: '7'
    }
    /*eloqua:
    {
      bounceBackAddress: 'bounce@red.bbmbonnier.se',
      replyToName: 'Redaktionen',
      replyToEmail: 'reply@bbmbonnier.se',
      campaignFolder: '567',
      emailFolder: '566',
      segmentFolder: '565',
      footer: '15',
      header: '12'
    }*/

  }
};
