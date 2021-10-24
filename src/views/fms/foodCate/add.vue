<template>
  <food-cate-detail :is-edit='false'></food-cate-detail>
</template>

<script>
import foodCateDetail from "./component/FoodCateDetail";

export default {
  name: "add",
  components:{foodCateDetail}
}
</script>

<style scoped>

</style>
