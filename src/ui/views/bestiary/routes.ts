const Bestiary = () =>
  import(/* webpackChunkName: "bestiary" */ './Bestiary.vue');
const Monsters = () =>
  import(/* webpackChunkName: "bestiary" */ './Monsters.vue');
const MonsterDetail = () =>
  import(/* webpackChunkName: "bestiary" */ './MonsterDetail.vue');

export default [
  {
    path: '/bestiary',
    component: Bestiary,
    children: [
      { path: '', component: Monsters },
      { path: 'monster/:id-:slug', component: MonsterDetail },
    ],
  },
];
