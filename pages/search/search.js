var a = getApp(), t = require("../../utils/api/search.js");

Page({
    data: {
        isIPX: a.isIPX,
        Android: a.Android,
        state: {
            loading: !0
        },
        pageJson: {
            tag: "",
            cardStart: 0,
            cardCount: 20,
            devicePixel: 480,
            type: "WALLPAPER",
            region: "cn"
        },
        listData: []
    },
    onLoad: function(a) {
        var t = this;
        a.tag && (t.setData({
            "pageJson.tag": a.tag
        }), t.inGetList());
    },
    inReset: function() {
        this.setData({
            listData: [],
            "pageJson.cardStart": 0,
            "state.loading": !0
        });
    },
    inConfirm: function(a) {
        var t = this;
        t.setData({
            "pageJson.tag": a.detail.detail.value
        }), t.inReset(), t.inGetList();
    },
    inGetList: function(a) {
        var e = this, s = e.data, i = s.state, n = s.pageJson, r = s.listData;
        i.loading && t.get({
            load: !1,
            data: n,
            success: function(a) {
                var t = a.apiData.cards[0].products;
                if (t.length) {
                    for (var s in t) "ios" == wx.getSystemInfoSync().platform && (t[s].imageUrl = t[s].imageUrl.replace("/webp/", "/jpeg/")), 
                    r.push(t[s]), s + 1 == t.length && s + 1 < n.cardCount && e.setData({
                        "state.loading": !1
                    });
                    e.setData({
                        "pageJson.cardStart": n.cardStart + 1,
                        listData: r
                    });
                } else e.setData({
                    "state.loading": !1
                });
            }
        });
    },
    inToSeeImg: function(a) {
        var t = a.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/see-img/see-img?src=" + t.src
        });
    },
    onShareAppMessage: function() {
        return {
            title: "这些壁纸你喜欢吗？",
            path: "pages/search/search?tag=" + this.data.pageJson.tag
        };
    }
});