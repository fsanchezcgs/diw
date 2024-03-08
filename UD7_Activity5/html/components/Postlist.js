import Post from "./Post.js";
export default {
  name: "Postlist",
  props: ["insert", "posts"],
  emits: ["editpost", "deletepost"],
  components: {
    Post,
  },
  methods: {
    showForm: function () {
      this.$router.push("/Formpost");
    },
    editPost: function (index) {
      this.$emit("editpost", index);
    },
    deletePost: function (index) {
      this.$emit("deletepost", index);
    },
  },
  template: `
  <div class="">
    <button @click="showForm">new post</button>
  </div>
  <div class="d-flex justify-content-center align-content-center flex-wrap m-1">
    <Post
      v-for="(posta, index) in posts"
      :posta="posta"
      :insert="insert"
      @editpost="editPost(index)"
      @deletepost="deletePost(index)"
      class=" m-2"
    ></Post>
  </div>`,
};
