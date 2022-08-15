const { client } = require("../index.js")
module.exports = {
    name: "message",
    once: false,
    execute: async (message) => {
        prefix = "t!" || "t~"

        const args = msg.startsWith(prefix)
            ? msg.slice(prefix.prefix).trim().split(/ +/g)
            : [""]
        // const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase()

        if (!client.commands.has(command)) return

        try {
            client.commands.get(command).run(client, message, args)
        } catch (error) {
            console.error(error)
        }
    },
}
