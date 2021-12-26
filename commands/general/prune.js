module.exports = {
  name: 'prune',
  description: 'Prune up to 99 messages.',
  permission: 'MANAGE_MESSAGES',
  options: [
    {
      name: 'amount',
      description: 'Number of messages to prune',
      type: 'NUMBER',
      required: true,
    },
    {
      name: 'target',
      description: 'Select user to prune',
      type: 'USER',
      required: false,
    },
  ],

  async execute(interaction) {
    const {channel, options} = interaction;

    const amount = options.getNumber('amount');
    const target = options.getMember('target');
    const messages = await channel.messages.fetch();
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
