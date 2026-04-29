<template>
  <section id="dossiers" class="artefact-panel panel" aria-labelledby="dossier-title">
    <header class="section-header">
      <p class="eyebrow">Section 3</p>
      <h2 id="dossier-title">Comparative Artefact Dossier</h2>
      <p>
        Each pair below assembles two sites, one line of argument, and a source-backed reading of urban comparison.
      </p>
    </header>

    <article
      v-for="pair in visiblePairs"
      :key="pair.id"
      class="pair-dossier"
      :style="{ '--pair-color': pair.color }"
    >
      <header class="pair-dossier__header glass-card">
        <p class="pair-dossier__index">Pair {{ pair.number }}</p>
        <h3>{{ pair.theme }}</h3>
        <p class="pair-dossier__line">{{ pair.lineLabel }}</p>
        <p class="pair-dossier__route">{{ pair.hongKong.name }} &lt;-&gt; {{ pair.singapore.name }}</p>
      </header>

      <div class="pair-dossier__sites">
        <SiteCard :site="pair.hongKong" :pair-color="pair.color" :source-ids="pair.sources" />

        <article class="pair-dossier__thesis glass-card">
          <h4>Connection Thesis</h4>
          <p>{{ pair.lineLabel }}</p>
          <p class="pair-dossier__insight">{{ pair.oneLineInsight }}</p>
        </article>

        <SiteCard :site="pair.singapore" :pair-color="pair.color" :source-ids="pair.sources" />
      </div>

      <section class="pair-dossier__connection glass-card" aria-label="Connection, comparison, and contrast">
        <p class="pair-dossier__connection-kicker">Connection / Comparison / Contrast</p>
        <div class="pair-dossier__connection-grid">
          <article class="analysis-card analysis-card--connection">
            <h4>Shared Mechanism</h4>
            <p>{{ pair.comparison.sharedMechanism }}</p>
          </article>
          <article class="analysis-card analysis-card--connection">
            <h4>Crucial Difference</h4>
            <p>{{ pair.comparison.crucialDifference }}</p>
          </article>
        </div>
        <article class="analysis-card analysis-card--reading">
          <h4>Reading the Line</h4>
          <p>{{ pair.comparison.readingTheLine || pair.lineLabel }}</p>
        </article>
      </section>

      <details class="pair-dossier__teaches glass-card" open>
        <summary>What This Pair Teaches</summary>
        <section class="pair-dossier__analysis" aria-label="What this pair teaches">
          <article class="analysis-card">
            <h4>Urban Lesson</h4>
            <p>{{ pair.comparison.urbanLesson }}</p>
          </article>
          <article class="analysis-card">
            <h4>Why These Sites Were Chosen</h4>
            <p>{{ pair.comparison.whyChosen }}</p>
          </article>
          <article class="analysis-card">
            <h4>Professor Value</h4>
            <p>{{ pair.comparison.professorValue }}</p>
          </article>
        </section>
      </details>

      <YoutubeEmbed
        v-if="pair.featuredVideo"
        :title="pair.featuredVideo.title"
        :src="pair.featuredVideo.src"
        :description="pair.featuredVideo.description"
        :analysis="pair.featuredVideo.analysis"
      />

      <article v-if="pair.featuredVideo" class="alternate-video glass-card">
        <h4>Alternate nomination video URL (stored, not embedded by default)</h4>
        <a
          :href="pair.featuredVideo.alternateSrc"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ pair.featuredVideo.alternateSrc }}
        </a>
      </article>

      <div class="pair-dossier__sources">
        <SourceBadge
          v-for="source in getSourcesByIds(pair.sources)"
          :key="source.id"
          :source="source"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import SiteCard from './SiteCard.vue';
import YoutubeEmbed from './YoutubeEmbed.vue';
import SourceBadge from './SourceBadge.vue';
import { getSourcesByIds } from '../data/sources';

const props = defineProps({
  pairs: {
    type: Array,
    required: true
  },
  selectedPairId: {
    type: String,
    required: true
  },
  submissionView: {
    type: Boolean,
    default: false
  }
});

const visiblePairs = computed(() => {
  if (props.submissionView) {
    return props.pairs;
  }
  return props.pairs.filter((pair) => pair.id === props.selectedPairId);
});
</script>
