export default {
  name: "Post",
  props: ["title", "content", "author", "creationdate", "image", "insert"],
  methods: {
    editPost: function (index) {
      this.$emit("editPost", index);
    },
    deletePost: function (index) {
      this.$emit("deletePost", index);
    },
  },
  template: `
  <div class="bg-primary p-2 rounded-2 my-2">
    <h4>{{title}}</h4>
    <p class="contentPost rounded-2 p-2">{{content}}</p>
    <p class="m-0">Author: {{author}}</p>
    <p class="m-0">Creation Date: {{creationdate}}</p>
    <p class="m-0">Image: {{image}}</p>
    <div>
      <input type="button" value="Edit" @click="editPost(index)" class="mx-1 p-1 rounded-1">
      <input type="button" value="Delete" @click="deletePost(index)" class="mx-1 p-1 rounded-1" v-if="insert">
      <input type="button" value="Delete" @click="deletePost(index)" class="mx-1 p-1 rounded-1" v-else="insert" disabled>
    </div>
  </div>`,
};
