const {Client, Collection} = require('discord.js');
const {token} = require('./config.json');
const client = new Client({intents: 14023});
//DISTUBE
const {DisTube} = require('distube');
//const {SpotifyPlugin} = require('@distube/spotify');
require('./Handlers/eventhandler')(client);
require('./Handlers/commandhandler')(client);
client.commands = new Collection();

client.distube = new DisTube(client, {
  emitAddSongWhenCreatingQueue: false,
  // plugins: [new SpotifyPlugin()],
});
module.exports = client; //END OF DISTUBE
client.login(token);
