//const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
// const commands = [
//   new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with pong!"),
//   new SlashCommandBuilder()
//     .setName("maikatishea")
//     .setDescription("Replies with maikatishea"),
//   new SlashCommandBuilder()
//     .setName("prune")
//     .setDescription("Prunes X amount of messages"),
//   new SlashCommandBuilder()
//     .setName("nikata")
//     .setDescription("Shows his true nature"),
// ].map((command) => command.toJSON());

const rest = new REST({version: '9'}).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
