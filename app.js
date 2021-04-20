App({
    isIPX: -1 == wx.getSystemInfoSync().model.indexOf("iPhone X") ? "" : "isIPX",
    Android: -1 == wx.getSystemInfoSync().system.indexOf("Android") ? "" : "Android",
    onLaunch: function() {}
});