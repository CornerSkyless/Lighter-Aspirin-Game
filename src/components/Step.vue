<template>
  <div v-if="step" class="lighter-step" @click="click" :class="{'lighter-step-active':step.id===activeStepId}">
    <img v-if="step.type==='goAhead'" src="../assets/up.png" />
    <img v-if="step.type==='turnLeft'" src="../assets/left.png" />
    <img v-if="step.type==='turnRight'" src="../assets/right.png" />
    <img v-if="step.type==='lightUp'" src="../assets/light.png" />
    <span v-if="step.type==='subFunc'">Sub</span>
  </div>
</template>

<script>
export default {
  name: 'LighterStep',
  props: ['step', 'activeStepId'],
  data () {
    return {

    }
  },
  methods: {
    click () {
      this.$emit('click', this.step)
    }
  },
  computed: {

  },
  components: { }
}
</script>
