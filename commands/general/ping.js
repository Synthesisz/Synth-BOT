// module.exports is how you export data in Node.js so that you can require() it in other files.
// const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
  name: 'test123',
  description: 'Ping',
  permission: 'SEND_MESSAGES',

  async execute(interaction) {
    interaction.reply({content: 'PONG'});
  },
};
