import Post from "./Post.js";
export default {
  name: "Postlist",
  props: ["insert", "posts"],
  components: {
    Post,
  },
  methods: {
    showForm: function () {
      console.log("object");
      this.$router.push("/Formpost");
    },
  },
  template: `
  <button @click="showForm">new post</button>
  <div class="m-1">
    <Post
      v-for="(posta, index) in posts"
      :posta="posta"
      :insert="insert"
      @edit-post="editPost(index)"
      @delete-post="deletePost(index)"
    ></Post>
  </div>`,
};
