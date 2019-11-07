<template>
  <v-snackbar v-if="toast" v-model="show" :color="toast.color">
    {{ toast.message }}
    <v-btn text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Toast',
  data() {
    return {
      toast: null,
      show: false,
    };
  },
  computed: mapGetters(['firstToast']),
  watch: {
    firstToast(newValue) {
      if (newValue !== null) {
        this.toast = newValue;
        this.show = true;
      }
    },
    show(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.$store.commit('CLEAR_TOAST');
        }, 500);
      }
    },
  },
};
</script>
