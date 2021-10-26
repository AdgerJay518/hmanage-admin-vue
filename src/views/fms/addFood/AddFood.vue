<template>
  <FoodDetail :is-edit='false'></FoodDetail>
</template>

<script>
import FoodDetail from "../food/Component/FoodDetail";
export default {
  name: "addFood",
  components:{FoodDetail}
}
</script>

<style scoped>

</style>
