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
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;
      common_vendor.index.showToast({
        title: isFavorite.value ? "收藏成功" : "取消收藏",
        icon: "success"
      });
    };
    const handleShare = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true
      });
    };
    const previewImage = (index) => {
      const urls = sceneImages.value.map((item) => item.image);
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    };
    const addToCart = (product) => {
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
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
    const viewSimilarCase = (caseItem) => {
      if (caseItem.caseId) {
        common_vendor.index.navigateTo({
          url: `/pages/case/detail?id=${caseItem.caseId}`
        });
      } else {
        common_vendor.index.showToast({
          title: `查看${caseItem.name}`,
          icon: "none"
        });
      }
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
        b: common_vendor.p({
          type: "back",
          size: "24",
          color: "#ffffff"
        }),
        c: common_vendor.o(goBack),
        d: common_vendor.p({
          type: isFavorite.value ? "heart-filled" : "heart",
          size: "24",
          color: "#ffffff"
        }),
        e: common_vendor.o(toggleFavorite),
        f: common_vendor.p({
          type: "redo",
          size: "24",
          color: "#ffffff"
        }),
        g: common_vendor.o(handleShare),
        h: common_vendor.t(caseInfo.value.title),
        i: common_vendor.t(caseInfo.value.roomType),
        j: common_vendor.t(caseInfo.value.area),
        k: common_vendor.t(caseInfo.value.style),
        l: common_vendor.t(caseInfo.value.ownerIntro),
        m: common_vendor.f(sceneImages.value, (item, index, i0) => {
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
        n: common_vendor.f(furnitureCategories.value, (category, categoryIndex, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: common_vendor.f(category.products, (product, productIndex, i1) => {
              return {
                a: product.image,
                b: common_vendor.t(product.name),
                c: common_vendor.t(product.description),
                d: common_vendor.t(product.price),
                e: common_vendor.o(($event) => addToCart(), productIndex),
                f: productIndex
              };
            }),
            c: categoryIndex
          };
        }),
        o: common_vendor.f(designerSuggestions.value, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        p: common_vendor.f(colorPalette.value, (color, index, i0) => {
          return {
            a: common_vendor.t(color.name),
            b: index,
            c: color.hex
          };
        }),
        q: common_vendor.p({
          type: "star-filled",
          size: "16",
          color: "#FFB800"
        }),
        r: common_vendor.t(overallRating.value),
        s: common_vendor.f(userReviews.value, (review, index, i0) => {
          return common_vendor.e({
            a: review.avatar,
            b: common_vendor.t(review.username),
            c: common_vendor.f(5, (star, k1, i1) => {
              return {
                a: star,
                b: "1447c843-4-" + i0 + "-" + i1,
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
        t: common_vendor.o(viewMoreReviews),
        v: common_vendor.p({
          type: "chat",
          size: "20",
          color: "#ffffff"
        }),
        w: common_vendor.o(consultDesigner),
        x: common_vendor.p({
          type: isFavorite.value ? "heart-filled" : "heart",
          size: "20",
          color: "#ff4757"
        }),
        y: common_vendor.t(isFavorite.value ? "已收藏" : "收藏案例"),
        z: common_vendor.o(toggleFavorite),
        A: common_vendor.p({
          type: "redo",
          size: "20",
          color: "#666"
        }),
        B: common_vendor.o(handleShare),
        C: common_vendor.f(similarCases.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => viewSimilarCase(item), index)
          };
        }),
        D: common_vendor.p({
          type: "up",
          size: "24",
          color: "#ffffff"
        }),
        E: showBackToTop.value,
        F: common_vendor.o(scrollToTop)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/case/detail.js.map
