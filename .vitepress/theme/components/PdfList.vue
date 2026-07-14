<template>
  <div class="pdf-list">
    <div v-if="pdfs.length === 0" class="pdf-empty">暂无 PDF 文件</div>
    <a
      v-for="pdf in pdfs"
      :key="pdf.name"
      :href="pdf.url"
      target="_blank"
      rel="noopener"
      class="pdf-item"
    >
      <i class="iconfont icon-article pdf-icon"></i>
      <div class="pdf-info">
        <span class="pdf-name">{{ pdf.name }}</span>
        <span class="pdf-meta">{{ pdf.size }} · {{ pdf.mtime }}</span>
      </div>
    </a>
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
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--main-card-background);
  border: 1px solid var(--main-card-border);
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    border-color: var(--main-color);
    transform: translateY(-2px);
    box-shadow: var(--main-border-shadow);
  }
}
.pdf-icon {
  font-size: 22px;
  color: var(--main-color);
}
.pdf-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
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
</style>
