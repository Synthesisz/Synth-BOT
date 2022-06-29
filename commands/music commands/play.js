const {CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Plays a song.',
  // permission: 'SEND_MESSAGES',
  options: [
    {
      name: 'query',
      description: 'Provide a name or url',
      type: 'STRING',
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const {member, guild, channel} = interaction;
    const VoiceChannel = member.voice.channel;
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
      client.distube.playVoiceChannel(VoiceChannel, interaction.options.getString('query'), {
        textChannel: channel,
        member: member,
      });
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('#0099ff').setDescription(`☑ **Request received.**`)],
      });
    } catch (e) {
      const errorEmbed = new MessageEmbed().setColor('RED').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
