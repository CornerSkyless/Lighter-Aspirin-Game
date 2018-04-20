<template>
  <div v-if="playBoard" class="lighter-play-board">
      <div v-for="row in playBoard.pointMatrix" class="lighter-play-board-row" :key="JSON.stringify(row)">
        <lighter-point v-for="col in row" :point="col" :position="position" :key="col.id"/>
      </div>
  </div>
</template>

<script>
import LighterPoint from './Point'
export default {
  name: 'LighterPlayBoard',
  props: ['playBoard', 'position'],
  data () {
    return {

    }
  },
  methods: {

  },
  components: { LighterPoint }
}
</script>
