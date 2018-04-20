<template>
  <div v-if="point" class="lighter-point" :class="{'lighter-point-disabled':point.type===0}">
    <div class="lighter-bug" v-if="point.type===2 && !point.isLighted"><img src="../assets/bug.png" /></div>
    <div class="lighter-lighted" v-if="point.type===2 && point.isLighted"></div>
    <div class="lighter-position" v-if="isPosition" :class="lighterPositionClass"><img src="../assets/cat.png" /></div>
  </div>
</template>

<script>
export default {
  name: 'LighterPoint',
  props: ['point', 'position'],
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    isPosition () {
      return this.position.x === this.point.x && this.position.y === this.point.y
    },
    lighterPositionClass () {
      return {
        'lighter-position-left': this.position.face === 'left',
        'lighter-position-right': this.position.face === 'right',
        'lighter-position-down': this.position.face === 'down',
        'lighter-position-up': this.position.face === 'up'
      }
    }
  },
  components: { }
}
</script>
