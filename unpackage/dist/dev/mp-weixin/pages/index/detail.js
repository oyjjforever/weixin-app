"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const productInfo = common_vendor.ref({
      id: "",
      name: "北欧简约实木餐桌椅组合",
      image: "",
      description: "采用进口白橡木材质，简约大气的北欧风格设计，适合多种家居风格，打造温馨舒适的用餐环境。",
      designer: "设计师",
      rating: "4.8"
    });
    const swiperList = common_vendor.ref([
      "https://ai-public.mastergo.com/ai/img_res/1c1e7a581bc7d9c42ef0bb607f629998.jpg",
      "https://ai-public.mastergo.com/ai/img_res/c84ea737066317a8897310195bdc631f.jpg",
      "https://ai-public.mastergo.com/ai/img_res/9d886b79a87c8166e8abefb2781eee5c.jpg"
    ]);
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      if (options) {
        productInfo.value = {
          id: options.id || "",
          name: decodeURIComponent(options.name || "北欧简约实木餐桌椅组合"),
          image: decodeURIComponent(options.image || ""),
          description: decodeURIComponent(options.description || "采用进口白橡木材质，简约大气的北欧风格设计，适合多种家居风格，打造温馨舒适的用餐环境。"),
          designer: decodeURIComponent(options.designer || "设计师"),
          rating: options.rating || "4.8"
        };
        if (productInfo.value.image) {
          swiperList.value.unshift(productInfo.value.image);
        }
      }
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const toggleFavorite = () => {
      common_vendor.index.showToast({
        title: "收藏成功",
        icon: "success"
      });
    };
    const handleShare = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true
      });
    };
    const previewImage = () => {
      common_vendor.index.previewImage({
        urls: swiperList,
        current: swiperList[0]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          type: "back",
          size: "24",
          color: "#ffffff"
        }),
        c: common_vendor.o(toggleFavorite),
        d: common_vendor.p({
          type: "star",
          size: "24",
          color: "#ffffff"
        }),
        e: common_vendor.o(handleShare),
        f: common_vendor.p({
          type: "redo",
          size: "24",
          color: "#ffffff"
        }),
        g: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        h: common_vendor.o(previewImage),
        i: common_vendor.t(productInfo.value.name),
        j: common_vendor.p({
          type: "star-filled",
          size: "14",
          color: "#FFB800"
        }),
        k: common_vendor.t(productInfo.value.rating),
        l: common_vendor.t(productInfo.value.description),
        m: common_vendor.t(productInfo.value.designer)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
