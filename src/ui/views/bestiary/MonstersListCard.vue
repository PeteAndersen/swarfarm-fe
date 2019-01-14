<template>
  <v-flex sm12 md6 :lg6="$store.state.filterDrawer" :lg4="!$store.state.filterDrawer" xl3>
    <v-card height="100%" :to="`/monster/${this.monster.slug}`" hover>
      <v-card-title>
        <v-layout>
          <MonsterAvatar :monster="monster"/>
          <v-spacer/>
          <h2>{{monster.name}}</h2>
          <v-spacer/>
          {{startCase(monster.archetype)}}
          <v-tooltip bottom>
            <v-avatar slot="activator">
              <img :src="`/img/elements/${this.monster.element}.png`">
            </v-avatar>
            {{startCase(monster.element)}}
          </v-tooltip>
        </v-layout>
      </v-card-title>
      <v-container grid-list-md text-xs-center class="pa-2">
        <v-layout row wrap>
          <Stat stat="hp" :value="monster.max_lvl_hp"/>
          <Stat stat="atk" :value="monster.max_lvl_attack"/>
          <Stat stat="def" :value="monster.max_lvl_defense"/>
          <Stat stat="speed" :value="monster.speed"/>
          <Stat stat="crit-rate" :value="monster.crit_rate"/>
          <Stat stat="crit-dmg" :value="monster.crit_damage"/>
          <Stat stat="accuracy" :value="monster.accuracy"/>
          <Stat stat="resistance" :value="monster.resistance"/>
        </v-layout>
      </v-container>
      <v-divider/>
      <v-container class="pa-2">
        <v-layout row wrap class="spells pb-2">
          <Skill v-for="skill in monster.skills" :skill="skill" :key="skill.id"/>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { startCase } from 'lodash';

import monsterAvatar from '@/ui/components/monsters/MonsterAvatar.vue';
import Skill from '@/ui/components/monsters/Skill.vue';
import Stat from '@/ui/components/monsters/Stat.vue';

export default {
  name: 'MonstersListCard',
  props: {
    monster: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  components: {
    Skill,
    Stat,
    monsterAvatar,
  },
  methods: { startCase },
};
</script>

<style scoped>
.spells {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
