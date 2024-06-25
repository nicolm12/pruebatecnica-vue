module.exports = function (/* ctx */) {
  return {
    boot: ["router", "pinia"],
    css: ["app.css"],
    framework: {
      components: [
        "QLayout",
        "QHeader",
        "QToolbar",
        "QToolbarTitle",
        "QPageContainer",
        "QPage",
        "QInput",
        "QForm",
        "QUploader",
        "QBtn",
        "QList",
        "QItem",
        "QItemSection",
        "QItemLabel",
        "QImg",
      ],
      directives: [],
      plugins: [],
    },
    build: {
      vueRouterMode: "history",
    },
  };
};
