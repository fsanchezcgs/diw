export default {
  name: "Formpost",
  data() {
    return {
      pageTitle: "Create Post",
      post: {
        title: "",
        content: "",
        image: "",
        raiting: null,
        status: "draft",
        creationDate: new Date().toLocaleDateString("en-GB"),
        publicationDate: null,
      },
      posts: [],
      insert: true,
      currentPost: 0,
    };
  },
  methods: {
    insertPost: function (e) {
      e.preventDefault();
      this.posts.push({
        title: this.post.title,
        content: this.post.content,
        image: this.post.image,
        author: user[0].userName,
        raiting: this.post.raiting,
        status: "draft",
        creationDate: this.post.creationDate,
        publicationDate: null,
      });
      localStorage.setItem("posts", JSON.stringify(this.posts));
      this.post.title = "";
      this.post.content = "";
    },
    editPost: function (index) {
      this.pageTitle = "Edit Post";
      this.insert = false;
      this.currentPost = index;
      this.post.title = this.posts[index].title;
      this.post.content = this.posts[index].content;
      this.post.author = this.posts[index].author;
      this.post.image = this.posts[index].image;
    },
    updatePost: function (e) {
      e.preventDefault();
      let editedPost = {
        title: this.post.title,
        content: this.post.content,
        image: this.posts[this.currentPost].image,
        author: this.posts[this.currentPost].author,
        raiting: this.posts[this.currentPost].raiting,
        status: this.posts[this.currentPost].status,
        creationDate: this.posts[this.currentPost].creationDate,
        publicationDate: this.posts[this.currentPost].publicationDate,
      };
      this.posts.splice(this.currentPost, 1, editedPost);
      this.insert = true;
      this.currentPost = 0;
      this.pageTitle = "Create Post";
      this.post.title = "";
      this.post.content = "";
    },
    deletePost: function (index) {
      this.posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    getName: function (e) {
      this.post.image = e.target.files[0].name;
    },
  },
  template: `
  <form
    class="d-flex flex-column justify-content-center align-items-center mt-2"
  >
    <h2 class="m-2">{{pageTitle}}</h2>
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
  </form>`,
};
