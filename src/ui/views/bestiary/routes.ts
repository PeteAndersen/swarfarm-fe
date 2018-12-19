import Bestiary from './Bestiary.vue';
import Monsters from './Monsters.vue';
import MonsterDetail from './MonsterDetail.vue';

export default [
  {
    path: '/bestiary',
    component: Bestiary,
    children: [
      { path: '', component: Monsters },
      { path: ':id-:slug', component: MonsterDetail },
    ],
  },
];
