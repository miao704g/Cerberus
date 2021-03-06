import Command from './command.js'
import { serverConfig, globalPrefix } from '../index.js';

export default new class extends Command {
  name = 'set';

  async execute(msg, ...args) {
    if(!msg.guild.member(msg.author).hasPermission('MANAGE_SERVER')) return;

    const checkAutomodOnOff = await serverConfig.get(`${msg.guild.id}-AutomodSetting`);
    const badList = await serverConfig.get(`${msg.guild.id}-AutomodList`);
    
    switch(args[0]) {
      case "prefix":
        if (typeof args[1] === "string") {
          await serverConfig.set(`${msg.guild.id}-Prefix`, args[1]);
          msg.channel.send(`Successfully set prefix to \`${args[1]}\``);
        } else msg.channel.send(`Prefix is \`${await serverConfig.get(`${msg.guild.id}-prefix`) || globalPrefix}\``);
        break;

      case "automod":
        if(typeof args[1] === "string") {
          switch(args[1]) {
            case 'add':
              var oldBadArray = await serverConfig.get(`${msg.guild.id}-AutomodList`);

              const joinBadArray = args.join(' ').slice(args[0].length+args[1].length+2);
              const addBadArray = joinBadArray.split(' ');
              var newBadArray;

              if(!oldBadArray || oldBadArray == addBadArray) {
                newBadArray = addBadArray
              }
              else {
                newBadArray = oldBadArray.concat(addBadArray);
              }
              

              await serverConfig.set(`${msg.guild.id}-AutomodList`, [newBadArray]);
              break;

            case 'on':
              if(checkAutomodOnOff) return msg.channel.send('Automatic Moderation is already ON!');
              await serverConfig.set(`${msg.guild.id}-AutomodSetting`, true);
              msg.channel.send('Automatic Moderation is now ON.');
              break;

            case 'off':
              if(!checkAutomodOnOff) return msg.channel.send('Automatic Moderation is already OFF!');
              await serverConfig.set(`${msg.guild.id}-AutomodSetting`, false);
              msg.channel.send('Automatic Moderation is now OFF.');
              break;
          }
        } else if(checkAutomodOnOff) msg.channel.send(`The forbidden words are \`${badList}\``);
        break;

      case "welcomeChannel":
        const setChannel = await serverConfig.get(`${msg.guild.id}-WelcomeChannel`);
        const channelID = args.join(' ').slice(args[0].length+3, -1); //find channel ID in message content
        const channel = await msg.guild.channels.cache.get(channelID) || await msg.guild.channels.cache.get(setChannel); //get channel properties

        if(!channelID) return msg.channel.send(`The welcome channel is \`${channel.name}\``);

        serverConfig.set(`${msg.guild.id}-WelcomeChannel`, channelID);
        msg.channel.send(`Successfully set the welcome channel name to \`${channel.name}\``)
        break;
      
      /*case "blacklistChannel": [[WIP]]
        const blacklisted = args.join(' ').slice(args[0].length+1);*/
    }
  }
}