<template>
<food-detail :is-edit='true'></food-detail>
</template>

<script>

import FoodDetail from "./Component/FoodDetail";
export default {
  name: "update",
  components:{FoodDetail}
}
</script>

<style scoped>

</style>
