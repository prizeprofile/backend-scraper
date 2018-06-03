module.exports = (message) => ({
  max_id: parseInt(message.since_id) + Math.round(Math.random() * 98),
  region_id: parseInt(message.region_id),
  tweets_count: 98
})
