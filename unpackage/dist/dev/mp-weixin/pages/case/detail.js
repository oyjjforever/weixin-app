"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const isFavorite = common_vendor.ref(false);
    const showBackToTop = common_vendor.ref(false);
    const showQuickNav = common_vendor.ref(false);
    const caseInfo = common_vendor.ref({
      title: "现代简约三居室设计",
      roomType: "三居室",
      area: "120㎡",
      style: "现代简约",
      ownerIntro: "业主是一对年轻夫妇，喜欢简约现代的设计风格，希望打造一个温馨舒适的家居环境。整体设计以白色和木色为主调，营造出清新自然的居住氛围。"
    });
    const mainImages = common_vendor.ref([
      "https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg",
      "https://ai-public.mastergo.com/ai/img_res/64153c8d255ea1f3bc247cc53467c7fc.jpg",
      "https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg"
    ]);
    const sceneImages = common_vendor.ref([
      { image: "https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg", productTag: "北欧沙发" },
      { image: "https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg", productTag: "实木餐桌" },
      { image: "https://ai-public.mastergo.com/ai/img_res/1c1e7a581bc7d9c42ef0bb607f629998.jpg", productTag: "现代床具" }
    ]);
    const furnitureCategories = common_vendor.ref([
      {
        name: "客厅家具",
        products: [
          { name: "北欧布艺沙发", description: "舒适透气，简约设计", price: "3299", image: "https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg" },
          { name: "实木茶几", description: "天然木纹，环保材质", price: "1299", image: "https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg" }
        ]
      },
      {
        name: "餐厅家具",
        products: [
          { name: "现代餐桌椅", description: "简约时尚，实用美观", price: "2899", image: "https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg" }
        ]
      }
    ]);
    const designerSuggestions = common_vendor.ref(["简约实用", "色彩和谐", "空间通透", "收纳充足"]);
    const colorPalette = common_vendor.ref([
      { name: "主色调", hex: "#f8f9fa" },
      { name: "辅助色", hex: "#6c757d" },
      { name: "点缀色", hex: "#ff4757" }
    ]);
    const overallRating = common_vendor.ref(4.8);
    const userReviews = common_vendor.ref([
      {
        username: "张女士",
        avatar: "https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg",
        rating: 5,
        content: "设计师的搭配很棒，整体效果超出预期！",
        images: ["https://ai-public.mastergo.com/ai/img_res/1c1e7a581bc7d9c42ef0bb607f629998.jpg"]
      }
    ]);
    const similarCases = common_vendor.ref([
      { name: "北欧风格案例", image: "https://ai-public.mastergo.com/ai/img_res/c84ea737066317a8897310195bdc631f.jpg" },
      { name: "现代简约案例", image: "https://ai-public.mastergo.com/ai/img_res/9d886b79a87c8166e8abefb2781eee5c.jpg" }
    ]);
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
      common_vendor.index.showToast({
        title: `查看${caseItem.name}`,
        icon: "none"
      });
    };
    const scrollToTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    };
    const scrollToSection = (sectionId) => {
      common_vendor.index.showToast({
        title: `跳转到${sectionId}`,
        icon: "none"
      });
    };
    const previewReviewImage = (images, index) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[index]
      });
    };
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
                b: "66a46f64-4-" + i0 + "-" + i1,
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
        F: common_vendor.o(scrollToTop),
        G: common_vendor.o(($event) => scrollToSection("case-content")),
        H: common_vendor.o(($event) => scrollToSection("furniture")),
        I: common_vendor.o(($event) => scrollToSection("suggestion")),
        J: common_vendor.o(($event) => scrollToSection("review")),
        K: showQuickNav.value
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/case/detail.js.map
