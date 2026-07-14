<template>
  <div class="pdf-list">
    <div v-if="pdfs.length === 0" class="pdf-empty">暂无 PDF 文件</div>
    <div v-for="pdf in pdfs" :key="pdf.name" class="pdf-item">
      <!-- 整行点击区域：新标签打开，命中 local-file 白名单不走中转页 -->
      <a class="pdf-main-link local-file" :href="pdf.url" target="_blank" rel="noopener" />
      <i class="iconfont icon-article pdf-icon"></i>
      <div class="pdf-info">
        <span class="pdf-name">{{ pdf.name }}</span>
        <span class="pdf-meta">{{ pdf.size }} · {{ pdf.mtime }}</span>
      </div>
      <a
        class="pdf-download local-file"
        :href="pdf.url"
        :download="pdf.name + '.pdf'"
        title="下载"
      >
        <i class="iconfont icon-download"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { data as pdfs } from "../pdfList.data.mjs";
</script>

<style lang="scss" scoped>
.pdf-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 1.5rem 0;
}
.pdf-empty {
  color: var(--main-font-second-color);
  padding: 12px;
}
.pdf-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--main-card-background);
  border: 1px solid var(--main-card-border);
  transition: all 0.3s;
  &:hover {
    border-color: var(--main-color);
    transform: translateY(-2px);
    box-shadow: var(--main-border-shadow);
  }
}
// 整行可点击：铺满整个卡片，压在下载按钮下面（z-index 更低）
.pdf-main-link {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.pdf-icon {
  position: relative;
  z-index: 0;
  font-size: 22px;
  color: var(--main-color);
}
.pdf-info {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  pointer-events: none;
}
.pdf-name {
  color: var(--main-font-color);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pdf-meta {
  color: var(--main-font-second-color);
  font-size: 0.8em;
  margin-top: 2px;
}
// 下载按钮：z-index 更高，盖在整行链接之上，单独可点击
.pdf-download {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--main-font-second-color);
  transition: all 0.3s;
  flex-shrink: 0;
  &:hover {
    background: var(--main-card-border);
    color: var(--main-color);
  }
}
</style>
