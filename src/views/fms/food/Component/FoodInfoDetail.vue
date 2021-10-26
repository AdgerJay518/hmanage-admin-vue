<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="foodInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="食品分类：" prop="FoodCategoryId">
        <el-cascader
            v-model="selectFoodCateValue"
            :options="foodCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="食品描述：">
        <el-input
            :autoSize="true"
            v-model="value.description"
            type="textarea"
            placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="食品号：">
        <el-input v-model="value.foodSn"></el-input>
      </el-form-item>
      <el-form-item label="单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="卡路里：">
        <el-input v-model="value.calorie" style="width: 300px"></el-input>
        <span style="margin-left: 20px">大卡</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('foodInfoForm')">下一步，填写附加信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {fetchListWithChildren} from "../../../../api/foodCate";
export default {
  name: "FoodInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasEditCreated:false,
      selectFoodCateValue: [],
      foodCateOptions: [],
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        foodCategoryId: [{required: true, message: '请选择分类', trigger: 'blur'}],
        description: [{required: true, message: '请输入食品描述', trigger: 'blur'}],
        requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
      }
    };
  },
  created() {
    this.getFoodCateList();
  },
  computed:{
    foodId(){
      return this.value.id;
    }
  },
  watch: {
    foodId:function(newValue){
      if(!this.isEdit)return;
      if(this.hasEditCreated)return;
      if(newValue===undefined||newValue==null||newValue===0)return;
      this.handleEditCreated();
    },
    selectFoodCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.foodCategoryId = newValue[1];
        this.value.foodCategoryName= this.getCateNameById(this.value.foodCategoryId);
      } else {
        this.value.foodCategoryId = null;
        this.value.foodCategoryName=null;
      }
    }
  },
  methods:{
    handleEditCreated(){
      if(this.value.foodCategoryId!=null){
        this.selectFoodCateValue.push(this.value.cateParentId);
        this.selectFoodCateValue.push(this.value.foodCategoryId);
      }
      this.hasEditCreated=true;
    },
    getFoodCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.foodCateOptions = [];
        console.log(this.foodCateOptions)
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({label: list[i].children[j].name, value: list[i].children[j].id});
            }
          }
          this.foodCateOptions.push({label: list[i].name, value: list[i].id, children: children});
        }
      });
    },
    getCateNameById(id){
      let name=null;
      for(let i=0;i<this.foodCateOptions.length;i++){
        for(let j=0;j<this.foodCateOptions[i].children.length;j++){
          if(this.foodCateOptions[i].children[j].value===id){
            name=this.foodCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep');
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
