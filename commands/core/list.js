const Task = require("../../models/Task")
const Discord = require("discord.js")
module.exports = {
	name: "list",
	description: "list of all tasks added to the bot",
	async run (client, message, args) {

		const tasks = await Task.findAll({
			where: {
			  archive: false,
			  isDone: false,
			  serverId: message.guild.id,
			},
			attributes: ["id", "text", "assignTo"],
		      });
		
		      let messageContent = tasks
			.map((task, idx) => {
			  if (task.assignTo) {
			    return `${idx + 1}. ${task.text} - <@${task.assignTo}> - ${
			      task.id
			    }\n`;
			  } else {
			    return `${idx + 1}. ${task.text} - ${task.id}\n`;
			  }
			})
			.join("");
		
		      const embed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Task List (Not Done)")
			.setDescription(
			  messageContent +
			    "\n To tick off a task, send `t!done 1`. Replace 1 with the ID(last digit)" +
			    "\n To view tasks done, send `t!done-list`"
			);
		
		      return message.channel.send(embed);

	}}

