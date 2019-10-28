<template>
  <v-flex sm12 md6 :lg6="$store.state.filterDrawer" :lg4="!$store.state.filterDrawer" xl3>
    <v-card height="100%" :to="`/bestiary/monster/${monster.com2us_id}-${monster.name}`" hover>
      <v-list-item>
        <v-list-item-avatar tile size="80">
          <MonsterAvatar :monster="monster" :stars="monster.base_stars" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline">{{monster.name}}</v-list-item-title>
          <span class="overline">{{monster.archetype.toUpperCase()}}</span>
        </v-list-item-content>

        <v-list-item-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-avatar v-on="on" size="2rem">
                <img :src="`/img/elements/${monster.element}.png`" />
              </v-avatar>
            </template>
            {{startCase(monster.element)}}
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>

      <v-container grid-list-md text-xs-center>
        <v-layout row>
          <v-flex>
            <v-layout row wrap>
              <Stat stat="hp" :value="monster.max_lvl_hp" />
              <Stat stat="atk" :value="monster.max_lvl_attack" />
              <Stat stat="def" :value="monster.max_lvl_defense" />
              <Stat stat="speed" :value="monster.speed" />
              <Stat stat="crit-rate" :value="monster.crit_rate" />
              <Stat stat="crit-dmg" :value="monster.crit_damage" />
              <Stat stat="accuracy" :value="monster.accuracy" />
              <Stat stat="resistance" :value="monster.resistance" />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider />

      <v-container>
        <v-layout row wrap class="text-truncate">
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
