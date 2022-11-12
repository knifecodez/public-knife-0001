const { EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');

module.exports = {

    name: ["utilities", "setup"],

    description: "Setup channel song request",

    category: "Utilities",

    run: async (client, interaction) => {

        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.editReply(`You don't have permission.`);

        await interaction.guild.channels.create({

            name: "song-request",

            type: 0,

            topic: `⏯ *Pause/Resume the song.*\n⬅ *Previous the song.*\n⏹ *Stop the song.*\n➡ *Skip the song.*\n🔁 *Loop/Unloop the song.*`,

            parent_id: interaction.channel.parentId,

            user_limit: 3,

            rate_limit_per_user: 3, 

        }).then(async (channel) => {

            const attachment = new AttachmentBuilder("./settings/images/banner.gif", { name: "setup.gif" });

            const content = `**__Queue list:__**\nJoin a voice channel and queue songs by name or url in here.`;

            const embed = new EmbedBuilder()

                .setColor(client.color)

                .setAuthor({ name: `No song playing currently.` })

                .setImage(`https://cdn.discordapp.com/attachments/993912464460763257/1040925534974128148/wallpaper9.jpeg`)

                .setDescription(`>>> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands) | [Support](https://invite.soul07.ml) | [Website](https://knifecodez.ml)`)

                .setFooter({ text: `Prefix is: /` });

            // SEND BANNER FIRST!

            await channel.send({ files: [attachment] });

            await channel.send({ content: `${content}`, embeds: [embed], components: [client.diSwitch, client.diSwitch2] }).then(async (message) => {

            // Create database!

            await client.createSetup(interaction, channel.id, message.id); // Can find on handlers/loadDatabase.js

                

            const embed = new EmbedBuilder()

                .setDescription(`*Succesfully Setup Music System in* ${channel}`)

                .setColor(client.color);

            return interaction.followUp({ embeds: [embed] });

            })

        });

    }

};