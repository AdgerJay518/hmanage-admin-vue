<template>
  <sport-detail :is-edit='false'></sport-detail>
</template>

<script>
import SportDetail from "../sport/Component/SportDetail";

export default {
  name: "AddSport",
  components:{SportDetail}
}
</script>

<style scoped>

</style>
