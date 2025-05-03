const axios = require("axios");

const SERVER_IP = "51.79.254.142";
const SERVER_PORT = "40120";

module.exports = {
    name: "fivem",
    description: "Check the FiveM server status.",

    async execute(message, client) {
        try {
            const embed = await fetchServerStatusEmbed();
            const statusMessage = await message.channel.send({ embeds: [embed] });

            // Optional: Auto-refresh every 60 seconds (comment this out if you don't want auto updates)
            const interval = setInterval(async () => {
                try {
                    const updatedEmbed = await fetchServerStatusEmbed();
                    await statusMessage.edit({ embeds: [updatedEmbed] });
                } catch (error) {
                    console.error("⛔ Error updating server status:", error);
                    clearInterval(interval); // Stop updating on error
                }
            }, 60000);
        } catch (error) {
            console.error("⛔ Error fetching server status:", error);
            message.channel.send("❌ Unable to fetch server status. Please try again later.");
        }
    },

    async init(client) {
        console.log("✅ FiveM command initialized.");
    },
};

async function fetchServerStatusEmbed() {
    try {
        const infoUrl = `http://${SERVER_IP}:${SERVER_PORT}/info.json`;
        const playersUrl = `http://${SERVER_IP}:${SERVER_PORT}/players.json`;

        const [infoResponse, playersResponse] = await Promise.all([
            axios.get(infoUrl),
            axios.get(playersUrl),
        ]);

        const serverName = infoResponse.data.vars?.sv_hostname || "Torque X RP";
        const maxPlayers = infoResponse.data.vars?.sv_maxClients || 512;
        const players = playersResponse.data || [];
        const onlinePlayers = players.length;

        return {
            color: 0x3498db,
            title: "🔧 Torque X RP | Server Status",
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/1367050158075809843/1367050828749340703/ChatGPT_Image_Apr_30_2025_01_41_37_PM.png",
            },
            fields: [
                { name: "Server Name", value: serverName, inline: false },
                { name: "Server Status", value: "🟢 Online", inline: true },
                { name: "Online Players", value: `${onlinePlayers}/${maxPlayers}`, inline: true },
                { name: "Restart Times", value: "11:00 AM , 06:00 PM", inline: false },
                { name: "F8 CONNECT", value: `\`connect ${SERVER_IP}:${SERVER_PORT}\``, inline: false },
                { name: "Email", value: "samplemail@horizonrp.com", inline: false },
                { name: "Website", value: "[horizonrp.in](https://horizonrp.in)", inline: false },
            ],
            image: {
                url: "https://cdn.discordapp.com/attachments/1367050158075809843/1367050298102644791/ChatGPT_Image_Apr_30_2025_01_38_46_PM.png",
            },
            footer: {
                text: "Torque X RP • Last updated",
                icon_url: "https://cdn.discordapp.com/attachments/1367050158075809843/1367050828749340703/ChatGPT_Image_Apr_30_2025_01_41_37_PM.png",
            },
            timestamp: new Date(),
        };
    } catch (error) {
        console.error("⛔ Failed to fetch server data:", error);
        throw new Error("Failed to fetch server status.");
    }
}
