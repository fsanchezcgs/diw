export default {
  name: "Post",
  props: ["posta", "insert"],
  emits: ["editpost", "deletepost"],
  data: function () {
    return {
      currentPost: 0,
    };
  },
  methods: {
    editPost: function () {
      this.$emit("editpost");
    },
    deletePost: function () {
      this.$emit("deletepost");
    },
  },
  template: `
  <div class="bg-primary p-2 rounded-2 my-2">
    <h4>{{posta.title}}</h4>
    <p class="contentPost rounded-2 p-2">{{posta.content}}</p>
    <p class="m-0">Author: {{posta.author}}</p>
    <p class="m-0">Creation Date: {{posta.creationdate}}</p>
    <p class="m-0">Image: {{posta.image}}</p>
    <div>
      <input type="button" value="Edit" @click="editPost()" class="mx-1 p-1 rounded-1">
      <input type="button" value="Delete" @click="deletePost()" class="mx-1 p-1 rounded-1" v-if="insert">
      <input type="button" value="Delete" @click="deletePost()" class="mx-1 p-1 rounded-1" v-else="insert" disabled>
    </div>
  </div>`,
};
