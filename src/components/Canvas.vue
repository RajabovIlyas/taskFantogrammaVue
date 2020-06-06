<template>
  <div id="Canvas">
    <div>
      <router-link :to="{ name: 'home' }">
        <el-button type="primary" v-bind:style="{ margin: '0 20px' }"
          >Назад</el-button
        >
      </router-link>
    </div>
    <canvas id="cl" ref="canvas" width="500" height="500"
      >Данный браузер не поддерживает данную технологию</canvas
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Canvas",
  props: {},
  data: () => ({
    context: null
  }),
  computed: mapGetters(["CANVAS"]),
  methods: {
    ...mapActions(["GET_CANVAS_FROM_API"]),
    showBackImg(backgroundImage) {
      backgroundImage.src = this.CANVAS;
      this.context.globalAlpha = 1;
      this.context.drawImage(backgroundImage, 0, 0);
    },
    showGreenBox(backgroundImage) {
      this.context.clearRect(0, 0, 500, 500);
      this.showBackImg(backgroundImage);
      this.context.globalAlpha = 0.5;
      this.context.fillStyle = "green";
      this.context.fillRect(225, 225, 50, 50);
    },
    showBlueBox(x, y, backgroundImage) {
      this.context.clearRect(0, 0, 500, 500);
      this.showBackImg(backgroundImage);
      this.context.globalAlpha = 0.5;
      this.context.fillStyle = "blue";
      this.context.fillRect(x - 25, y - 25, 50, 50);
    }
  },
  mounted() {
    this.GET_CANVAS_FROM_API();
    const backgroundImage = new Image(500, 500);
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.showGreenBox(backgroundImage);
    this.canvas.onmousedown = event => {
      if (
        event.offsetX >= 225 &&
        event.offsetX <= 275 &&
        event.offsetY >= 225 &&
        event.offsetY <= 275
      )
        this.canvas.onmousemove = event => {
          if (
            event.offsetX >= 25 &&
            event.offsetX <= 475 &&
            event.offsetY >= 25 &&
            event.offsetY <= 475
          )
            this.showBlueBox(event.offsetX, event.offsetY, backgroundImage);
        };
      this.canvas.onmouseup = () => {
        this.canvas.onmousemove = null;
        this.showGreenBox(backgroundImage);
      };
    };
  }
};
</script>

<style lang="scss">
#cl {
  width: 500px;
  height: 500px;
  border: 1px solid red;
  margin: 40px;
}
</style>
