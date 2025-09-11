"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref([
      {
        image: "https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg",
        title: "现代简约客厅",
        description: "打造舒适优雅的生活空间，细节彰显品质",
        isFavorite: true
      },
      {
        image: "https://ai-public.mastergo.com/ai/img_res/64153c8d255ea1f3bc247cc53467c7fc.jpg",
        title: "精致厨房设计",
        description: "高端定制厨房，让烹饪更有格调",
        isFavorite: false
      }
    ]);
    const productList = common_vendor.ref([
      {
        id: 1,
        image: "https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg",
        name: "北欧风卧室套装",
        description: "简约舒适的卧室空间，采用环保材质，打造温馨睡眠环境",
        designer: "张大师",
        duration: "45天",
        difficulty: "中等",
        rating: "4.8",
        isFavorite: true
      },
      {
        id: 2,
        image: "https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg",
        name: "轻奢浴室组合",
        description: "高品质卫浴空间，细节之处尽显品味",
        designer: "李设计",
        duration: "30天",
        difficulty: "简单",
        rating: "4.9",
        isFavorite: false
      },
      {
        id: 3,
        image: "https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg",
        name: "现代餐厅系列",
        description: "精选优质材料，打造时尚餐饮空间",
        designer: "王工作室",
        duration: "60天",
        difficulty: "较难",
        rating: "4.7",
        isFavorite: false
      }
    ]);
    const goToDetail = (product) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/detail?id=${product.id}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}&designer=${encodeURIComponent(product.designer)}&rating=${product.rating}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "back",
          size: "24",
          color: "#333"
        }),
        b: common_vendor.p({
          type: "search",
          size: "24",
          color: "#333"
        }),
        c: common_vendor.p({
          type: "notification",
          size: "24",
          color: "#333"
        }),
        d: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.description),
            d: "0a57c708-3-" + i0,
            e: common_vendor.p({
              type: item.isFavorite ? "heart-filled" : "heart",
              size: "24",
              color: "#ff4757"
            }),
            f: index
          };
        }),
        e: common_vendor.f(productList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: common_vendor.t(item.designer),
            e: "0a57c708-4-" + i0,
            f: common_vendor.t(item.duration),
            g: common_vendor.t(item.difficulty),
            h: "0a57c708-5-" + i0,
            i: common_vendor.t(item.rating),
            j: "0a57c708-6-" + i0,
            k: common_vendor.p({
              type: item.isFavorite ? "heart-filled" : "heart",
              size: "20",
              color: "#ff4757"
            }),
            l: index,
            m: common_vendor.o(($event) => goToDetail(item), index)
          };
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "14",
          color: "#999"
        }),
        g: common_vendor.p({
          type: "star",
          size: "14",
          color: "#ff4757"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
