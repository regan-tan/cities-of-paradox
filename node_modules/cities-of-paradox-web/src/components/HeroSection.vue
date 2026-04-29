<template>
  <section class="hero panel" aria-labelledby="hero-title">
    <p class="hero__course-label">COR2646 final project: interactive comparative map</p>
    <h1 id="hero-title">{{ title }}</h1>
    <p class="hero__subtitle">{{ subtitle }}</p>
    <p class="hero__thesis">{{ thesis }}</p>

    <div class="hero__actions">
      <button type="button" class="btn btn--primary" @click="$emit('enter-map')">Enter the Map</button>
      <button type="button" class="btn btn--ghost" @click="$emit('view-sources')">View Sources</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  thesis: {
    type: String,
    required: true
  }
});

defineEmits(['enter-map', 'view-sources']);
</script>
