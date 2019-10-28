<template>
  <div :style="`height:${size};width:${size}`">
    <v-img class="avatar" :src="avatarUrl" lazy-src="/public/img/monsters/missing.jpg"></v-img>
    <template v-if="stars">
      <img
        v-for="x in stars"
        :key="x"
        :src="`/img/icons/${starType}`"
        :class="{
        'star-1': x == 1,
        'star-2': x == 2,
        'star-3': x == 3,
        'star-4': x == 4,
        'star-5': x == 5,
        'star-6': x == 6,
      }"
      />
    </template>
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
      type: Number,
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
    avatarUrl() {
      return this.monster.image_filename
        ? `/img/monsters/${this.monster.image_filename}`
        : `/img/monsters/missing.png`;
    },
    starType() {
      return this.monster.can_awaken
        ? this.monster.is_awakened
          ? 'star-awakened.png'
          : 'star-unawakened.png'
        : 'star-fodder.png';
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
.star-5,
.star-6 {
  position: absolute;
  top: 0;
  margin-left: -11.4px;
  height: 26%;
  width: 26%;
}

.star-1 {
  left: 12%;
}

.star-2 {
  left: 24%;
}

.star-3 {
  left: 36%;
}

.star-4 {
  left: 48%;
}

.star-5 {
  left: 60%;
}

.star-6 {
  left: 72%;
}
</style>
