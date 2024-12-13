const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('subscribe')
    .setDescription('React to the message to receive the Subscriber role.'),
  
  async execute(interaction) {
    // Role IDs
    const adminRoleId = '1317198006201749564'; // Admin role ID
    const subscriberRoleId = '1317198251203625020'; // Subscriber role ID

    // Check if the user has the 'Admin' role by ID
    if (!interaction.member.roles.cache.has(adminRoleId)) {
      return interaction.reply({
        content: 'You do not have the required permissions to use this command.',
        ephemeral: true
      });
    }

    // Send the initial reply to the interaction
    await interaction.reply({
      content: 'Please wait... Setting up the subscribe message.',
      ephemeral: true
    });

    // Create the embed message
    const subscribeEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('📢 Want to receive notifications when @cettt7 is live?')
      .setDescription('React to this message to receive the **Subscriber** role and get notified when @cettt7 is live. @everyone')
      .setFooter({ text: 'React with the 🔔 emoji to subscribe.'  })
      .setTimestamp();

    // Send the embed message (not replying to the user directly)
    const message = await interaction.channel.send({
      embeds: [subscribeEmbed]
    });

    // React with the bell emoji
    await message.react('🔔');

    // Reply with "Message sent" only to the user
    await interaction.followUp({
      content: 'Message sent! You can now react to the message to subscribe.',
      ephemeral: true
    });
  },

  // React to the user's reaction to add them to the Subscriber role
  
};
