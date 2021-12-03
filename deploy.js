//const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {token} = require('./config.json');
const fs = require('fs');
const clientId = '914168825111531640';
const guildId = '190433486157381632';

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
// rest
//   .put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
//   .then(() => console.log('Successfully registered application commands.'))
//   .catch(console.error);

// const commands = [
//   new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with pong!"),
//   new SlashCommandBuilder()
//     .setName("prune")
//     .setDescription("Prunes X amount of messages"),
//   new SlashCommandBuilder()
//     .setName("nikata")
//     .setDescription("Shows his true nature"),
// ].map((command) => command.toJSON());
