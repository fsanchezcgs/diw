export default {
  name: "Formpost",
  props: ["pagetitle", "posts", "post", "insert", "currentpost"],
  emits: ["update"],
  methods: {
    insertPost: function (e) {
      e.preventDefault();
      this.posts.push({
        title: this.post.title,
        content: this.post.content,
        image: this.post.image,
        author: user[0].userName,
        raiting: this.post.raiting,
        status: this.post.status,
        creationDate: this.post.creationDate,
        publicationDate: null,
      });
      localStorage.setItem("posts", JSON.stringify(this.posts));
      this.post.title = "";
      this.post.content = "";
      this.$router.push("/")
    },
    getName: function (e) {
      this.post.image = e.target.files[0].name;
    },
    updatePost: function () {
      console.log("object");
      this.$emit("update");
    },
  },
  template: `
  <div
    class="d-flex flex-column justify-content-center align-items-center mt-2"
  >
    <h2 class="m-2">{{pagetitle}}</h2>
    <input v-model="post.title" type="text" name="title" class="m-1" />
    <textarea
      v-model="post.content"
      maxlength="750"
      name="content"
      class="m-1 insertText"
    ></textarea>
    <input
      v-on:change="getName"
      type="file"
      name="image"
      accept="image/png, image/jpg"
    />
    <button
      v-on:click="insertPost"
      v-if="insert"
      class="m-1 p-1 rounded-1"
    >
      Insert
    </button>
    <button
      v-on:click="updatePost"
      v-else="insert"
      class="m-1 p-1 rounded-1"
    >
      Update
    </button>
  </div>`,
};
