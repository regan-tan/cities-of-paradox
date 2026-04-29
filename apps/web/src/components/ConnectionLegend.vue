<template>
  <section class="connection-legend panel" aria-labelledby="legend-title">
    <header class="section-header">
      <p class="eyebrow">Section 6</p>
      <h2 id="legend-title">The lines are the argument.</h2>
      <p>
        Each line compares a shared urban problem and a different solution. The map is not a collage of places;
        it is a diagram of historical-geographical processes.
      </p>
    </header>

    <ul class="connection-legend__list">
      <li v-for="pair in pairs" :key="pair.id">
        <span class="connection-legend__swatch" :style="{ backgroundColor: pair.color }" aria-hidden="true" />
        <div class="connection-legend__copy">
          <span class="connection-legend__text">
            <strong>Pair {{ pair.number }}:</strong>
            {{ pair.theme }}
          </span>
          <p class="connection-legend__line">{{ pair.lineLabel }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  pairs: {
    type: Array,
    required: true
  }
});
</script>
