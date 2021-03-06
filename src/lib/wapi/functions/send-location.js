export async function sendLocation(
  chatId,
  latitude,
  longitude,
  location = null
) {
  var chat = await WAPI.sendExist(chatId);

  if (chat.erro === false || chat.__x_id) {
    var ListChat = await Store.Chat.get(chatId);
    var tempMsg = await Object.create(
      Store.Msg.models.filter((msg) => msg.__x_isSentByMe && !msg.quotedMsg)[0]
    );
    var newId = await window.WAPI.getNewMessageId(chatId);

    var extend = {
      ack: 0,
      id: newId,
      local: !0,
      self: 'out',
      t: parseInt(new Date().getTime() / 1000),
      to: chatId,
      isNewMsg: !0,
      type: 'location',
      lat: latitude,
      lng: longitude,
      loc: location,
      clientUrl: undefined,
      directPath: undefined,
      filehash: undefined,
      uploadhash: undefined,
      mediaKey: undefined,
      isQuotedMsgAvailable: false,
      invis: false,
      mediaKeyTimestamp: undefined,
      mimetype: undefined,
      height: undefined,
      width: undefined,
      ephemeralStartTimestamp: undefined,
      body: undefined,
      mediaData: undefined,
      isQuotedMsgAvailable: false,
    };

    Object.assign(tempMsg, extend);
    var result = await Promise.all(
      ListChat ? Store.addAndSendMsgToChat(chat, tempMsg) : ''
    );
    var m = {
        latitude: latitude,
        longitude: longitude,
        title: location,
        type: 'location',
      },
      To = await WAPI.getchatId(chat.id);
    if (result[1] == 'success' || result[1] == 'OK') {
      var obj = WAPI.scope(To, false, result[1], null);
      Object.assign(obj, m);
      return obj;
    } else {
      var obj = WAPI.scope(To, true, result[1], null);
      Object.assign(obj, m);
      return obj;
    }
  } else {
    return chat;
  }
}
