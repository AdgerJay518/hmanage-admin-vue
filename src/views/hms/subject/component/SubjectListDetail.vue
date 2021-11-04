<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="subject"
             :rules="rules"
             ref="subjectFrom"
             label-width="150px">
      <el-form-item label="标题：" prop="name">
        <el-input v-model="subject.title"></el-input>
      </el-form-item>
      <el-form-item label="专题：">
        <el-select v-model="subject.categoryId"
                   placeholder="请选择分类">
          <el-option
              v-for="item in selectSubject"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐：">
        <el-radio-group v-model="subject.recommendStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主图：">
        <single-upload v-model="subject.pic"></single-upload>
      </el-form-item>
      <el-form-item label="内容：">
        <tiny-mac :width="200" :height="200" v-model="subject.description"></tiny-mac>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import TinyMac from "../../../../components/imcoder-tinymce"
import SingleUpload from "../../../../components/Upload/singleUpload"
import {create, getSubject, updateSubject} from "../../../../api/subject";
import {fetchList} from "../../../../api/homeSubject";

const defaultSubject = {
  title: '',
  pic: '',
  recommendStatus:'',
  createTime: '',
  collectCount:'',
  readCount:'',
  commentCount:'',
  description:'',
  showStatus:'',
  categoryName:'',
};

export default {
  name: "SubjectListDetail",
  components: {SingleUpload,TinyMac},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subject: Object.assign({}, defaultSubject),
      selectSubject:[],
      preCategoryId:null,
      listQuery:{
        recommendStatus:null,
        subjectName: null,
        pageNum: 1,
        pageSize: 5
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      getSubject(this.$route.query.id).then(response => {
        this.subject = response.data;
        this.preCategoryId=this.subject.categoryId
      });
    } else {
      this.subject = Object.assign({}, defaultSubject);
    }
    this.getSelectSubject();
  },
  methods:{
    getSelectSubject() {
      fetchList(this.listQuery).then(response => {
        this.selectSubject = response.data.list;
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
              updateSubject(this.preCategoryId,this.subject).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              create(this.subject).then(response => {
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
      this.subject = Object.assign({}, defaultSubject);
      this.getSelectSubject();
    }
  }
}
</script>

<style scoped>

</style>
