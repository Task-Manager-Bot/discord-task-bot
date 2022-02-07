module.exports = {
  name: "ping",
  description: "simple ping command",
  async run(client, message, args) {
    try {
      message.channel.send(`Pinging...`).then(async (m) => {
        let latencyPing = Math.floor(
          m.createdTimestamp - message.createdTimestamp
        );

        m.delete();
        let sentence =
          `My Latency: ` +
          "`" +
          `${latencyPing}ms` +
          "`" +
          `\nAPI Latency: ` +
          "`" +
          `${client.ws.ping}ms` +
          "`";
        message.channel.send(sentence);
      });
    } catch (err) {
      console.log(data.cmd.name + " Error:\n" + err);
      return message.channel.send(
        "An error occurred while trying to run this command"
      );
    }
  },
};
