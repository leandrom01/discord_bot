const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong and the latency!"),
    async execute(interaction) {
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
      const latency = sent.createdTimestamp - interaction.createdTimestamp;
    
      await interaction.editReply(`🏓 Pong!\nLatency: ${latency}ms`);
    },
};
