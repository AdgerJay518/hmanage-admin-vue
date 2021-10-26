<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写详细信息"></el-step>
      <el-step title="填写附加信息"></el-step>
      <el-step title="填写食品属性"></el-step>
    </el-steps>
    <food-info-detail
        v-show="showStatus[0]"
        v-model="foodParam"
        :is-edit="isEdit"
        @nextStep="nextStep">
    </food-info-detail>
    <food-more-detail
        v-show="showStatus[1]"
        v-model="foodParam"
        :is-edit="isEdit"
        @nextStep="nextStep"
        @prevStep="prevStep">
    </food-more-detail>
    <food-attr-detail
        v-show="showStatus[2]"
        v-model="foodParam"
        :is-edit="isEdit"
        @prevStep="prevStep"
        @finishCommit="finishCommit">
    </food-attr-detail>
  </el-card>
</template>

<script>

import FoodInfoDetail from "./FoodInfoDetail";
import FoodMoreDetail from "./FoodMoreDetail";
import FoodAttrDetail from "./FoodAttrDetail";
import {createFood, getFood, updateFood} from "../../../../api/food";

const defaultfoodParam ={
  foodCategoryId:null,
  foodCategoryName: '',
  name:'',
  description:'',
  foodSn:'',
  unit:'',
  calorie:0,
  sort:0,
  recommandStatus: 0,
  detailTitle: '',
  detailDesc: '',
  keywords: '',
  note: '',
  detailHtml: '',
  detailMobileHtml: '',
  pic: '',
  albumPics: '',
}
export default {
  name: "FoodDetail",
  components:{
    FoodInfoDetail,
    FoodMoreDetail,
    FoodAttrDetail
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      foodParam: Object.assign({}, defaultfoodParam),
      showStatus: [true, false, false]
    }
  },
  created(){
    if(this.isEdit){
      getFood(this.$route.query.id).then(response=>{
        this.foodParam=response.data;
      });
    }
  },
  methods:{
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      this.$confirm('是否要提交该相关信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(isEdit){
          updateFood(this.$route.query.id,this.foodParam).then(response=>{
            this.$message({
              type: 'success',
              message: '提交成功',
              duration:1000
            });
            this.$router.back();
          });
        }else{
          createFood(this.foodParam).then(response=>{
            this.$message({
              type: 'success',
              message: '提交成功',
              duration:1000
            });
            location.reload();
          });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
