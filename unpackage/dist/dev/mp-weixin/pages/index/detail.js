"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const productInfo = common_vendor.ref();
    const swiperList = common_vendor.ref([]);
    const getProductDetail = async (productId) => {
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getProductDetail",
          data: { id: productId }
        });
        if (result.result.code === 0) {
          const product = result.result.data;
          productInfo.value = {
            id: product._id,
            name: product.name,
            image: product.image,
            description: product.description,
            designer: product.designer,
            rating: product.rating,
            price: product.price,
            sales: product.sales,
            size: product.size,
            material: product.material,
            color: product.color,
            features: product.features || [],
            sceneDesc: product.sceneDesc
          };
          if (product.image) {
            swiperList.value.unshift(product.image);
          }
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/detail.vue:122", "获取产品详情失败:", error);
      }
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      if (options && options.id) {
        getProductDetail(options.id);
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
        j: common_vendor.t(productInfo.value.price),
        k: common_vendor.t(productInfo.value.sales),
        l: common_vendor.p({
          type: "star-filled",
          size: "14",
          color: "#FFB800"
        }),
        m: common_vendor.t(productInfo.value.rating),
        n: common_vendor.t(productInfo.value.description),
        o: common_vendor.t(productInfo.value.designer),
        p: common_vendor.t(productInfo.value.size),
        q: common_vendor.t(productInfo.value.material),
        r: common_vendor.t(productInfo.value.color),
        s: common_vendor.f(productInfo.value.features, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        t: common_vendor.t(productInfo.value.sceneDesc)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
