<template>
  <div :style="`height:${size};width:${size}`">
    <img class="avatar" :src="avatarUrl">
    <img
      v-if="stars"
      v-for="x in stars"
      :key="x"
      src="/img/stars/star-awakened.png"
      :class="{
        'star-1': x == 1,
        'star-2': x == 2,
        'star-3': x == 3,
        'star-4': x == 4,
        'star-5': x == 5,
        'star-6': x == 5,
      }"
    >
    <div class="level-text">
      <span v-if="level">{{ level }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonsterAvatar',
  props: {
    monster: {
      type: Object,
      required: true,
    },
    stars: {
      type: Boolean,
      default: true,
      required: false,
    },
    level: {
      type: Number,
      required: false,
    },
    size: {
      type: String,
      default: '76px',
      required: false,
    },
  },
  computed: {
    avatarUrl: function() {
      return this.monster.trackingName
        ? `/img/monsters/${this.monster.image_filename}.png`
        : `/img/monsters/missing.png`;
    },
  },
};
</script>

<style scoped>
div {
  position: relative;
  margin: auto;
}

.level-text {
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.level-text > span {
  background: #373737;
  color: #f7f7f7;
}

img.avatar {
  height: 100%;
  width: 100%;
}

.star-1,
.star-2,
.star-3,
.star-4,
.star-5 {
  position: absolute;
  top: -4%;
  margin-left: -11.4px;
  height: 26%;
}

.star-1 {
  left: 5%;
}

.star-2 {
  left: 15%;
}

.star-3 {
  left: 25%;
}

.star-4 {
  left: 35%;
}

.star-5 {
  left: 45%;
}

.star-6 {
  left: 55%;
}
</style>
