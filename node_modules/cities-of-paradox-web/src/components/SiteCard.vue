<template>
  <article class="site-card glass-card" :style="{ '--pair-color': pairColor }">
    <header class="site-card__header">
      <p class="site-card__city">{{ site.city }}</p>
      <h3>{{ site.name }}</h3>
    </header>

    <figure class="site-card__media-wrap">
      <img class="site-card__media" :src="site.image" :alt="site.alt" loading="lazy" />
      <figcaption>{{ site.caption }}</figcaption>
    </figure>

    <h4 class="site-card__subheading">Why It Matters</h4>
    <p class="site-card__why">{{ site.whyItMatters }}</p>

    <div class="site-card__chips" aria-label="Artefact types">
      <span v-for="chip in artefactChips" :key="chip" class="chip">{{ chip }}</span>
    </div>

    <div class="site-card__sources">
      <SourceBadge v-for="source in sources" :key="source.id" :source="source" />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import SourceBadge from './SourceBadge.vue';
import { getSourcesByIds } from '../data/sources';

const props = defineProps({
  site: {
    type: Object,
    required: true
  },
  pairColor: {
    type: String,
    required: true
  },
  sourceIds: {
    type: Array,
    default: () => []
  }
});

const artefactChips = computed(() =>
  [...new Set((props.site.artefacts || []).map((artefact) => artefact.type))].slice(0, 6)
);

const sources = computed(() => getSourcesByIds(props.sourceIds));
</script>
