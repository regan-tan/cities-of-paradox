<template>
  <section class="artefact-gallery" aria-label="Artefact gallery">
    <h3>Comparative Artefact Gallery</h3>
    <div class="artefact-gallery__grid">
      <article
        v-for="artefact in galleryItems"
        :key="artefact.id"
        class="artefact-card glass-card"
      >
        <img :src="artefact.image" :alt="artefact.altText" loading="lazy" />
        <div class="artefact-card__meta">
          <p class="artefact-card__type">{{ artefact.type }}</p>
          <h4>{{ artefact.title }}</h4>
          <p class="artefact-card__desc">{{ artefact.description }}</p>
          <p class="artefact-card__why">{{ artefact.whyItMatters }}</p>
          <p class="artefact-card__source">{{ artefact.sourceLabel }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { sourceLibrary } from '../data/sources';

const props = defineProps({
  pair: {
    type: Object,
    required: true
  }
});

const galleryItems = computed(() => {
  const normalise = (artefact, site, index) => ({
    id: `${props.pair.id}-${site.shortName}-${index}-${artefact.title}`,
    image: artefact.image || '/placeholders/artefact-placeholder.svg',
    altText: `${artefact.title} placeholder media for ${site.shortName}`,
    type: artefact.type,
    title: `${artefact.title} (${site.shortName})`,
    description: artefact.description,
    whyItMatters: artefact.whyItMatters,
    sourceLabel: sourceLibrary[artefact.sourceId]?.label || 'Source to be confirmed'
  });

  const hkItems = (props.pair.hongKong.artefacts || []).map((artefact, index) =>
    normalise(artefact, props.pair.hongKong, index)
  );
  const sgItems = (props.pair.singapore.artefacts || []).map((artefact, index) =>
    normalise(artefact, props.pair.singapore, index)
  );

  return [...hkItems, ...sgItems];
});
</script>
