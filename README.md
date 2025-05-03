# FiveM Server Status Bot

This bot allows you to check the real-time status of a FiveM server, including the server's name, online player count, and a list of the players currently online. It also provides a mechanism to auto-refresh the server status every minute.

## Features

- **Displays Server Information**: Shows the server name, current player count, and other useful info.
- **Player List**: Shows a list of players currently connected to the server.
- **Auto-refresh**: The bot auto-refreshes the server status every 60 seconds to keep the information up-to-date.
- **Embed with Server Details**: Sends an embed message with the server status and a thumbnail for visual appeal.
- **Command**: Use the `!fivem` command to check the server status.

## Prerequisites

Before running this bot, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **Discord.js** library
- **Axios** library (for making HTTP requests to fetch server status)
- A **Discord bot** created and added to your server (with the necessary permissions).

## Setup Instructions

1. **Clone or Download the Project**:
   - Clone the repository or download the files to your local machine.

2. **Install Dependencies**:
   Run the following command in your project directory to install required libraries:

   ```bash
   npm install discord.js axios
Configure the Server Information:

Open the serverstatus.js file and update the following variables:

SERVER_IP: Your FiveM server's IP address.

SERVER_PORT: Your FiveM server's port (default is 30120).

Example:

js
Copy
Edit
const SERVER_IP = "51.48.25.157"; // Replace with your server IP
const SERVER_PORT = "30120"; // Replace with your server port
Add the Command to Your Bot:
Make sure your bot loads the serverstatus.js file in the bot's main index.js or the appropriate handler for commands.

Example (for index.js):

js
Copy
Edit
const fivemStatus = require('./commands/serverstatus');
client.on('messageCreate', async (message) => {
    if (message.content === '!fivem') {
        await fivemStatus.execute(message, client);
    }
});
Run the Bot:
Once everything is set up, run your bot using Node.js:

bash
Copy
Edit
node index.js
How to Use the Bot
To check the server status, simply type the command !fivem in any channel where the bot has permission to send messages.

The bot will reply with:

An embed showing the server's status, name, and maximum player count.

A list of players currently online on the server.

Command
!fivem: Fetches and displays the server status, player count, and player list.

Additional Notes
Auto-refresh: By default, the bot will automatically update the server status every 60 seconds. If you don’t want auto-refresh, you can comment out or remove the setInterval section in the serverstatus.js file.

Error Handling: If the bot fails to fetch data (e.g., due to network issues or server downtime), it will notify the channel with a message like "❌ Unable to fetch server status. Please try again later."

Troubleshooting
Server IP/Port issues:

Ensure the server IP and port are correct and reachable from your bot. You can test this by using tools like ping or telnet.

Missing Libraries:

If you encounter errors related to missing libraries (like axios), make sure you've run the npm install command to install the dependencies.

Permissions:

Ensure your bot has permissions to send messages, embeds, and read messages in the channels where the command will be used.

License
This project is open-source and free to use. However, it is provided "as is" without warranty of any kind.

Feel free to contribute, report issues, or fork this repository for your own FiveM server status bot!

pgsql
Copy
Edit

### How to Use

- **Install the bot** by following the setup instructions above.
- **Run** your bot using `node index.js`.
- **Type `!fivem`** in any Discord channel to check your FiveM server's status.
