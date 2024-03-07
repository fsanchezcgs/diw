import Formpost from "./components/Formpost.js";
import Postlist from "./components/Postlist.js";

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: "/", component: Postlist },
    { path: "/Formpost", component: Formpost },
  ],
});

export default router;
