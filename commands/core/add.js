const Task = require("../../models/Task")
const Discord = require("discord.js")
module.exports = {
	name: "add",
	description: "add task to the bot",
	async run (client, message, args) {

		

		try {
			const splitArgs = args.split(" ");
			const textWithTaggedUser = splitArgs.join(" ");
			// Replace tagged users with ""
			const rg = /<@\![0-9]{1,}>/;
			const text = textWithTaggedUser.replace(rg, "");
		
			// Get Tagged User (first) to assign
			const taggedUser = message.mentions.users.first();
			let taggedUserId = "";
			if (taggedUser) {
			  taggedUserId = taggedUser.id;
			}
		
			const serverId = message.guild.id;
		
			const newTask = await Task.create({
			  text,
			  serverId,
			  assignTo: taggedUserId,
			});
		
			const embed = new Discord.MessageEmbed()
			  .setColor("#0099ff")
			  .setTitle("Added")
			  .setDescription(`Task ${newTask.text} was added`);
			return message.channel.send(embed);
		      } catch (error) {
			console.error(error.toString());
			return message.channel.send("Couldn't create task");
		      }

	}}










