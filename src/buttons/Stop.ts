import { ButtonInteraction, CacheType, InteractionCollector, Message } from 'discord.js'
import { PlayerButton } from '../@types/Button.js'
import { Manager } from '../manager.js'
import { ReplyInteractionService } from '../services/ReplyInteractionService.js'
import { ExtendedPlayer } from '../structures/extended/ExtendedPlayer.js'

export default class implements PlayerButton {
  name = 'stop'
  async run(
    client: Manager,
    message: ButtonInteraction<CacheType>,
    language: string,
    player: ExtendedPlayer,
    nplaying: Message<boolean>,
    collector?: InteractionCollector<ButtonInteraction<'cached'>>
  ): Promise<any> {
    if (!player && collector) return collector.stop()

    player.data.set('sudo-destroy', true)
    const is247 = await client.db.autoreconnect.get(`${message.guildId}`)
    player.stop(is247 && is247.twentyfourseven ? false : true)

    new ReplyInteractionService(
      client,
      message,
      `${client.i18n.get(language, 'button.music', 'stop_msg')}`
    )
  }
}
