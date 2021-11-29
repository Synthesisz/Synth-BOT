const {SlashCommandBuilder} = require('@discordjs/builders');

// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
  data: new SlashCommandBuilder()
    .setName('nikata')
    .setDescription('Shows his true nature'),
  async execute(interaction) {
    await interaction.reply(
      `https://media0.giphy.com/media/25RLdGV4YlQ69BalEN/giphy.gif?cid=790b7611dd5a24367d88759f949d17b672601ecbe5eb611f&rid=giphy.gif&ct=g`
    );
  },
};
