import Bestiary from './Bestiary.vue';
import MonsterList from './MonsterList.vue';
import MonsterDetail from './MonsterDetail.vue';

export default [
  {
    path: '/bestiary',
    component: Bestiary,
    children: [
      { path: ':id-:slug', component: MonsterDetail },
      { path: '', component: MonsterList },
    ],
  },
];
