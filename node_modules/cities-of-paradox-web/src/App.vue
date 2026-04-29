<template>
  <div class="app-shell" :class="{ 'submission-mode': submissionView }">
    <div class="bg-layer" aria-hidden="true" />

    <header class="utility-bar no-print">
      <button type="button" class="btn btn--ghost" @click="toggleSubmissionView">
        {{ submissionView ? 'Exit Submission View' : 'Print / Submission View' }}
      </button>
      <button v-if="submissionView" type="button" class="btn btn--primary" @click="printPage">Print</button>
    </header>

    <main class="app-main">
      <HeroSection
        :title="projectTitle"
        :subtitle="projectSubtitle"
        :thesis="coreThesis"
        @enter-map="scrollToMap"
        @view-sources="scrollToSources"
      />

      <div ref="mapSectionRef">
        <ExhibitionMap
          :pairs="pairs"
          :selected-pair-id="selectedPairId"
          :hovered-pair-id="hoveredPairId"
          @select-pair="handleMapSelection"
          @hover-pair="hoveredPairId = $event"
        />
      </div>

      <div ref="dossierSectionRef">
        <ArtefactPairPanel
          :pairs="pairs"
          :selected-pair-id="selectedPairId"
          :submission-view="submissionView"
        />
      </div>

      <PairNavigator
        :pairs="pairs"
        :selected-pair-id="selectedPairId"
        @select-pair="handleNavigatorSelection"
      />

      <TimelineStrip />
      <ConnectionLegend :pairs="pairs" />

      <div ref="sourcesSectionRef">
        <BibliographyPanel :pairs="pairs" />
      </div>

      <footer class="project-footer panel">
        <p>Done by: Regan Tan (01478983)</p>
        <p>Prepared for: Prof Jack Greatrex</p>
        <p>SMU COR2646 Cities of Paradox</p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import HeroSection from './components/HeroSection.vue';
import ExhibitionMap from './components/ExhibitionMap.vue';
import PairNavigator from './components/PairNavigator.vue';
import ArtefactPairPanel from './components/ArtefactPairPanel.vue';
import ConnectionLegend from './components/ConnectionLegend.vue';
import TimelineStrip from './components/TimelineStrip.vue';
import BibliographyPanel from './components/BibliographyPanel.vue';
import pairs, { coreThesis, projectSubtitle, projectTitle } from './data/pairs';

const selectedPairId = ref(pairs[0].id);
const hoveredPairId = ref(null);
const submissionView = ref(false);

const mapSectionRef = ref(null);
const dossierSectionRef = ref(null);
const sourcesSectionRef = ref(null);

function smoothScroll(targetRef) {
  targetRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToMap() {
  smoothScroll(mapSectionRef);
}

function scrollToSources() {
  smoothScroll(sourcesSectionRef);
}

function handleMapSelection(pairId) {
  selectedPairId.value = pairId;
}

function handleNavigatorSelection(pairId) {
  selectedPairId.value = pairId;
  nextTick(() => smoothScroll(dossierSectionRef));
}

function toggleSubmissionView() {
  submissionView.value = !submissionView.value;
  if (submissionView.value) {
    nextTick(() => smoothScroll(dossierSectionRef));
  }
}

function printPage() {
  window.print();
}
</script>
