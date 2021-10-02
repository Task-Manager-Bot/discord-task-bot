const Task = require("../../models/Task")
const Discord = require("discord.js")
module.exports = {
	name: "undo",
	description: "Simple undo command",
	async run (client, message, args) {
		const splitArgs = args.split(" ");
		const id = parseInt(splitArgs.shift());
	  
		if (!id) {
		  const errorEmbed = new Discord.MessageEmbed()
		    .setColor("#0099ff")
		    .setTitle("Error")
		    .setDescription(
		      "You need to enter the id of the task to add it back\n" +
			"Enter `t!help` for help"
		    );
		  return message.channel.send(errorEmbed);
		}
		const task = await Task.findByPk(id);
		if (task.serverId === message.guild.id) {
		  await Task.update(
		    { isDone: false },
		    {
		      where: {
			id,
		      },
		    }
		  );
		} else {
		  const errorEmbed = new Discord.MessageEmbed()
		    .setColor("#0099ff")
		    .setTitle("Error")
		    .setDescription(
		      "You can only add a task back from the current server"
		    );
		  return message.channel.send(errorEmbed);
		}
		const embed = new Discord.MessageEmbed()
		  .setColor("#0099ff")
		  .setTitle("Undo")
		  .setDescription(
		    `Task with id ${id} has been added back to your todo list`
		  );
		return message.channel.send(embed);
	}}