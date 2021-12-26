const {CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
  name: 'dc',
  description: 'Disconnects the bot',
  value: 'stop',
  permission: 'SEND_MESSAGES',
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const {member, guild, channel} = interaction;
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
      await queue.stop(VoiceChannel);
      return interaction.reply({
        embeds: [
          new MessageEmbed().setColor('#0099ff').setDescription(`⏹ **Stopped The Music & Left The Voice Channel.**`),
        ],
      });
    } catch (e) {
      const errorEmbed = new MessageEmbed().setColor('RED').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
