<template>
  <div class="hello">
    <div class="parent my-4">
      <div v-for="(eachBook, bookIndex) in bookLists" :key="bookIndex">
        <!-- {{eachBook}} -->
        <button
          @click="getBookDetails(eachBook.id, bookIndex)"
          :class="{ current: activeBook === bookIndex }"
        >
          {{ eachBook.title }}
        </button>
      </div>
    </div>

    <div class="chapterParent">
      <button
        v-for="(eachChapter, chapterIndex) in chapterLists"
        :key="chapterIndex"
        :class="{ currentChapter: activeChapter === chapterIndex }"
        @click="getChapter(eachChapter, chapterIndex)"
      >
        {{ eachChapter }}
      </button>
    </div>

    <div class="chapterParent" v-if="singlePage">
      <button
        @click="moveNextPage(singlePage.page_index, 'left')"
        v-if="currentPage"
      >
        Previous Page
      </button>
      <img
        :src="singlePage.image.file"
        :style="{
          height: singlePage.image.height,
          width: singlePage.image.width,
        }"
      />
      <button
        @click="moveNextPage(singlePage.page_index, 'right')"
        v-if="currentPage + 1 < lastPage"
      >
        Next Page
      </button>
      <p>{{ currentPage + 1 }}/{{ lastPage }}</p>
    </div>
  </div>
</template>

<script>
import {
  fetchBookApi,
  fetchChapterApi,
  fetchBookDetailsApi,
} from "@/api/manga.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      bookLists: [],
      chapterLists: [],
      pageLists: [],
      currentPage: null,
      singlePage: null,
      lastPage: null,
      currentPageShow: null,
      activeBook: null,
      activeChapter: null,
    };
  },
  created() {
    this.fetchBook();
  },
  methods: {
    moveNextPage(pageIndex, movement) {
      console.log(pageIndex);
      console.log(movement);

      if (movement === "left") {
        this.currentPage = pageIndex - 1;

        this.singlePage = this.pageLists[pageIndex - 1];
      }
      if (movement === "right") {
        this.currentPage = pageIndex + 1;

        this.singlePage = this.pageLists[pageIndex + 1];
      }
    },
    async getChapter(id, index) {
      const data = await fetchChapterApi(id);
      this.pageLists = data.data.pages;
      this.currentPage = 0;
      this.singlePage = this.pageLists[0];
      this.lastPage = this.pageLists.length;
      this.activeChapter = index;
      console.log(this.singlePage);
      // console.log(id)
    },
    async fetchBook() {
      try {
        const reponseBookList = await fetchBookApi();
        this.bookLists = reponseBookList.data;
        this.getBookDetails(this.bookLists[0].id, 0);
        console.log(this.bookLists);
      } catch (error) {
        console.log(error);
      }
    },
    async getBookDetails(id, index) {
      try {
        const { data } = await fetchBookDetailsApi(id);
        console.log(data);
        this.chapterLists = data.chapter_ids;
        // console.log(this.chapterLists)
        this.getChapter(this.chapterLists[0], 0);
        this.activeBook = index;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.books {
  display: flex;
}
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  max-width: 100%;
}
.current {
  background-color: green;
}
.currentChapter {
  background-color: green;
}
</style>
