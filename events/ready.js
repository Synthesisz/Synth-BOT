const {Client} = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity('Demon Hunter', {type: 'PLAYING'});
  },
};
