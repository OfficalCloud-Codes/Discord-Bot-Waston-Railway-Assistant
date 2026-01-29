import dotenv from "dotenv";
dotenv.config();

const [logChannelId,ticketcatagory,supportrole,guildId,commandLogChannelID] = [process.env.LOG_CHANNEL,process.env.TICKET_CAT,process.env.SUPPORT_ROLE,process.env.GUILD_ID,process.env.COMMAND_LOG_CHANNEL]


import { addInfraction, getInfractions } from "./infractions.js";




import {
    reply,
    replyEphemeral,
    replyError,
    replySuccess,
    sendToChannel,
    sendToChannelContainer,
    DMcomponent,
    replyContainer,
    createTicketPanel,
    ticketbuttons
    
} from "./messages.js";

import {
    Client,
    GatewayIntentBits,
    ApplicationCommandOptionType,
    MessageFlags,
    ReactionType,
    PermissionsBitField,
    ChannelType,
} from "discord.js";


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ]
});

client.on("clientReady", async () => {
    console.log(`Client On! ${client.user.username}`);
    await setupSlashCommands(client, guildId);
    sendToChannelContainer(client,logChannelId,"🟢 Bot Online","Bot is now online","Waston Railway Assistant")
});


async function setupSlashCommands(client, guildId) {
    const commands = [
        {
            name: "ticketpanelcreate",
            description: "[MOD ONLY] Creates a place for users to make a ticket",
            options: [
                {
                    name: "channel",
                    description: "Channel for the panel",
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ]
        },
        {
            name: "ticketencourageclose",
            description: "[SUPPORT ONLY] Encourges the owner of the ticket to close it",
            options: [
                {
                    name: "reason",
                    description: "Reason for closing",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ]
        },
        {
            name: "newticket",
            description: "[SUPPORT ONLY] Creates a new ticket",
        },
        {
            name: "infractiongive",
            description: "[MOD ONLY] Gives an infraction to a user",
            options: [
                {
                    name: "user",
                    description: "User to give infraction to",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "reason",
                    description: "Reason for infraction",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                 {
                    name: "actiontaken",
                    description: "Action taken",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ]
        },
        {
            name: "infractions",
            description: "[MOD ONLY] Tells infractions",
            options: [
                {
                    name: "user",
                    description: "User to give get infractions from",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ]
        },
        {
            name: "myinfractions",
            description: "Your infractions",
        },
        {
            name: "senddm",
            description: "[MOD ONLY] Sends a DM to the user selected",
            options: [
                {
                    name: "user",
                    description: "User to send this to",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "title",
                    description: "Title of the message",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "content",
                    description: "Content of the message",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        },
             {
            name: "postrules",
            description: "[MOD ONLY] Posts rules",
            options: [
                {
                    name: "channel",
                    description: "Channel to send this to",
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ]
        },
        {
            name: "sendtochannel",
            description: "[MOD ONLY] Sends a message to the channel selected",
            options: [
                {
                    name: "channel",
                    description: "Text channel to send this to",
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
                {
                    name: "title",
                    description: "Title of the message",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "content",
                    description: "Content of the message",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        }
    ];

    const guild = await client.guilds.fetch(guildId);``
    await guild.commands.set(commands);
    console.log("Slash commands registered");
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInfractionFancyText(infractions) {
    let title = `Active \n`
    const text = infractions
    
    
    
    .map((inf, i) => {
        const infractionDate = new Date(inf.timestamp);
        const now = new Date();

        // 30 days in milliseconds
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

        let dateLine;
        if (now - infractionDate > THIRTY_DAYS) {
        
        
        
        // Already expired
        const expiredOn = new Date(infractionDate.getTime() + THIRTY_DAYS);
        dateLine = `Expired on: ${expiredOn.toLocaleString()}`;
        title = `Expired \n`;
        } else {
        // Not yet expired
        const expiresOn = new Date(infractionDate.getTime() + THIRTY_DAYS);
        dateLine = `Expires on: ${expiresOn.toLocaleString()}`;
        }

        

        return (
        `## ${i+1} - ` + title +
        `Reason: ${inf.reason}\n` +
        `Action: ${inf.action}\n` +
        `Date: ${infractionDate.toLocaleString()}\n` +
        `${dateLine}`
        );
    })
    .join("\n\n"); 
  return text
}


client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {

        sendToChannelContainer(client,commandLogChannelID,"Command Ran",`User ${interaction.user.username} has ran command: ${interaction.commandName}`,"Waston Railway Assistant")
        if (interaction.commandName === "infractiongive") {
            const member = interaction.member;
            const permission = PermissionsBitField.Flags.ManageMessages
            const userr = interaction.options.getUser("user");
            const reason = interaction.options.getString("reason");
            const actiontaken = interaction.options.getString("actiontaken");
            if (!member.permissions.has(permission)) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be moderator or higher`,"Waston Railway Assistant")
            };
            addInfraction(userr.id,"Infraction",reason,actiontaken)
            
            const userinfs = getInfractions(userr.id)

            return replyContainer(client,interaction,"✅ Warned User",`Successfully warned user. \n **Reason:** ${reason} \n **Action Taken:** ${actiontaken} \n You can view all infractions using /myinfractions`,"Waston Railway Assistant",false)
            

        };
        if (interaction.commandName === "senddm") {
            const userr = interaction.options.getUser("user");
            const title = interaction.options.getString("title");
            const cont = interaction.options.getString("content");
            
            const member = interaction.member; // GuildMember

                const permission = PermissionsBitField.Flags.Administrator

            if (!member.permissions.has(permission)) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be administrator or higher`,"Waston Railway Assistant")
            };
        

            replyContainer(client,interaction,"Messaged User",`Attempted to message user ${userr.displayName}`,"Waston Railway Assistant")
            return DMcomponent(client,userr.id,title,cont);
            
        }
        if (interaction.commandName === "myinfractions") {
            const infractions = getInfractions(interaction.user.id);
            replyContainer(client,interaction,`Infractions for ${interaction.user.username}`,getInfractionFancyText(infractions),"Waston Railway Assistant",true)
        
        
            
        }
         if (interaction.commandName === "infractions") {
            const member = interaction.member;
            const permission = PermissionsBitField.Flags.ManageMessages
            const userr = interaction.options.getUser("user");
            if (!member.permissions.has(permission)) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be moderator or higher`,"Waston Railway Assistant")
            };
            const infractions = getInfractions(userr.id);
            replyEphemeral(interaction,"Getting info...")
            return sendToChannelContainer(client,interaction.channelId,`Infractions for ${userr.username}`,getInfractionFancyText(infractions),"Waston Railway Assitant",false)

        };
        if (interaction.commandName === "sendtochannel") {
            const chanell = interaction.options.getChannel("channel");
            const title = interaction.options.getString("title");
            const cont = interaction.options.getString("content");
            
            const member = interaction.member; // GuildMember

                const permission = PermissionsBitField.Flags.Administrator

            if (!member.permissions.has(permission)) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be administrator or higher`,"Waston Railway Assistant")
            };
        

            replyContainer(client,interaction,"Sent to channel",`Attempted to send message to channel ${chanell.name}`,"Waston Railway Assistant")
            return sendToChannelContainer(client,chanell.id,title,cont,"Sent by a moderator");
            
        }
        if (interaction.commandName === "ticketpanelcreate") {
            const chanell = interaction.options.getChannel("channel");
            
            const member = interaction.member; // GuildMember

                const permission = PermissionsBitField.Flags.Administrator

            if (!member.permissions.has(permission)) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be administrator or higher`,"Waston Railway Assistant")
            };
        

            replyContainer(client,interaction,"Sent to channel",`Attempted to send ticket panel to channel ${chanell.name}`,"Waston Railway Assistant")
            return createTicketPanel(client,chanell.id);
        }
        if (interaction.commandName === "ticketencourageclose") {
            const reason = interaction.options.getString("reason");
            
            const member = interaction.member; // GuildMember

                const permission = interaction.member.roles.cache.has(supportrole)

            if (!permission) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be Support or higher`,"Waston Railway Assistant")
            };
            

            replyEphemeral(interaction,"Encouraged")
            sendToChannelContainer(client,interaction.channel.id,"Close Ticket?",`Reason: \`${reason}\``,"Waston Railway Assistant")
            return ticketbuttons(client,interaction.channel.id,true);
        }
        if (interaction.commandName === "newticket") {
            const guild = interaction.guild;
            const user = interaction.user;
            const randomnum = getRandomInt(11,99)
            console.log("Help Button")

            // Get your Support role ID

            // Create a new text channel under a category (replace CATEGORY_ID if needed)
            const channel = await guild.channels.create({
                name: `Open-${user.displayName}-${randomnum}`.toLowerCase(),
                type: ChannelType.GuildText,
                parent: ticketcatagory,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone, // Deny @everyone from seeing
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: supportrole,       // Allow Support role
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: user.id,             // Allow the user
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                ],
            });
        
        // Reply to the user (ephemeral so only they see)
        replyContainer(client,interaction,"Ticket Created",`Your ticket has been created. Visit it here: ${channel}`,"Waston Railway Assistant",true)
        sendToChannel(client,channel.id,`<@&${supportrole}>`)
        sendToChannelContainer(client,channel.id,"Ticket Created","Thank you for contacting the Waston Railway support team. Please be paitent and do not ping staff. Thank you","Please send any evidence if reporting a player")
        return ticketbuttons(client,channel.id,false)
           
        }   
    
    }
    if (interaction.isButton()) {

        if (interaction.customId === "contact_staff") {
            const guild = interaction.guild;
            const user = interaction.user;
            const randomnum = getRandomInt(11,99)
            console.log("Help Button")

            // Get your Support role ID

            // Create a new text channel under a category (replace CATEGORY_ID if needed)
            const channel = await guild.channels.create({
                name: `Open-${user.displayName}-${randomnum}`.toLowerCase(),
                type: ChannelType.GuildText,
                parent: ticketcatagory,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone, // Deny @everyone from seeing
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: supportrole,       // Allow Support role
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: user.id,             // Allow the user
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                ],
            });
        
        // Reply to the user (ephemeral so only they see)
        replyContainer(client,interaction,"Ticket Created",`Your ticket has been created. Visit it here: ${channel}`,"Waston Railway Assistant",true)
        sendToChannel(client,channel.id,`<@&${supportrole}>`)
        sendToChannelContainer(client,channel.id,"Ticket Created","Thank you for contacting the Waston Railway support team. Please be paitent and do not ping staff. Thank you","Please send any evidence if reporting a player")
        return ticketbuttons(client,channel.id,false)
        }
        if (interaction.customId === "ticket_close") {
            const randomnum = getRandomInt(11,99)
            const guild = interaction.guild;
            const user = interaction.user;
            const channel = interaction.channel
            
            replyEphemeral(interaction,"Closing Ticket...")

            channel.setName(`Closed-${user.displayName}-${randomnum}`.toLowerCase())
            for (const overwrite of channel.permissionOverwrites.cache.values()) {
                await channel.permissionOverwrites.delete(overwrite.id);
            }

            await channel.permissionOverwrites.create(supportrole, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true,
            });
            sendToChannelContainer(client,channel.id,"Ticket Closed",`This ticket has now been closed. This ticket was closed by: ${interaction.user}`,"Waston Railway Assistant")
            DMcomponent(client,user.id,"Ticket Closed","Your ticket has now been closed. Thank you for using Waston Railway support.")
        }
         if (interaction.customId === "ticket_claim") {
            const randomnum = getRandomInt(11,99)
            const guild = interaction.guild;
            const user = interaction.user;
            const channel = interaction.channel
            
            const member = interaction.member; // GuildMember

            const permission = interaction.member.roles.cache.has(supportrole)

            if (!permission) {
                return replyContainer(client,interaction,"❌ Invalid Permissions",`You must be Support or higher`,"Waston Railway Assistant")
            };

            replyEphemeral(interaction,"Claiming ticket...")

            sendToChannelContainer(client,channel.id,"Ticket Claimed",`This ticket has been claimed by ${interaction.user}.`,"Waston Railway Assistant")
        }
    }
});

import express from "express";

const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
    if (!client.isReady()) {
        return res.status(503).send("Discord not connected");
    }
    res.send("OK");
});

app.listen(PORT, () => {
    console.log("Health check listening on port 3000");
});

client.login(process.env.DISCORD_TOKEN);
