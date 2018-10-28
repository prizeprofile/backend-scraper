const _ = require('lodash')

module.exports = {
  determinants: [
    {
      the: 'retweeted_status',
      meets: [_.isNil, 'OR', _.isEmpty]
    },
    {
      the: 'in_reply_to_status_id',
      meets: [_.isNil, 'OR', _.isEmpty]
    }
  ],

  transformers: [
    {
      from: ['extended_tweet.full_text', 'full_text', 'text'],
      which: _.isString,
      to: 'resource.text',
      required: true
    },
    {
      from: 'id_str',
      which: _.isString,
      to: 'resource.resource_id',
      required: true
    },
    {
      from: ['user.location', 'place', 'geo', 'coordinates', 'lang', 'user.lang'],
      which: [_.isString, 'OR', _.isNumber],
      to: 'resource.location'
    },
    {
      from: ['timestamp_ms', 'created_at'],
      which: [_.isString, 'OR', _.isNumber],
      to: 'resource.posted',
      requiredcs: true
    },
    {
      from: 'reply_count',
      which: _.isNumber,
      to: 'resource.comments',
      default: 0
    },
    {
      from: 'retweet_count',
      which: _.isNumber,
      to: 'resource.retweets',
      default: 0
    },
    {
      from: 'favorite_count',
      which: _.isNumber,
      to: 'resource.favorites',
      default: 0
    },
    {
      from: ['entities.media', 'entities.extended_entities.media'],
      which: _.isArray,
      to: 'resource.media'
    },
    {
      from: 'user.id_str',
      which: _.isString,
      to: 'promoter.resource_id',
      required: true
    },
    {
      from: ['user.profile_image_url_https', 'profile_banner_url'],
      which: _.isString,
      to: 'promoter.thumbnail'
    },
    {
      from: 'user.followers_count',
      which: _.isNumber,
      to: 'promoter.followers',
      default: 0
    },
    {
      from: 'user.screen_name',
      which: _.isString,
      to: 'promoter.screen_name',
      required: true
    },
    {
      from: 'user.name',
      which: _.isString,
      to: 'promoter.name'
    },   
    {
      from: 'user.url',
      which: _.isString,
      to: 'promoter.homepage'
    },
    {
      from: 'user.verified',
      which: _.isBoolean,
      to: 'promoter.verified',
      default: false
    },
    {
      from: 'user.description',
      which: _.isString,
      to: 'promoter.description'
    }
  ],

  editors: [
    {
      run: 'location',
      through: loc => loc.toString()
    }
  ]
}
