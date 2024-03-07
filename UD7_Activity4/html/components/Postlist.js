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
      console.log("object");
      this.$router.push("/Formpost");
    },
    editPost: function (index) {
      //s'index no s'envia :(
      this.$emit("editpost", index);
    },
    deletePost: function (index) {
      //s'index no s'envia :(
      this.$emit("deletepost", index);
    },
  },
  template: `
  <button @click="showForm">new post</button>
  <div class="m-1">
    <Post
      v-for="(posta, index) in posts"
      :posta="posta"
      :insert="insert"
      @editpost="editPost(index)"
      @deletepost="deletePost(index)"
    ></Post>
  </div>`,
};
