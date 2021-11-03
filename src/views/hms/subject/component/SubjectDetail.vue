<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="subjectCate"
             :rules="rules"
             ref="subjectCateFrom"
             label-width="150px">
      <el-form-item label="专题名称：" prop="name">
        <el-input v-model="subjectCate.name"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="subjectCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否推荐：">
        <el-radio-group v-model="subjectCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标：">
        <single-upload v-model="subjectCate.icon"></single-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import SingleUpload from "../../../../components/Upload/singleUpload"
import {getSubjectCate,create,updateSubject} from '../../../../api/homeSubject';

const defaultSubjectCate = {
  name: '',
  icon: '',
  subjectCount:'',
  showStatus: '',
  sort: 0
};

export default {
  name: "SubjectDetail",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subjectCate: Object.assign({}, defaultSubjectCate),
      rules: {
        name: [
          {required: true, message: '请输入专题名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  created() {
    if (this.isEdit) {
      getSubjectCate(this.$route.query.id).then(response => {
        this.subjectCate = response.data;
      });
    } else {
      this.subjectCate = Object.assign({}, defaultSubjectCate);
    }
  },

  methods:{
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateSubject(this.$route.query.id, this.subjectCate).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              create(this.subjectCate).then(response => {
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
      this.subjectCate = Object.assign({}, defaultSubjectCate);
    }
  }
}
</script>

<style scoped>

</style>
