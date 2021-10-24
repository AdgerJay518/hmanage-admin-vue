<template>
  <food-cate-detail :is-edit='true'></food-cate-detail>
</template>

<script>
import foodCateDetail from "./component/FoodCateDetail";
export default {
  name: "update",
  components:{foodCateDetail}
}
</script>

<style scoped>

</style>
