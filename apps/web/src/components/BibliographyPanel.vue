<template>
  <section id="sources" class="bibliography panel" aria-labelledby="bibliography-title">
    <header class="section-header">
      <p class="eyebrow">Section 8</p>
      <h2 id="bibliography-title">Bibliography and Source Trail</h2>
      <p>Official and trusted sources are attached to each pair. Add your own citations when extending claims.</p>
    </header>

    <article v-for="pair in pairs" :key="pair.id" class="bibliography__group glass-card">
      <h3>Pair {{ pair.number }}: {{ pair.theme }}</h3>
      <p>{{ pair.hongKong.shortName }} &lt;-&gt; {{ pair.singapore.shortName }}</p>
      <div class="bibliography__badges">
        <SourceBadge v-for="source in getPairSources(pair.sources)" :key="source.id" :source="source" />
      </div>
    </article>
  </section>
</template>

<script setup>
import SourceBadge from './SourceBadge.vue';
import { getSourcesByIds } from '../data/sources';

defineProps({
  pairs: {
    type: Array,
    required: true
  }
});

function getPairSources(sourceIds) {
  return getSourcesByIds(sourceIds || []);
}
</script>
