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
    const isFavorite = common_vendor.ref(false);
    const showBackToTop = common_vendor.ref(false);
    const loading = common_vendor.ref(false);
    const caseId = common_vendor.ref("");
    const caseInfo = common_vendor.ref({});
    const mainImages = common_vendor.ref([]);
    const sceneImages = common_vendor.ref([]);
    const furnitureCategories = common_vendor.ref([]);
    const designerSuggestions = common_vendor.ref([]);
    const colorPalette = common_vendor.ref([]);
    const overallRating = common_vendor.ref(4.8);
    const userReviews = common_vendor.ref([]);
    const similarCases = common_vendor.ref([]);
    const getCaseDetail = async (id) => {
      if (!id)
        return;
      loading.value = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getCaseDetail",
          data: { id }
        });
        if (result.result.code === 0) {
          const caseData = result.result.data;
          caseInfo.value = {
            title: caseData.title,
            roomType: caseData.roomType,
            area: caseData.area,
            style: caseData.style,
            ownerIntro: caseData.ownerIntro
          };
          if (caseData.mainImages && caseData.mainImages.length > 0) {
            mainImages.value = caseData.mainImages;
          }
          if (caseData.sceneImages && caseData.sceneImages.length > 0) {
            sceneImages.value = caseData.sceneImages;
          }
          if (caseData.furnitureCategories && caseData.furnitureCategories.length > 0) {
            furnitureCategories.value = caseData.furnitureCategories;
          }
          if (caseData.designerSuggestions && caseData.designerSuggestions.length > 0) {
            designerSuggestions.value = caseData.designerSuggestions;
          }
          if (caseData.colorPalette && caseData.colorPalette.length > 0) {
            colorPalette.value = caseData.colorPalette;
          }
          if (caseData.overallRating) {
            overallRating.value = caseData.overallRating;
          }
          if (caseData.userReviews && caseData.userReviews.length > 0) {
            userReviews.value = caseData.userReviews;
          }
          if (caseData.similarCases && caseData.similarCases.length > 0) {
            similarCases.value = caseData.similarCases;
          }
          if (caseData.isFavorite !== void 0) {
            isFavorite.value = caseData.isFavorite;
          }
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "获取案例详情失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/case/detail.vue:295", "获取案例详情失败:", error);
        common_vendor.index.showToast({
          title: "网络错误，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const previewImage = (index) => {
      const urls = sceneImages.value.map((item) => item.image);
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    };
    const viewProductDetail = (product) => {
      if (product.id) {
        common_vendor.index.navigateTo({
          url: `/pages/index/detail?id=${product.id}`
        });
      } else {
        common_vendor.index.showToast({
          title: "产品信息不完整",
          icon: "none"
        });
      }
    };
    const consultDesigner = () => {
      common_vendor.index.showToast({
        title: "正在连接设计师",
        icon: "loading"
      });
    };
    const viewMoreReviews = () => {
      common_vendor.index.showToast({
        title: "查看更多评价",
        icon: "none"
      });
    };
    const scrollToTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    const previewReviewImage = (images, index) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[index]
      });
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      if (options && options.id) {
        caseId.value = options.id;
        getCaseDetail(options.id);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(mainImages.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.t(caseInfo.value.title),
        c: common_vendor.t(caseInfo.value.roomType),
        d: common_vendor.t(caseInfo.value.area),
        e: common_vendor.t(caseInfo.value.style),
        f: common_vendor.t(caseInfo.value.ownerIntro),
        g: common_vendor.f(sceneImages.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: item.productTag
          }, item.productTag ? {
            c: common_vendor.t(item.productTag)
          } : {}, {
            d: index,
            e: common_vendor.o(($event) => previewImage(index), index)
          });
        }),
        h: common_vendor.f(furnitureCategories.value, (category, categoryIndex, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: common_vendor.f(category.products, (product, productIndex, i1) => {
              return {
                a: product.image,
                b: common_vendor.t(product.name),
                c: common_vendor.t(product.description),
                d: common_vendor.t(product.price),
                e: productIndex,
                f: common_vendor.o(($event) => viewProductDetail(product), productIndex)
              };
            }),
            c: categoryIndex
          };
        }),
        i: common_vendor.f(designerSuggestions.value, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        j: common_vendor.f(colorPalette.value, (color, index, i0) => {
          return {
            a: common_vendor.t(color.name),
            b: index,
            c: color.hex
          };
        }),
        k: common_vendor.p({
          type: "star-filled",
          size: "16",
          color: "#FFB800"
        }),
        l: common_vendor.t(overallRating.value),
        m: common_vendor.f(userReviews.value, (review, index, i0) => {
          return common_vendor.e({
            a: review.avatar,
            b: common_vendor.t(review.username),
            c: common_vendor.f(5, (star, k1, i1) => {
              return {
                a: star,
                b: "1447c843-1-" + i0 + "-" + i1,
                c: common_vendor.p({
                  type: star <= review.rating ? "star-filled" : "star",
                  size: "12",
                  color: "#FFB800"
                })
              };
            }),
            d: common_vendor.t(review.content),
            e: review.images
          }, review.images ? {
            f: common_vendor.f(review.images, (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img,
                c: common_vendor.o(($event) => previewReviewImage(review.images, imgIndex), imgIndex)
              };
            })
          } : {}, {
            g: index
          });
        }),
        n: common_vendor.o(viewMoreReviews),
        o: common_vendor.p({
          type: "chat",
          size: "20",
          color: "#ffffff"
        }),
        p: common_vendor.o(consultDesigner),
        q: common_vendor.p({
          type: "up",
          size: "24",
          color: "#ffffff"
        }),
        r: showBackToTop.value,
        s: common_vendor.o(scrollToTop)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/case/detail.js.map
