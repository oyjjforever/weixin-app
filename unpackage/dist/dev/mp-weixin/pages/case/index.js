"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const showBackToTop = common_vendor.ref(false);
    const selectedFilter = common_vendor.ref("all");
    const filterOptions = common_vendor.ref([
      { label: "全部", value: "all" },
      { label: "现代简约", value: "modern" },
      { label: "北欧风格", value: "nordic" },
      { label: "中式风格", value: "chinese" },
      { label: "美式风格", value: "american" },
      { label: "欧式风格", value: "european" }
    ]);
    const caseList = common_vendor.ref([
      {
        id: 1,
        title: "现代简约三居室设计",
        description: "采用简约现代的设计理念，以白色和木色为主调，营造温馨舒适的居住环境",
        image: "https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg",
        price: "28999",
        area: "120㎡",
        roomType: "三居室",
        designer: "张设计师",
        style: "modern"
      },
      {
        id: 2,
        title: "北欧风格两居室",
        description: "清新自然的北欧风格，注重功能性与美观性的完美结合",
        image: "https://ai-public.mastergo.com/ai/img_res/64153c8d255ea1f3bc247cc53467c7fc.jpg",
        price: "22999",
        area: "85㎡",
        roomType: "两居室",
        designer: "李设计师",
        style: "nordic"
      },
      {
        id: 3,
        title: "轻奢美式四居室",
        description: "融合现代与传统的美式风格，展现优雅与舒适的生活品味",
        image: "https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg",
        price: "45999",
        area: "150㎡",
        roomType: "四居室",
        designer: "王设计师",
        style: "american"
      },
      {
        id: 4,
        title: "新中式风格别墅",
        description: "传统文化与现代生活的完美融合，彰显东方美学魅力",
        image: "https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg",
        price: "68999",
        area: "200㎡",
        roomType: "别墅",
        designer: "陈设计师",
        style: "chinese"
      },
      {
        id: 5,
        title: "欧式古典大宅",
        description: "奢华典雅的欧式风格，每一处细节都体现贵族气质",
        image: "https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg",
        price: "89999",
        area: "280㎡",
        roomType: "大宅",
        designer: "刘设计师",
        style: "european"
      },
      {
        id: 6,
        title: "工业风格loft",
        description: "粗犷与精致并存的工业风格，展现个性化的生活态度",
        image: "https://ai-public.mastergo.com/ai/img_res/1c1e7a581bc7d9c42ef0bb607f629998.jpg",
        price: "35999",
        area: "110㎡",
        roomType: "Loft",
        designer: "赵设计师",
        style: "industrial"
      }
    ]);
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const selectFilter = (value) => {
      var _a;
      selectedFilter.value = value;
      common_vendor.index.showToast({
        title: `筛选：${(_a = filterOptions.value.find((item) => item.value === value)) == null ? void 0 : _a.label}`,
        icon: "none"
      });
    };
    const viewDetail = (caseItem) => {
      common_vendor.index.navigateTo({
        url: `/pages/case/detail?id=${caseItem.id}&title=${encodeURIComponent(caseItem.title)}`
      });
    };
    const loadMore = () => {
      if (loading.value || !hasMore.value)
        return;
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        hasMore.value = false;
      }, 1e3);
    };
    const scrollToTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "back",
          size: "24",
          color: "#333"
        }),
        b: common_vendor.o(goBack),
        c: common_vendor.p({
          type: "search",
          size: "24",
          color: "#333"
        }),
        d: common_vendor.f(filterOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: selectedFilter.value === item.value ? 1 : "",
            d: common_vendor.o(($event) => selectFilter(item.value), index)
          };
        }),
        e: common_vendor.f(caseList.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.roomType),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.description),
            e: "91447836-2-" + i0,
            f: common_vendor.t(item.area),
            g: "91447836-3-" + i0,
            h: common_vendor.t(item.designer),
            i: common_vendor.t(item.price),
            j: "91447836-4-" + i0,
            k: common_vendor.o(($event) => viewDetail(item), index),
            l: index,
            m: common_vendor.o(($event) => viewDetail(item), index)
          };
        }),
        f: common_vendor.p({
          type: "home",
          size: "14",
          color: "#999"
        }),
        g: common_vendor.p({
          type: "person",
          size: "14",
          color: "#999"
        }),
        h: common_vendor.p({
          type: "right",
          size: "14",
          color: "#666"
        }),
        i: hasMore.value
      }, hasMore.value ? {} : caseList.value.length > 0 ? {} : {}, {
        j: caseList.value.length > 0,
        k: caseList.value.length === 0 && !loading.value
      }, caseList.value.length === 0 && !loading.value ? {
        l: common_vendor.p({
          type: "info",
          size: "48",
          color: "#ccc"
        })
      } : {}, {
        m: common_vendor.o(loadMore),
        n: common_vendor.p({
          type: "up",
          size: "24",
          color: "#ffffff"
        }),
        o: showBackToTop.value,
        p: common_vendor.o(scrollToTop)
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
wx.createPage(_sfc_defineComponent);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/case/index.js.map
