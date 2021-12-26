const client = require('../code.js');
const {MessageEmbed} = require('discord.js');
module.exports = {
  name: 'DistubeEvents',
};
// const status = queue =>
//   `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
//     queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
//   }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`🎵 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`),
      ],
    })
  )

  .on('addSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`🎵| Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`),
      ],
    })
  )

  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`🎵 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`),
      ],
    })
  )
  // DisTubeOptions.searchSongs = true

  .on('error', (channel, e) => {
    channel.send({embeds: [new MessageEmbed().setColor('RED').setDescription(`🔴 | An error occured: ${e}`)]});
    console.error(e);
  })
  .on('empty', channel =>
    channel.send({
      embeds: [new MessageEmbed().setColor('RED').setDescription('Voice channel is empty! Leaving the channel...')],
    })
  )

  .on('searchNoResult', message =>
    message.channel.send({
      embeds: [new MessageEmbed().setColor('RED').setDescription(`🔴 | No result found!`)],
    })
  )
  .on('finish', queue =>
    queue.textChannel.send({
      embeds: [new MessageEmbed().setColor('RED').setDescription('Queue finished.')],
    })
  );
