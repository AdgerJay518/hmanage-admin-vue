<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="sportInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="运动分类：" prop="sportCategoryId">
        <el-cascader
            v-model="selectSportCateValue"
            :options="sportCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="运动描述：">
        <el-input
            :autoSize="true"
            v-model="value.description"
            type="textarea"
            placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="运动号：">
        <el-input v-model="value.sportSn"></el-input>
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
        <el-button type="primary" size="medium" @click="handleNext('sportInfoForm')">下一步，填写附加信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {fetchListWithChildren} from "../../../../api/sportCate";

export default {
  name: "SportInfoDetail",
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
      selectSportCateValue: [],
      sportCateOptions: [],
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        sportCategoryId: [{required: true, message: '请选择分类', trigger: 'blur'}],
        description: [{required: true, message: '请输入运动描述', trigger: 'blur'}],
        requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
      }
    };
  },
  created() {
    this.getSportCateList();
  },
  computed:{
    sportId(){
      return this.value.id;
    }
  },
  watch: {
    sportId:function(newValue){
      if(!this.isEdit)return;
      if(this.hasEditCreated)return;
      if(newValue===undefined||newValue==null||newValue===0)return;
      this.handleEditCreated();
    },
    selectSportCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.sportCategoryId = newValue[1];
        this.value.sportCategoryName= this.getCateNameById(this.value.sportCategoryId);
      } else {
        this.value.sportCategoryId = null;
        this.value.sportCategoryName=null;
      }
    }
  },
  methods:{
    handleEditCreated(){
      if(this.value.sportCategoryId!=null){
        this.selectSportCateValue.push(this.value.cateParentId);
        this.selectSportCateValue.push(this.value.sportCategoryId);
      }
      this.hasEditCreated=true;
    },
    getSportCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.sportCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({label: list[i].children[j].name, value: list[i].children[j].id});
            }
          }
          this.sportCateOptions.push({label: list[i].name, value: list[i].id, children: children});
        }
      });
    },
    getCateNameById(id){
      let name=null;
      for(let i=0;i<this.sportCateOptions.length;i++){
        for(let j=0;j<this.sportCateOptions[i].children.length;j++){
          if(this.sportCateOptions[i].children[j].value===id){
            name=this.sportCateOptions[i].children[j].label;
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
