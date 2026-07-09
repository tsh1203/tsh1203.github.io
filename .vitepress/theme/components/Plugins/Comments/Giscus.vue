<template>
  <div ref="commentRef" id="comment-dom" :class="['comment-content', 'giscus', { fill }]" />
</template>

<script setup>
const props = defineProps({
  // 填充评论区（giscus 暂不支持预填内容，保留接口以保持与 Artalk/Twikoo 一致）
  fill: {
    type: [Boolean, String],
    default: false,
  },
});

const { theme, isDark } = useData();
const { comment } = theme.value;
const route = useRoute();
const commentRef = ref(null);

// 获取当前 giscus iframe
const getGiscusFrame = () => commentRef.value?.querySelector("iframe.giscus-frame");

// 计算当前应使用的 giscus 主题
const giscusTheme = () => (isDark.value ? comment.giscus.themeDark || "dark_dimmed" : comment.giscus.themeLight || "light");

// 插入 / 重新插入 giscus 脚本
const loadGiscus = () => {
  if (!commentRef.value) return;
  const g = comment.giscus;
  if (!g.repo || !g.repoId || !g.category || !g.categoryId) {
    console.error("Giscus 配置不完整，请检查 themeConfig.mjs 中的 comment.giscus 配置");
    return;
  }
  commentRef.value.innerHTML = "";
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", g.repo);
  script.setAttribute("data-repo-id", g.repoId);
  script.setAttribute("data-category", g.category);
  script.setAttribute("data-category-id", g.categoryId);
  script.setAttribute("data-mapping", g.mapping || "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", g.inputPosition || "top");
  script.setAttribute("data-theme", giscusTheme());
  script.setAttribute("data-lang", g.lang || "zh-CN");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;
  commentRef.value.appendChild(script);
};

// 通过 postMessage 同步主题，避免整段重新加载
const syncGiscusTheme = () => {
  const frame = getGiscusFrame();
  if (!frame) return;
  frame.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: giscusTheme(),
        },
      },
    },
    "https://giscus.app",
  );
};

// 深色 / 浅色模式切换时同步
watch(isDark, () => {
  syncGiscusTheme();
});

// 路由切换（如上一篇 / 下一篇）时重新加载评论
watch(
  () => route.path,
  () => {
    nextTick(() => loadGiscus());
  },
);

onMounted(() => {
  nextTick(() => loadGiscus());
});
</script>

<style lang="scss" scoped>
.comment-content.giscus {
  :deep(iframe.giscus-frame) {
    width: 100%;
    border: none;
    color-scheme: normal;
  }
}
</style>
