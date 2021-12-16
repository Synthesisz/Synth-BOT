const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Prune up to 99 messages.')
    .addIntegerOption(option =>
      option.setName('amount').setDescription('Number of messages to prune').setRequired(true)
    )
    .addUserOption(option => option.setName('target').setDescription('Select user to prune')),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const target = interaction.options.getUser('target');
    const messages = await interaction.channel.messages.fetch();
    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: 'You need to input a number between 1 and 100.',
        ephemeral: true,
      });
    } else if (!target) {
      await interaction.channel.bulkDelete(amount, true).catch(error => {
        console.error(error);
        interaction.reply({
          content: 'There was an error trying to prune messages in this channel!',
          ephemeral: true,
        });
      });
      return interaction.reply({
        content: `Successfully pruned \`${amount}\` messages.`,
        ephemeral: true,
      });
    } else {
      let i = 0;
      const filtered = [];
      (await messages).filter(m => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });
      await interaction.channel.bulkDelete(filtered, true);
      return interaction.reply({
        content: `Successfully pruned \`${amount}\` messages from ${target}.`,
        ephemeral: true,
      });
    }
  },
};
