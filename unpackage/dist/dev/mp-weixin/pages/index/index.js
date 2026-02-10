"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (NoticeSwiper + _easycom_uni_icons)();
}
const NoticeSwiper = () => "../../components/NoticeSwiper.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const productList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const getNoticeList = async () => {
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getNoticeList",
          data: {
            limit: 5
          }
        });
        if (result.result.code === 0) {
          noticeList.value = result.result.data.notices || [];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:126", "获取通知列表失败:", error);
      }
    };
    const getProductList = async () => {
      loading.value = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getProductList",
          data: {
            page: 1,
            pageSize: 20
          }
        });
        if (result.result.code === 0) {
          const { products, banners } = result.result.data;
          productList.value = products || [];
          swiperList.value = banners || [];
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "获取数据失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:153", "获取产品列表失败:", error);
        common_vendor.index.showToast({
          title: "网络错误，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      getNoticeList();
      getProductList();
    });
    const handleNoticeClick = (notice) => {
      const { linkType, linkUrl, _id } = notice;
      switch (linkType) {
        case "page":
          common_vendor.index.navigateTo({
            url: linkUrl,
            fail: () => {
              common_vendor.index.switchTab({
                url: linkUrl,
                fail: () => {
                  common_vendor.index.showToast({
                    title: "页面跳转失败",
                    icon: "none"
                  });
                }
              });
            }
          });
          break;
        case "url":
          common_vendor.index.showModal({
            title: "提示",
            content: "是否在浏览器中打开链接？",
            success: (res) => {
              if (res.confirm) {
                plus.runtime.openURL(linkUrl);
              }
            }
          });
          break;
        case "product":
          common_vendor.index.navigateTo({
            url: `/pages/index/detail?id=${linkUrl}`,
            fail: () => {
              common_vendor.index.showToast({
                title: "产品详情跳转失败",
                icon: "none"
              });
            }
          });
          break;
        case "none":
        default:
          common_vendor.index.navigateTo({
            url: `/pages/notice/detail?id=${_id}`,
            fail: () => {
              common_vendor.index.showToast({
                title: "通知详情跳转失败",
                icon: "none"
              });
            }
          });
          break;
      }
    };
    const goToDetail = (product) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/detail?id=${product._id || product.id}`
      });
    };
    const viewCaseList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/case/index"
      });
    };
    const refreshData = () => {
      getNoticeList();
      getProductList();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleNoticeClick),
        b: common_vendor.p({
          noticeList: noticeList.value
        }),
        c: common_vendor.p({
          type: "back",
          size: "24",
          color: "#333"
        }),
        d: common_vendor.p({
          type: "search",
          size: "24",
          color: "#333"
        }),
        e: common_vendor.p({
          type: "notification",
          size: "24",
          color: "#333"
        }),
        f: swiperList.value.length > 0
      }, swiperList.value.length > 0 ? {
        g: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.description),
            d: "0a57c708-4-" + i0,
            e: common_vendor.p({
              type: item.isFavorite ? "heart-filled" : "heart",
              size: "24",
              color: "#ff4757"
            }),
            f: index
          };
        })
      } : !loading.value ? {
        i: common_vendor.p({
          type: "image",
          size: "48",
          color: "#d9d9d9"
        })
      } : {}, {
        h: !loading.value,
        j: common_vendor.o(viewCaseList),
        k: common_vendor.f(productList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: common_vendor.t(item.designer),
            e: "0a57c708-6-" + i0,
            f: common_vendor.t(item.duration),
            g: common_vendor.t(item.difficulty),
            h: "0a57c708-7-" + i0,
            i: common_vendor.t(item.rating),
            j: "0a57c708-8-" + i0,
            k: common_vendor.p({
              type: item.isFavorite ? "heart-filled" : "heart",
              size: "20",
              color: "#ff4757"
            }),
            l: index,
            m: common_vendor.o(($event) => goToDetail(item), index)
          };
        }),
        l: common_vendor.p({
          type: "calendar",
          size: "14",
          color: "#999"
        }),
        m: common_vendor.p({
          type: "star",
          size: "14",
          color: "#ff4757"
        }),
        n: productList.value.length === 0 && !loading.value
      }, productList.value.length === 0 && !loading.value ? {
        o: common_vendor.p({
          type: "shop",
          size: "64",
          color: "#d9d9d9"
        }),
        p: common_vendor.o(refreshData)
      } : {}, {
        q: loading.value
      }, loading.value ? {
        r: common_vendor.p({
          type: "spinner-cycle",
          size: "32",
          color: "#999"
        })
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
