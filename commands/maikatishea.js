const { SlashCommandBuilder } = require("@discordjs/builders");

// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
  data: new SlashCommandBuilder()
    .setName("maikatishea")
    .setDescription("Replies with maikatishea"),
  async execute(interaction) {
    await interaction.reply("maikatishea");
  },
};
