import Command from './command.js';

import fetch from 'node-fetch';

import { DefaultEmbed } from '../content/embeds/defaultEmbed.js';
import { MediaEmbed } from '../content/embeds/mediaEmbed.js';
const embed = new DefaultEmbed();
const mediaEmbed = new MediaEmbed();

export default new class extends Command {
  name = 'hentaigif';
  nsfw = true;

  async execute(msg, ...args) {

    const { url } = await fetch('https://nekos.life/api/v2/img/Random_hentai_gif')
      .then(res => res.json())
    
    mediaEmbed.send(url, '0xFF00CC', msg.channel);
  }
}