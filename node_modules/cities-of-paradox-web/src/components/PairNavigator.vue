<template>
  <section class="pair-navigator panel" aria-labelledby="pair-nav-title">
    <header class="section-header">
      <p class="eyebrow">Section 4</p>
      <h2 id="pair-nav-title">Pair Navigator</h2>
      <p>Jump directly to one comparative line and dossier.</p>
    </header>

    <div class="pair-navigator__grid" role="list">
      <button
        v-for="pair in pairs"
        :key="pair.id"
        type="button"
        class="pair-nav-card"
        role="listitem"
        :class="{ 'is-selected': pair.id === selectedPairId }"
        :style="{ '--pair-color': pair.color }"
        :aria-pressed="pair.id === selectedPairId"
        :aria-label="`Select pair ${pair.number}: ${pair.theme}`"
        @click="$emit('select-pair', pair.id)"
      >
        <p class="pair-nav-card__number">Pair {{ pair.number }}</p>
        <h3>{{ pair.theme }}</h3>
        <p class="pair-nav-card__route">{{ pair.hongKong.shortName }} → {{ pair.singapore.shortName }}</p>
        <p class="pair-nav-card__insight">{{ pair.oneLineInsight }}</p>
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  pairs: {
    type: Array,
    required: true
  },
  selectedPairId: {
    type: String,
    required: true
  }
});

defineEmits(['select-pair']);
</script>
