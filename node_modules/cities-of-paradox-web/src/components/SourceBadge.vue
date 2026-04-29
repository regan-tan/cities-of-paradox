<template>
  <a
    class="source-badge"
    :href="source.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Open source: ${source.label}`"
  >
    <span class="source-badge__label">{{ source.label }}</span>
  </a>
</template>

<script setup>
defineProps({
  source: {
    type: Object,
    required: true
  }
});
</script>
