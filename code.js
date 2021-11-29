// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const {token} = require('./config.json');
const fs = require('fs');
//const commandHandler = require("./commands");
// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});
//   const { commandName } = interaction;

//   if (commandName === "ping") {
//     await interaction.reply("Pong!");
//   } else if (commandName === "beep") {
//     await interaction.reply("Boop!");
// Login to Discord with your client's token
client.login(token);

// fs is Node's native file system module. Collection is a class that extends JavaScript's native Map class, and includes more extensive, useful functionality.
