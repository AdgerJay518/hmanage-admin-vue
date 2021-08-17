<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="sportCate"
             :rules="rules"
             ref="SportCateFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="sportCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="sportCate.parentId"
                   placeholder="请选择分类">
          <el-option
              v-for="item in selectSportCateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="sportCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="sportCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="sportCate.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="sportCate.icon"></single-upload>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="sportCate.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="sportCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('SportCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('SportCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import {fetchList,createSportCate, updateSportCate, getSportCate} from "../../../../api/sportCate";
import SingleUpload from "../../../../components/Upload/singleUpload"

const defaultSportCate = {
  description: '',
  icon: '',
  keywords: '',
  name: '',
  navStatus: 0,
  parentId: 0,
  showStatus: 0,
  sort: 0,
  sportAttributeIdList: []
};
export default {
  name: "SportCateDetail",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sportCate: Object.assign({}, defaultSportCate),
      selectSportCateList: [],
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
      getSportCate(this.$route.query.id).then(response => {
        this.sportCate = response.data;
      });
    } else {
      this.sportCate = Object.assign({}, defaultSportCate);
    }
    this.getSelectSportCateList();
  },
  methods:{
    getSelectSportCateList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectSportCateList = response.data.list;
        this.selectSportCateList.unshift({id: 0, name: '无上级分类'});
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
              updateSportCate(this.$route.query.id, this.sportCate).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createSportCate(this.sportCate).then(response => {
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
      this.sportCate = Object.assign({}, defaultSportCate);
      this.getSelectSportCateList();
    }
  }
}
</script>

<style scoped>

</style>
