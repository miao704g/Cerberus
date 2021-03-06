import Command from './command.js';

import fetch from 'node-fetch';

import { DefaultEmbed } from '../content/embeds/defaultEmbed.js';
import { MediaEmbed } from '../content/embeds/mediaEmbed.js';
const embed = new DefaultEmbed();
const mediaEmbed = new MediaEmbed();

export default new class extends Command {
  name = 'neko';
  nsfw = true;

  async execute(msg, ...args) {

    const { neko } = await fetch('https://www.nekos.life/api/lewd/neko')
      .then(res => res.json())
    
    mediaEmbed.send(neko, '0xFF00CC', msg.channel);
  }
}