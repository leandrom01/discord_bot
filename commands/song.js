const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('song')
        .setDescription('Check what song a user is listening to')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to check')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        if (!member || !member.presence) {
            return interaction.reply(`${user.username} is offline or has no activities.`);
        }



        const spotifyActivity = member.presence.activities.find(activity => {
            return (activity.type === 2 && activity.name === 'Spotify') 
        });

        if (spotifyActivity) {
            const { details: song, state: artist, timestamps, assets } = spotifyActivity;

            // Calculate elapsed and total time
            const startTime = timestamps.start;
            const endTime = timestamps.end;
            const currentTime = Date.now();

            const elapsedTime = Math.floor((currentTime - startTime) / 1000); 
            const totalTime = Math.floor((endTime - startTime) / 1000); 

            // Format times as mm:ss
            const formatTime = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            };

            const currentFormatted = formatTime(elapsedTime);
            const totalFormatted = formatTime(totalTime);

            // Generate a progress bar
            const progressBarLength = 20; 
            const progressPosition = Math.round((elapsedTime / totalTime) * progressBarLength);
            const progressBar = '▬'.repeat(progressPosition) + '🔘' + '▬'.repeat(progressBarLength - progressPosition);

            return interaction.reply({
                embeds: [{
                    title: `🎵 Now Playing: ${song}`,
                    description: `**Artist:** ${artist}\n\n` +
                                 `\`${currentFormatted}\` ${progressBar} \`${totalFormatted}\`\n\n`,
                    thumbnail: { url: `https://i.scdn.co/image/${assets.largeImage.slice(8)}` },
                    color: 0x1DB954, 
                }]
            });
        }


        return interaction.reply(`${user.username} is not listening to any music on Spotify.`);
    }
};
