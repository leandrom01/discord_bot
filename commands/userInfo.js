const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display information about a user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to get info about")
        .setRequired(false)
    ),

  async execute(interaction) {
    let user = interaction.options.getUser("target");
    if (!user) {
      user = interaction.user;
    }

    // Create an embedded message with user info
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("User Info")
      .setDescription(`Information about ${user.username}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Username", value: user.username, inline: true },
        {
          name: "Hashtag",
          value: `#${user.discriminator}`,
          inline: true,
        },
        { name: "ID", value: user.id, inline: true }
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
