const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);
const db = require('quick.db');

module.exports = {
  name: `help`,
  description: "(h)Gives you a list of all help Commands",
  aliases: ["h","commands"],
  cooldown: 3,
  edesc: "Type help to get a short preview of all Commands, Type help <COMMANDNAME> to get extended information about this one command!",
  async execute(message,args,client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;
    //react with approve emoji
    message.react("769665713124016128");
    //define the commands as a command
    let commands = message.client.commands.array();
    //define the help embed
    let helpEmbed = new MessageEmbed()
      .setTitle(`List of all commands`)
      .setDescription("__**```List of all commands```**__")
       .setImage('')
       .setFooter(message.author.username, message.author.displayAvatarURL)
       .setDescription(`**[  SUPPORT  ](https://discord.gg/Cc2xg2AEjd)**   -  [   INVITE   ](https://discord.com/oauth2/authorize?client_id=792047204361175091&permissions=1076131920&scope=bot)`)
      .setThumbnail(message.author.avatarURL({dynamic: "true"}))
      .setColor('RANDOM');
    //define argstrue to negative
    let ifargstruedothis = -1;

      switch(args[0]){
          case "filter":
           ifargstruedothis=0;
          break;
          case "loop":
            ifargstruedothis=1;
          break;
          case "lyrics":
            ifargstruedothis=2
          break;
          case "nowplaying":
            ifargstruedothis=3
          break;
          case "pause":
            ifargstruedothis=4
          break;
          case "play":
            ifargstruedothis=5
          break;
          case "playlist":
            ifargstruedothis=6
          break;
          case "queue":
            ifargstruedothis=7
          break;
          case "radio":
            ifargstruedothis=8
          break;
          case "remove":
            ifargstruedothis=9
          break; 
          case "resume":
            ifargstruedothis=10
          break;
          case "search":
            ifargstruedothis=11
          break;
          case "shuffle":
            ifargstruedothis=12
          break;
          case "skip":
            ifargstruedothis=13
          break;
          case "skipto":
            ifargstruedothis=14
          break;
          case "stop":
            ifargstruedothis=15
          break;
          case "volume":
            ifargstruedothis=16
          break;
          case "botlist":
            ifargstruedothis=17
          break;
          case "help":
            ifargstruedothis=18
          break;
          case "invite":
            ifargstruedothis=19
          break;
          case "ping":
            ifargstruedothis=20
          break;
          case "prefix":
            ifargstruedothis=21
          break;
          case "uptime":
            ifargstruedothis=22
          break;
          default:
            commands.forEach((cmd) => {
              helpEmbed.addField(
                `**${prefix}${cmd.name}**`,
                `${cmd.description}`,
                true
              );
            });
          if(!message.guild) {
            if(!args[0]) {message.react(approveemoji);return message.channel.send(helpEmbed);}
            return
            }
            message.react(approveemoji);
message.channel.send(helpEmbed)

        break;
       }

       if(ifargstruedothis>=0){
         let aliases = commands[ifargstruedothis].aliases;
         if(aliases === undefined || !aliases) aliases="No Aliases!";
         let cooldown = commands[ifargstruedothis].cooldown;
         if(cooldown === undefined || !cooldown) cooldown="No Cooldown!";


        helpEmbed.addField(
          `**${prefix}${commands[ifargstruedothis].name}**`,
          `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
        );
        helpEmbed.addField(
          `**:notes: Aliases:**`,
          `\`${aliases}\``
        );
        helpEmbed.addField(
          `**:wrench: Cooldown:**`,
          `\`${cooldown}\``
        );
        if(!message.guild) return message.author.send(helpEmbed);
          message.author.send(helpEmbed)
          message.channel.send( new MessageEmbed().setColor("#c219d8")
        .setDescription(`**👍 ${message.author} Check your \`direct messages\` for a list of Commands!**`)
          );
       }

}
}
