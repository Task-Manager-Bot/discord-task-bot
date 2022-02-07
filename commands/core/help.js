const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Displays the help menu.",
  run(_client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help")
      .setDescription(
        `
		    1. \`t!add <text>\` - Add a new task (Mention someone to assign to them)
		    2. \`t!list\` - List all tasks(not done)
		    3. \`t!done <id in list>\` - Mark a task as done
		    4. \`t!done-list\` - List all tasks(done)
		    5. \`t!undo <id in list>\` - Unmark a task as done
		  `
      );

    return message.channel.send(embed);
  },
};
