<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="foodCate"
             :rules="rules"
             ref="FoodCateFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="foodCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="foodCate.parentId"
                   placeholder="请选择分类">
          <el-option
              v-for="item in selectFoodCateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="foodCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="foodCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="foodCate.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="foodCate.icon"></single-upload>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="foodCate.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="foodCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('FoodCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('FoodCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import {fetchList,createFoodCate, updateFoodCate, getFoodCate} from "../../../../api/foodCate";
import SingleUpload from "../../../../components/Upload/singleUpload"

const defaultFoodCate = {
  description: '',
  icon: '',
  keywords: '',
  name: '',
  navStatus: 0,
  parentId: 0,
  showStatus: 0,
  sort: 0,
  FoodAttributeIdList: []
};

export default {
  name: "FoodCateDetail",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      foodCate: Object.assign({}, defaultFoodCate),
      selectFoodCateList: [],
      rules: {
        name: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      getFoodCate(this.$route.query.id).then(response => {
        this.foodCate = response.data;
      });
    } else {
      this.foodCate = Object.assign({}, defaultFoodCate);
    }
    this.getSelectFoodCateList();
  },
  methods:{
    getSelectFoodCateList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectFoodCateList = response.data.list;
        this.selectFoodCateList.unshift({id: 0, name: '无上级分类'});
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateFoodCate(this.$route.query.id, this.foodCate).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createFoodCate(this.foodCate).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            }
          });

        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.foodCate = Object.assign({}, defaultFoodCate);
      this.getSelectFoodCateList();
    }
  }
}
</script>

<style scoped>

</style>
