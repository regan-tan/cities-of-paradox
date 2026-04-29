<template>
  <article class="youtube-embed glass-card">
    <header class="youtube-embed__header">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </header>
    <div class="youtube-embed__frame-wrap">
      <iframe
        class="youtube-embed__frame"
        :src="src"
        :title="title"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>
    <p class="youtube-embed__analysis">{{ analysis }}</p>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  analysis: {
    type: String,
    default: ""
  }
});
</script>
