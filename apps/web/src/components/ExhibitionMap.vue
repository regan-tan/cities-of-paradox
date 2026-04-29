<template>
  <section id="map" class="exhibition-map panel" aria-labelledby="map-title">
    <header class="section-header">
      <p class="eyebrow">Section 2</p>
      <h2 id="map-title">Exhibition Map</h2>
      <p>
        Seven Hong Kong-Singapore pairs are arranged as a comparative wall map. Select any node or line to open its
        dossier.
      </p>
    </header>

    <div class="exhibition-map__desktop" aria-hidden="false">
      <div class="exhibition-map__stage">
        <p class="exhibition-map__city exhibition-map__city--hk">Hong Kong</p>
        <p class="exhibition-map__city exhibition-map__city--sg">Singapore</p>

        <svg viewBox="0 0 1000 720" class="exhibition-map__svg" aria-label="Interactive comparative line map">
          <g v-for="item in mapGeometry" :key="item.id">
            <path
              class="exhibition-map__line"
              :class="{
                'is-selected': item.id === selectedPairId,
                'is-hovered': item.id === hoveredPairId
              }"
              :style="{ '--line-color': item.color }"
              :d="item.path"
              @mouseenter="emitHover(item.id)"
              @mouseleave="emitHover(null)"
              @click="emitSelect(item.id)"
            />
            <text
              class="exhibition-map__line-label"
              :x="item.labelX"
              :y="item.labelY"
              text-anchor="middle"
              :style="{ fill: item.color }"
            >
              {{ item.mapLineLabel }}
            </text>
          </g>
        </svg>

        <button
          v-for="item in mapGeometry"
          :key="`${item.id}-hk-node`"
          type="button"
          class="exhibition-map__node exhibition-map__node--hk"
          :class="{ 'is-selected': item.id === selectedPairId }"
          :style="{ left: `${item.leftX}px`, top: `${item.y}px`, '--line-color': item.color }"
          :aria-label="`Select pair ${item.number}: ${item.hongKong.shortName} (Hong Kong) and ${item.singapore.shortName} (Singapore)`"
          @mouseenter="emitHover(item.id)"
          @mouseleave="emitHover(null)"
          @focus="emitHover(item.id)"
          @blur="emitHover(null)"
          @click="emitSelect(item.id)"
        >
          <span>{{ item.hongKong.shortName }}</span>
        </button>

        <button
          v-for="item in mapGeometry"
          :key="`${item.id}-sg-node`"
          type="button"
          class="exhibition-map__node exhibition-map__node--sg"
          :class="{ 'is-selected': item.id === selectedPairId }"
          :style="{ left: `${item.rightX}px`, top: `${item.y}px`, '--line-color': item.color }"
          :aria-label="`Select pair ${item.number}: ${item.hongKong.shortName} (Hong Kong) and ${item.singapore.shortName} (Singapore)`"
          @mouseenter="emitHover(item.id)"
          @mouseleave="emitHover(null)"
          @focus="emitHover(item.id)"
          @blur="emitHover(null)"
          @click="emitSelect(item.id)"
        >
          <span>{{ item.singapore.shortName }}</span>
        </button>
      </div>
    </div>

    <div class="exhibition-map__mobile">
      <button
        v-for="pair in pairs"
        :key="`mobile-${pair.id}`"
        type="button"
        class="exhibition-map__mobile-row"
        :class="{ 'is-selected': pair.id === selectedPairId }"
        :style="{ '--line-color': pair.color }"
        :aria-pressed="pair.id === selectedPairId"
        :aria-label="`Select pair ${pair.number}: ${pair.hongKong.shortName} and ${pair.singapore.shortName}`"
        @click="emitSelect(pair.id)"
      >
        <p>Pair {{ pair.number }}: {{ pair.theme }}</p>
        <p>{{ pair.hongKong.shortName }} &lt;-&gt; {{ pair.singapore.shortName }}</p>
        <p class="exhibition-map__mobile-line">{{ pair.lineLabel }}</p>
      </button>
    </div>

    <p class="exhibition-map__preview" v-if="previewPair">
      Preview: Pair {{ previewPair.number }} - {{ previewPair.theme }}.
    </p>
    <p class="exhibition-map__preview-line" v-if="previewPair">{{ previewPair.lineLabel }}</p>
    <p class="exhibition-map__preview-reading" v-if="previewPair">
      {{ previewPair.comparison.readingTheLine }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pairs: {
    type: Array,
    required: true
  },
  selectedPairId: {
    type: String,
    required: true
  },
  hoveredPairId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select-pair', 'hover-pair']);

const mapGeometry = computed(() => {
  const leftX = 175;
  const rightX = 825;
  const baseY = 120;
  const stepY = 82;

  return props.pairs.map((pair, index) => {
    const y = baseY + index * stepY;
    const offset = index % 2 === 0 ? -36 : 36;
    const path = `M ${leftX} ${y} C ${leftX + 200} ${y + offset} ${rightX - 200} ${y - offset} ${rightX} ${y}`;
    const firstClause = pair.lineLabel.split(';')[0].trim();
    const mapLineLabel =
      firstClause.length > 56
        ? `${firstClause.slice(0, 53).trim()}...`
        : firstClause;

    return {
      ...pair,
      leftX,
      rightX,
      y,
      path,
      labelX: 500,
      labelY: y - 14,
      mapLineLabel
    };
  });
});

const previewPair = computed(() => {
  const id = props.hoveredPairId || props.selectedPairId;
  return props.pairs.find((pair) => pair.id === id);
});

function emitSelect(pairId) {
  emit('select-pair', pairId);
}

function emitHover(pairId) {
  emit('hover-pair', pairId);
}
</script>
