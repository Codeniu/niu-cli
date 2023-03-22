<template>
  <div
    v-if="isShow"
    ref="obox"
    class="flow-notice"
    :style="{
      width: boxWidth + 'px',
      height: boxHeight + 'px',
      top: top + 'px',
      left: left + 'px'
    }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
  >
    <div class="flow-notice__closebtn">
      <i class="el-icon-circle-close" @click.stop="zoom">x</i>
    </div>
    <img
      v-if="!isZoom"
      src="../assets/images/cute-miumiu.gif"
      draggable="false"
      @click.stop="handleView"
    />
    <slot></slot>
  </div>
</template>

<script>
// const browserWidth = document.documentElement.clientWidth,
//   browserHeight = document.documentElement.clientHeight

export default {
  props: {
    boxWidth: {
      type: Number,
      default: 240
    },
    boxHeight: {
      type: Number,
      default: 160
    },
    boxLeft: {
      type: Number,
      default: 1
    },
    boxTop: {
      type: Number,
      default: 1
    },
    maxWidth: {
      type: Number,
      default: 600
    },
    maxHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      top: this.boxTop,
      left:
        this.boxLeft > 0
          ? this.boxLeft
          : this.maxWidth + this.boxLeft - this.boxWidth,
      divX: 0,
      divY: 0,
      isMove: false,
      isShow: true,
      timer: null,
      x: 2,
      y: 2,
      isZoom: false
    }
  },
  mounted() {
    // this.startMove();
  },
  destroyed() {
    this.stopMove()
  },
  methods: {
    zoom() {
      if (this.isZoom === true) {
        this.boxWidth = 240
        this.boxHeight = 160
        this.boxLeft = 1
        this.boxTop = 1
        this.isZoom = false
      } else {
        this.boxWidth = 240
        this.boxHeight = 0
        this.boxLeft = 1
        this.boxTop = 1
        this.isZoom = true
      }
    },
    handleView() {
      this.$emit('handleView')
    },
    startMove() {
      this.timer = setInterval(() => {
        if (this.left > this.maxWidth || this.left < 0) {
          this.x = -this.x
        }

        if (this.top > this.maxHeight || this.top < 0) {
          this.y = -this.y
        }
        this.left += this.x
        this.top += this.y
      }, 30)
    },
    stopMove() {
      clearInterval(this.timer)
    },
    onMouseEnter() {
      this.stopMove()
    },
    onMouseDown(event) {
      const e = event || window.event
      const oBox = this.$refs.obox
      this.divX = e.clientX - oBox.offsetLeft
      this.divY = e.clientY - oBox.offsetTop
      this.isMove = true
    },
    onMouseMove(event) {
      if (!this.isMove) {
        return
      }
      const e = event || window.event
      this.left = e.clientX - this.divX
      if (e.clientX - this.divX <= 0) {
        this.left = 0
      } else if (this.boxWidth - this.divX + e.clientX >= this.maxWidth) {
        this.left = this.maxWidth - this.boxWidth
      }

      this.top = e.clientY - this.divY
      if (e.clientY - this.divY <= 0) {
        this.top = 0
      } else if (this.boxHeight - this.divY + e.clientY >= this.maxHeight) {
        this.top = this.maxHeight - this.boxHeight
      }
    },
    onMouseUp() {
      this.isMove = false
    },
    onMouseLeave() {
      // this.startMove();
      this.isMove = false
    }
  }
}
</script>

<style lang="less" scoped>
.flow-notice {
  cursor: move;
  position: absolute;
  z-index: 34;
  background-color: #b5f5ec;
  user-select: none;
  border-radius: 4px;
  &__closebtn {
    font-size: 12px;
    color: #fff;
    width: 100%;
    line-height: 36px;
    position: absolute;
    z-index: 45;

    i {
      float: right;
      cursor: pointer;
      font-size: 21px;
      margin: -5px 10px 0 0;

      &:hover {
        color: #006569;
      }
    }
  }

  img {
    border-radius: 4px;
  }
}

.footer {
  background: #006569;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 48px;
  text-align: center;
  border-radius: 0 0 30px 30px;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>
