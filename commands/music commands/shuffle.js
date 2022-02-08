const {CommandInteraction, MessageEmbed, Client} = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Shuffles the queue.',
  value: 'shuffle',
  permission: 'SEND_MESSAGES',

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const {options, member, guild, channel} = interaction;
    const VoiceChannel = member.voice.channel;
    const queue = await client.distube.getQueue(VoiceChannel);

    if (!VoiceChannel)
      return interaction.reply({
        content: 'You must be in a voice channel to be able to use music commands.',
        ephemeral: true,
      });

    if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
      return interaction.reply({
        content: `I am already playing music in <#${guild.me.voice.channelId}>.`,
        ephemeral: true,
      });

    try {
      await queue.shuffle(VoiceChannel);
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('#0099ff').setDescription(`🔀 **Song Shuffled.**`)],
      });
    } catch (e) {
      const errorEmbed = new MessageEmbed().setColor('RED').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
