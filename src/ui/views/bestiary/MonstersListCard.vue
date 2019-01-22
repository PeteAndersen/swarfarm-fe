<template>
  <v-flex sm12 md6 :lg6="$store.state.filterDrawer" :lg4="!$store.state.filterDrawer" xl3>
    <v-card height="100%" :to="`/monster/${this.monster.com2us_id}-${this.monster.name}`" hover>
      <v-card-title class="pb-1">
        <v-layout>
          <v-tooltip bottom>
            <v-avatar slot="activator" size="2rem">
              <img :src="`/img/elements/${this.monster.element}.png`">
            </v-avatar>
            {{startCase(monster.element)}}
          </v-tooltip>
          <h2 class="ml-1">{{monster.name}}</h2>
          <v-spacer/>
          <span class="caption">{{monster.archetype.toUpperCase()}}</span>
        </v-layout>
      </v-card-title>
      <v-container grid-list-md text-xs-center class="pa-2">
        <v-layout row>
          <v-flex>
            <MonsterAvatar :monster="monster" :stars="monster.base_stars"/>
          </v-flex>
          <v-flex>
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
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider/>
      <v-container class="pa-2">
        <v-layout row wrap class="text-truncate pb-2">
          <LeaderSkill
            v-if="monster.leader_skill"
            :skill="monster.leader_skill"
            :class="`xs${spellColSize}`"
          />

          <Skill
            v-for="skill in loadedSkills"
            :skill="skill"
            :key="skill.id"
            :class="`xs${spellColSize}`"
          />
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { startCase } from 'lodash';

import MonsterAvatar from '@/ui/components/monsters/MonsterAvatar';
import LeaderSkill from '@/ui/components/monsters/LeaderSkill';
import Skill from '@/ui/components/monsters/Skill';
import Stat from '@/ui/components/monsters/Stat';

export default {
  name: 'MonstersListCard',
  props: {
    monster: {
      type: Object,
      required: true,
    },
  },
  computed: {
    loadedSkills() {
      return this.monster.skills.reduce(
        (accum, skill) => (skill ? [...accum, skill] : accum),
        [],
      );
    },
    spellColSize() {
      if (this.leader_skill !== null) {
        return 6;
      }
      return this.monster.skills.length === 3 ? 4 : 6;
    },
  },
  components: {
    Skill,
    LeaderSkill,
    Stat,
    MonsterAvatar,
  },
  methods: { startCase },
};
</script>

<style scoped>
</style>
