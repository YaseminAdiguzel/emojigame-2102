import landingPage from "@/components/landingPage.vue";
import loginPage from "@/components/loginPage.vue";
import gamePage from "@/components/gamePage.vue";
 import scoreTable from "@/components/scoreTable.vue";

export const routes = [
    { path: '/landingpage', component: landingPage, name: 'landingpage'},
    { path: '/loginpage', component: loginPage, name: 'loginpage'},
    { path: '/gamepage', component: gamePage, name: 'gamepage'},
    {path:'/scoreTable', component:scoreTable,name:'scoreTable'},
]