// utils/messages.js
import { MessageFlags, EmbedBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, ContainerBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

/**
 * Standard reply
 */
export async function reply(interaction, content) {
    if (interaction.replied || interaction.deferred) {
        return interaction.followUp({ content });
    }

    return interaction.reply({ content });
}

/**
 * Ephemeral reply
 */
export async function replyEphemeral(interaction, content) {
    if (interaction.replied || interaction.deferred) {
        return interaction.followUp({
            content,
            flags: MessageFlags.Ephemeral
        });
    }

    return interaction.reply({
        content,
        flags: MessageFlags.Ephemeral
    });
}

/**
 * Channel Send
 */
export async function sendToChannel(client,channeldId, content) {
    const channel = await client.channels.fetch(channeldId);
    await channel.send(content)

}


/**
 * Channel Send Container
 */
export async function replyContainer(client,interaction, title,content,footer,ephemeral) {
     if (interaction.replied || interaction.deferred) {
        return interaction.followUp({ content });
    }
    await interaction.reply({
        content: "",
        components:
            [new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${title}`),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(content),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`-# ${footer}`),
            )],
        flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
    })

}

export async function DMcomponent(client,userid, title,content) {
    const user = await client.users.fetch(userid);
    await user.send({
        content: "",
        components:
            [new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${title}`),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(content),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent("-# Waston Railway Assistant"),
            )],
        flags: MessageFlags.IsComponentsV2
    })

}

export async function sendToChannelContainer(client,channeldId, title,content,footer) {
    const channel = await client.channels.fetch(channeldId);
    await channel.send({
        content: "",
        components:
            [new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${title}`),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(content),
            )
            .addSeparatorComponents(
                new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`-# ${footer}`),
            )],
        flags: MessageFlags.IsComponentsV2
    })

}

/**
 * TicketSend
 */


export async function createTicketPanel(client,channeldId) {
    const channel = await client.channels.fetch(channeldId);
     
    const container = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`## Support`),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent("Please contact staff here \n Please do not contact support for subjects relating to: \n - Suggestions \n - Bugs (Issues with the game) \n - Application status"),
        )
        .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`-# Not abiding by the guidelines can get you blacklisted from Support`),
        )

        // **Add a button here**
    const button = new ButtonBuilder()
                .setLabel("Contact Staff")   // Text on the button
                .setStyle(ButtonStyle.Primary) // Primary / Secondary / Success / Danger / Link
                .setCustomId("contact_staff") // Custom ID for interaction
    
    
    
    await channel.send({
        content: "",
        components: [container],
        flags: MessageFlags.IsComponentsV2
    })
    
    const row = new ActionRowBuilder().addComponents(button);
   
    await channel.send({
        content: "",
        components: [row]
    })

}

export async function ticketbuttons(client,channeldId,onlyclose) {
    const channel = await client.channels.fetch(channeldId);
        // **Add a button here**
    const close = new ButtonBuilder()
                .setLabel("Close Ticket")   // Text on the button
                .setStyle(ButtonStyle.Danger) // Primary / Secondary / Success / Danger / Link
                .setCustomId("ticket_close") // Custom ID for interaction
    const claim = new ButtonBuilder()
                .setLabel("[STAFF] Claim")   // Text on the button
                .setStyle(ButtonStyle.Success) // Primary / Secondary / Success / Danger / Link
                .setCustomId("ticket_claim") // Custom ID for interaction


    const row = new ActionRowBuilder().addComponents(close)
    if (!onlyclose) {row.addComponents(claim)}
    
   
    await channel.send({
        content: "",
        components: [row]
    })

}

/**
 * Embed reply
 */
export async function replyEmbed(interaction, embed, ephemeral = false) {
    const payload = {
        embeds: [embed],
        ...(ephemeral && { flags: MessageFlags.Ephemeral })
    };

    if (interaction.replied || interaction.deferred) {
        return interaction.followUp(payload);
    }

    return interaction.reply(payload);
}

/**
 * Error message (red embed)
 */
export async function replyError(interaction, message) {
    const embed = new EmbedBuilder()
        .setColor(0xE74C3C)
        .setTitle("Error")
        .setDescription(message);

    return replyEmbed(interaction, embed, true);
}

/**
 * Success message (green embed)
 */
export async function replySuccess(interaction, message) {
    const embed = new EmbedBuilder()
        .setColor(0x2ECC71)
        .setDescription(message);

    return replyEmbed(interaction, embed, true);
}
