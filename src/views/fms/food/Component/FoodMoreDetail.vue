<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="是否推荐：">
        <span style="margin-left: 10px;margin-right: 10px">推荐</span>
        <el-switch
            v-model="value.recommandStatus"
            :active-value="1"
            :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="详细页标题：">
        <el-input v-model="value.detailTitle"></el-input>
      </el-form-item>
      <el-form-item label="详细页描述：">
        <el-input v-model="value.detailDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字：">
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <el-form-item label="商品备注：">
        <el-input v-model="value.note" type="textarea" :autoSize="true"></el-input>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写详细信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，填写运动属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "FoodMoreDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    handlePrev() {
      this.$emit('prevStep')
    },
    handleNext() {
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>

</style>
