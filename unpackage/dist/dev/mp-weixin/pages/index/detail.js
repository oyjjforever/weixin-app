"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const productInfo = common_vendor.ref({});
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
            const images = Array.isArray(product.image) ? product.image : [product.image];
            swiperList.value = images;
          }
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/detail.vue:123", "获取产品详情失败:", error);
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
    const previewImage = () => {
      common_vendor.index.previewImage({
        urls: swiperList,
        current: swiperList[0]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.o(previewImage),
        c: common_vendor.t(productInfo.value.name),
        d: common_vendor.t(productInfo.value.price),
        e: common_vendor.t(productInfo.value.sales),
        f: common_vendor.p({
          type: "star-filled",
          size: "14",
          color: "#FFB800"
        }),
        g: common_vendor.t(productInfo.value.rating),
        h: common_vendor.t(productInfo.value.description),
        i: common_vendor.t(productInfo.value.designer),
        j: common_vendor.t(productInfo.value.size),
        k: common_vendor.t(productInfo.value.material),
        l: common_vendor.t(productInfo.value.color),
        m: common_vendor.f(productInfo.value.features, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        n: common_vendor.t(productInfo.value.sceneDesc)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
