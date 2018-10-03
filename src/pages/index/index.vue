<template>
  <div>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
  </div>
</template>

<script>
import utils from '../../utils.js'
import Card from '@/components/Card.vue'

export default {
  data () {
    return {
      books:[]
    }
  },

  components: {
    Card
  },

  methods: {
    async getList(){
      const books = await utils.get('/weapp/booklist')
      console.log(books)
      this.books = books.list;
    }

  },

  created () {
    console.log("我是首页启动");
    this.getList();
  },
  
}
</script>

<style scoped>

</style>
