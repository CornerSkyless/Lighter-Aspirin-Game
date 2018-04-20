<template>
  <div class="lighter">
    <div >
      <el-button @click="run" :disabled="lighter.activeStepId!==-1" type="success" >运行</el-button>
      <el-button @click="clear" v-if="lighter.activeStepId===-1"  type="danger">清空</el-button>
      <el-button @click="stop" v-else type="danger">停止</el-button>
    </div>
      <div class="lighter-main">
        <lighter-play-board :play-board="lighter.playBoard" :position="lighter.position"/>
        <draggable v-model="stepList" :options="{group:{ name:'step',  pull:'clone', put:false },sort: false}" :clone="clone">
          <transition-group  style="display: flex;">
            <lighter-step v-for="step in stepList" :step="step" :active-step-id="lighter.activeStepId" :key="step.id" @click="addStep"/>
          </transition-group>
        </draggable>
      </div>
      <div class="lighter-right">
        <div class="lighter-func">
          <div class="lighter-func-box">
            <div style="width: 100%;text-align: left;margin-bottom: 10px">主函数区</div>
            <draggable v-model="lighter.mainFunc" :options="{group:'step'}">
              <transition-group  style="display: flex;flex-wrap: wrap;min-height: 100px;min-width: 100px">
              <lighter-step v-for="step in lighter.mainFunc" :step="step"  @click="removeStepFromMain"  :active-step-id="lighter.activeStepId" :key="step.id"/>
              </transition-group>
            </draggable>
          </div>
        </div>

        <div class="lighter-func">
          <div class="lighter-func-box">
            <div style="width: 100%;text-align: left;margin-bottom: 10px">子函数区</div>
            <draggable v-model="lighter.subFunc" :options="{group:'step'}">
              <transition-group  style="display: flex;flex-wrap: wrap;min-height: 100px;min-width: 100px">
                <lighter-step v-for="step in lighter.subFunc" :step="step"  @click="removeStepFromSub"  :active-step-id="lighter.activeStepId" :key="step.id"/>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Lighter, Step } from './Lighter'
import LighterPlayBoard from './PlayBoard'
import LighterStep from './Step'
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'
export default {
  name: 'Lighter',
  props: ['init'],
  data () {
    return {
      lighter: this.init ? new Lighter(this.init) : new Lighter(),
      stepList: [],
      clone: function (original) {
        return new Step(original.type)
      }
    }
  },
  methods: {
    async run () {
      await this.lighter.run()
      if (this.lighter.checkWin()) {
        Swal('恭喜你', '你帮助编程猫消灭了掉了所有 Bug', 'success')
      }
    },
    resetStepList () {
      this.stepList.push(
        new Step('goAhead'),
        new Step('turnLeft'),
        new Step('turnRight'),
        new Step('lightUp'),
        new Step('subFunc')
      )
    },
    removeStepFromMain (step) {
      this.lighter.mainFunc.splice(this.lighter.mainFunc.indexOf(step), 1)
    },
    removeStepFromSub (step) {
      this.lighter.subFunc.splice(this.lighter.mainFunc.indexOf(step), 1)
    },
    addStep (step) {
      this.lighter.mainFunc.push(new Step(step.type))
    },
    clear () {
      this.lighter.mainFunc = []
      this.lighter.subFunc = []
    },
    stop () {
      this.lighter.stop = true
      this.lighter.backToStartPoint()
    }
  },
  computed: {

  },
  created () {
    this.resetStepList()
  },
  components: { LighterPlayBoard, LighterStep, draggable }
}
</script>

<style type="text/scss" lang="scss" >
  @import '../assets/style.scss';
</style>
