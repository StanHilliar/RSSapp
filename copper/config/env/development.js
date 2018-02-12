'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-rss-dev',
  // db: 'mongodb://rssapp:rC2PxEJ7cs9Mf9icAmjiizw2C4eWqvjU@bbm-rssapp-live-shard-00-00-klcsn.mongodb.net:27017,bbm-rssapp-live-shard-00-01-klcsn.mongodb.net:27017,bbm-rssapp-live-shard-00-02-klcsn.mongodb.net:27017/mean-prod?ssl=true&replicaSet=BBM-RssApp-Live-shard-0&authSource=admin',
   // db: 'mongodb://rssapp:rC2PxEJ7cs9Mf9icAmjiizw2C4eWqvjU@bbm-rssapp-live-shard-00-00-klcsn.mongodb.net:27017,bbm-rssapp-live-shard-00-01-klcsn.mongodb.net:27017,bbm-rssapp-live-shard-00-02-klcsn.mongodb.net:27017/bbm-test?ssl=true&replicaSet=BBM-RssApp-Live-shard-0&authSource=admin',
  debug: true,
  logging: {
    format: 'dev'
  },
  http:
	{
	    port: 8080
	},
	//hostname: '0.0.0.0',
	key_file_name: 'localhost',
  //  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: false,
  mongoose: {
    debug: false
  },
  hostname: 'http://localhost:3000',
  app: {
    name: 'dev.EmailEditor'
  },
  strategies: { 
    local: {
      enabled: true
    },
    landingPage: '/',
    facebook: {
      clientID: 'DEFAULT_APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
      enabled: false
    },
    twitter: {
      clientID: 'DEFAULT_CONSUMER_KEY',
      clientSecret: 'CONSUMER_SECRET',
      callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
      enabled: false
    },
    github: {
      clientID: 'DEFAULT_APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
      enabled: false
    },
    google: {
      clientID: 'DEFAULT_APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      enabled: false
    },
    linkedin: {
      clientID: 'DEFAULT_API_KEY',
      clientSecret: 'SECRET_KEY',
      callbackURL: 'http://localhost:3000/api/auth/linkedin/callback',
      enabled: false
    }
  },
  emailFrom: 'thecrftrs@gmail.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'Gmail', // Gmail, SMTP
    auth: {
      user: 'thecrftrs@gmail.com',
      pass: 'QYF1s6mvbeDOZyXsMv24CXsC'
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
    password: '5CuQDl03vNcA73lY',
    host: 'https://secure.p02.eloqua.com'
  },
  secret: 'leadteq_secret_sdjkvndsuif93214isdflfsd23243fasd67989', 
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

  }
};
