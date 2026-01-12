# Waston Railway Assistant
Welcome to the repository for the Waston Railway Assistant.
### What is this?
This is the code for a Discord Bot used in the Waston Railway Server.
### What can I use this for?
You can use this to create your own bot, You might want to change some things first.
## Before you use:
- You MUST create a file named `.env` and put this in the file (Change values as needed):
```
DISCORD_TOKEN="discord token here"
LOG_CHANNEL="log channel here"
TICKET_CAT="catagory for tickets"
SUPPORT_ROLE="support role to ping when tickets are created"
GUILD_ID = "the guild id you want to use in"
```
- If you are hosting on your own machine I recommend using VS Code as it makes everything easy
- Change `messages.js` as you please, I have created it for what I need and not what others might need
- Most things in this bot are used in Waston Railway Discord server so it is encouraged to change things
- **IMPORTANT:** This bot is meant to be used in **ONE** server only! If you add this bot to multiple servers, commands will only be registered to the guild stated in the `.env` file
## Status Monitoring
If you would like to use any monitoring platform to monitor your bot uptime, you can use VS codes in-built Port Forwarding.

**NOTE: Everytime VS code is restarted you will need to repeat these steps**

To open a port:

Select PORTS

<img width="418" height="40" alt="an image of a selection bar in VS code, containing the options of: PROBLEMS, OUTPUT, DEBUG CONSOLE, TERMINAL, and PORTS" src="https://github.com/user-attachments/assets/5c61a178-905d-4924-9530-29fd3ecaac75" />

Select Forward A Port

<img width="2246" height="265" alt="image" src="https://github.com/user-attachments/assets/f2abc57d-1160-4580-99c5-ff3524a4508d" />

Input `3000`

<img width="409" height="103" alt="image" src="https://github.com/user-attachments/assets/b593e672-922d-46a3-877a-9608b1e4c485" />
<img width="417" height="93" alt="image" src="https://github.com/user-attachments/assets/fd0830e6-8e30-4a0d-9353-0cace018067a" />

Press `ENTER` on your keyboard to open the port

Now it should be open

**IMPORTANT:** Right click on the port you opened

<img width="255" height="250" alt="image" src="https://github.com/user-attachments/assets/ea4c31ad-3d64-4374-a000-976c5c3b1837" />

Hover over Port Visibility and selct `Public`
A popup may appear

<img width="778" height="175" alt="image" src="https://github.com/user-attachments/assets/0838e5d4-2988-4171-ad31-08776fae9e4a" />

Press continue, as none of the information we are sharing is sensitive, its just the status of the bot.

Now to access our link to our port, copy the `Forwarded Address` 

To check the status of our bot, paste this address in your browser, and add `/health` to the end of the URL, otherwise the page will display something like `Cannot GET /`

The END of you URL should look like this:

<img width="168" height="29" alt="image" src="https://github.com/user-attachments/assets/681db27e-b8e0-4283-a268-83aa336a4f85" />


If you have done everything right, it should display `OK`

<img width="41" height="33" alt="image" src="https://github.com/user-attachments/assets/9d6ef776-e222-43de-8f53-a2f8a5911045" />

## Get Started Status Monitoring with Instatus
To get started, head to https://instatus.com

Create an account and sign in then create a new project (If you haven't done already)

Select Create New > Project

<img width="204" height="91" alt="image" src="https://github.com/user-attachments/assets/520c8e39-ff05-43c2-80de-455c3c2a76aa" />

You should see this (Unless Instatus has been updated)

<img width="1286" height="813" alt="image" src="https://github.com/user-attachments/assets/80761392-9ddf-465e-9b55-c44416c1897b" />

Press `START CREATING NEW PROJECT`

<img width="1046" height="1062" alt="image" src="https://github.com/user-attachments/assets/57e8d025-c1ac-40ab-82e4-a9e7a92cb42d" />

These are the default settings, we want to change this

Put the forwarded port URL **WITH `/HEALTH`** into the `URL To Monitor`

In `Monitor is successful if` select Status Code

Input this:

<img width="810" height="121" alt="image" src="https://github.com/user-attachments/assets/c7aff30c-ede3-4167-a270-2e0e53c87193" />

Select `NEXT`

After, it asks to create an incident, press `SKIP` as we want this to get working

Do the rest (Make your page)

I am not going to describe anymore as this is just a tutorial to get started.

