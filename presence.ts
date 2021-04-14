const presence = new Presence({
    clientId: "831791414660300841" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });
  var browsingStamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
   const set_showButtons = await presence.getSetting("showButtons");

  const presenceData: PresenceData = {
    largeImageKey:
      "stalklogo2" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey:
      "stalklogo" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,//If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

  presenceData.startTimestamp = browsingStamp

  if (document.location.pathname == "/guilds") {
      presenceData.smallImageText = "stalk.live"
    presenceData.details = "Ana Sayfada";
  } else if(document.location.pathname.startsWith("/search")) {
      presenceData.details = "Arama Yapıyor"
  } else if(document.location.pathname !== "/guilds" && document.location.pathname.startsWith("/guilds")) {
      presenceData.details = document.title
      presenceData.smallImageText = "Sunucu Gozetliyor"
      if(set_showButtons) {
        presenceData.buttons = [
            {
                label:"Sunucuya Bak", 
                url: window.location.href
            }
        ]
      }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }

});