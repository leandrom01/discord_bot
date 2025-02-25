const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomanime")
    .setDescription("Get a random anime suggestion!"),
    
  async execute(interaction) {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/random/anime");
      const anime = response.data.data;

      const title = anime.title;
      const url = anime.url;
      const imageUrl = anime.images.jpg.image_url;
      const episodes = anime.episodes || "N/A";
      const status = anime.status;
      const score = anime.score || "N/A";
      const synopsis = anime.synopsis || "No synopsis available.";

      await interaction.reply({
        content: `**Title:** ${title}\n\n**Episodes:** ${episodes}\n**Status:** ${status}\n**Score:** ${score}\n\n**Synopsis:**\n${synopsis}\n\n[More Info](${url})`,
        files: [imageUrl],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Failed to fetch anime details. Please try again later.",
        ephemeral: true,
      });
    }
  },
};