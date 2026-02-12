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
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const showBackToTop = common_vendor.ref(false);
    const selectedFilter = common_vendor.ref("all");
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const filterOptions = common_vendor.ref([
      { label: "全部", value: "all" },
      { label: "现代简约", value: "modern" },
      { label: "北欧风格", value: "nordic" },
      { label: "中式风格", value: "chinese" },
      { label: "美式风格", value: "american" },
      { label: "欧式风格", value: "european" }
    ]);
    const caseList = common_vendor.ref([]);
    const getCaseList = async (isRefresh = false) => {
      if (loading.value)
        return;
      loading.value = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getCaseList",
          data: {
            page: isRefresh ? 1 : currentPage.value,
            pageSize: pageSize.value,
            style: selectedFilter.value
          }
        });
        if (result.result.code === 0) {
          const { cases, hasMore: more } = result.result.data;
          if (isRefresh) {
            caseList.value = cases || [];
            currentPage.value = 1;
          } else {
            caseList.value = [...caseList.value, ...cases || []];
          }
          hasMore.value = more;
          currentPage.value++;
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "获取案例列表失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/case/index.vue:179", "获取案例列表失败:", error);
        common_vendor.index.showToast({
          title: "网络错误，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const selectFilter = (value) => {
      selectedFilter.value = value;
      currentPage.value = 1;
      getCaseList(true);
    };
    const viewDetail = (caseItem) => {
      common_vendor.index.navigateTo({
        url: `/pages/case/detail?id=${caseItem._id || caseItem.id}`
      });
    };
    const loadMore = () => {
      if (loading.value || !hasMore.value)
        return;
      getCaseList(false);
    };
    const scrollToTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    const resetFilter = () => {
      selectedFilter.value = "all";
      currentPage.value = 1;
      getCaseList(true);
    };
    const refreshCases = () => {
      currentPage.value = 1;
      getCaseList(true);
    };
    common_vendor.onMounted(() => {
      getCaseList(true);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(filterOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: selectedFilter.value === item.value ? 1 : "",
            d: common_vendor.o(($event) => selectFilter(item.value), index)
          };
        }),
        b: common_vendor.f(caseList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.roomType),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.description),
            e: "298d1d60-0-" + i0,
            f: common_vendor.t(item.area),
            g: "298d1d60-1-" + i0,
            h: common_vendor.t(item.designer),
            i: common_vendor.t(item.price),
            j: "298d1d60-2-" + i0,
            k: common_vendor.o(($event) => viewDetail(item), index),
            l: index,
            m: common_vendor.o(($event) => viewDetail(item), index)
          };
        }),
        c: common_vendor.p({
          type: "home",
          size: "14",
          color: "#999"
        }),
        d: common_vendor.p({
          type: "person",
          size: "14",
          color: "#999"
        }),
        e: common_vendor.p({
          type: "right",
          size: "14",
          color: "#666"
        }),
        f: hasMore.value
      }, hasMore.value ? {} : caseList.value.length > 0 ? {} : {}, {
        g: caseList.value.length > 0,
        h: caseList.value.length === 0 && !loading.value
      }, caseList.value.length === 0 && !loading.value ? {
        i: common_vendor.p({
          type: "home",
          size: "80",
          color: "#d9d9d9"
        }),
        j: common_vendor.o(resetFilter),
        k: common_vendor.o(refreshCases)
      } : {}, {
        l: loading.value && caseList.value.length === 0
      }, loading.value && caseList.value.length === 0 ? {
        m: common_vendor.p({
          type: "spinner-cycle",
          size: "40",
          color: "#999"
        })
      } : {}, {
        n: common_vendor.o(loadMore),
        o: common_vendor.p({
          type: "up",
          size: "24",
          color: "#ffffff"
        }),
        p: showBackToTop.value,
        q: common_vendor.o(scrollToTop)
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
wx.createPage(_sfc_defineComponent);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/case/index.js.map
