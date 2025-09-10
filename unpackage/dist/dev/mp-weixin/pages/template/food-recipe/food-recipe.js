"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      activeCategory: "breakfast",
      activeNav: "home",
      categories: [
        new UTSJSONObject({ id: "breakfast", name: "Breakfast" }),
        new UTSJSONObject({ id: "lunch", name: "Lunch" }),
        new UTSJSONObject({ id: "dinner", name: "Dinner" }),
        new UTSJSONObject({ id: "vegan", name: "Vegan" }),
        new UTSJSONObject({ id: "dessert", name: "Dessert" }),
        new UTSJSONObject({ id: "drinks", name: "Drinks" }),
        new UTSJSONObject({ id: "seafood", name: "Sea Food" })
      ],
      userRecipes: [
        new UTSJSONObject({
          id: 1,
          name: "Chicken Burger",
          image: "/static/template/food-recipe/7.png",
          rating: 5,
          time: "15min",
          favorited: true
        }),
        new UTSJSONObject({
          id: 2,
          name: "Tiramisu",
          image: "/static/template/food-recipe/10.png",
          rating: 5,
          time: "15min",
          favorited: true
        }),
        new UTSJSONObject({
          id: 3,
          name: "Pasta Salad",
          image: "/static/template/food-recipe/24.png",
          rating: 4,
          time: "20min",
          favorited: false
        }),
        new UTSJSONObject({
          id: 4,
          name: "Fruit Smoothie",
          image: "/static/template/food-recipe/25.png",
          rating: 5,
          time: "10min",
          favorited: true
        })
      ],
      topChefs: [
        new UTSJSONObject({ id: 1, name: "Joseph", avatar: "/static/template/food-recipe/14.png" }),
        new UTSJSONObject({ id: 2, name: "Andrew", avatar: "/static/template/food-recipe/15.png" }),
        new UTSJSONObject({ id: 3, name: "Emily", avatar: "/static/template/food-recipe/16.png" }),
        new UTSJSONObject({ id: 4, name: "Jessica", avatar: "/static/template/food-recipe/17.png" })
      ],
      recentlyAdded: [
        new UTSJSONObject({
          id: 1,
          name: "Lemonade",
          description: "Acidic and refreshing",
          image: "/static/template/food-recipe/24.png",
          rating: 4,
          time: "30min",
          favorited: true
        }),
        new UTSJSONObject({
          id: 2,
          name: "Orange Juice",
          description: "Fresh and vitamin rich",
          image: "/static/template/food-recipe/25.png",
          rating: 4,
          time: "15min",
          favorited: false
        }),
        new UTSJSONObject({
          id: 3,
          name: "Green Smoothie",
          description: "Healthy and nutritious",
          image: "/static/template/food-recipe/7.png",
          rating: 5,
          time: "10min",
          favorited: true
        }),
        new UTSJSONObject({
          id: 4,
          name: "Berry Mix",
          description: "Sweet and antioxidant",
          image: "/static/template/food-recipe/10.png",
          rating: 5,
          time: "20min",
          favorited: false
        })
      ]
    };
  },
  methods: {
    selectCategory(categoryId = null) {
      this.activeCategory = categoryId;
    },
    selectNav(navId = null) {
      this.activeNav = navId;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_vendor.f($data.categories, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: $data.activeCategory === item.id ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $options.selectCategory(item.id), item.id)
      };
    }),
    e: common_assets._imports_3,
    f: common_assets._imports_4,
    g: common_assets._imports_5,
    h: common_assets._imports_6,
    i: common_vendor.f($data.userRecipes, (recipe, k0, i0) => {
      return {
        a: recipe.image,
        b: recipe.favorited ? "/static/template/food-recipe/9.svg" : "/static/template/food-recipe/6.svg",
        c: common_vendor.t(recipe.name),
        d: common_vendor.t(recipe.rating),
        e: common_vendor.t(recipe.time),
        f: recipe.id
      };
    }),
    j: common_assets._imports_6,
    k: common_assets._imports_7,
    l: common_vendor.f($data.topChefs, (chef, k0, i0) => {
      return {
        a: chef.avatar,
        b: common_vendor.t(chef.name),
        c: chef.id
      };
    }),
    m: common_vendor.f($data.recentlyAdded, (item, k0, i0) => {
      return {
        a: item.image,
        b: item.favorited ? "/static/template/food-recipe/9.svg" : "/static/template/food-recipe/18.svg",
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.description),
        e: common_vendor.t(item.rating),
        f: common_vendor.t(item.time),
        g: item.id
      };
    }),
    n: common_assets._imports_6,
    o: common_assets._imports_5,
    p: common_assets._imports_8,
    q: $data.activeNav === "home" ? 1 : "",
    r: common_vendor.o(($event) => $options.selectNav("home")),
    s: common_assets._imports_9,
    t: $data.activeNav === "message" ? 1 : "",
    v: common_vendor.o(($event) => $options.selectNav("message")),
    w: common_assets._imports_10,
    x: $data.activeNav === "bookmark" ? 1 : "",
    y: common_vendor.o(($event) => $options.selectNav("bookmark")),
    z: common_assets._imports_11,
    A: $data.activeNav === "profile" ? 1 : "",
    B: common_vendor.o(($event) => $options.selectNav("profile")),
    C: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/template/food-recipe/food-recipe.js.map
