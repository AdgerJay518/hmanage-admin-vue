<template>
<div class="app-container">
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets" style="margin-top: 5px"></i>
    <span style="margin-top: 5px">数据列表</span>
    <el-button
        class="btn-add"
        @click="centerDialogVisible=true"
        size="mini">
      添加
    </el-button>
  </el-card>
  <div class="table-container">
    <el-table :data="list"
              ref="menuTable"
              style="width: 100%"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              border>
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="菜单名称" align="center">
        <template slot-scope="scope">{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column label="菜单级数" width="100" align="center">
        <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
      </el-table-column>
      <el-table-column label="前端名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="前端图标" width="100" align="center">
        <template slot-scope="scope"><svg-icon :icon-class="scope.row.icon"></svg-icon></template>
      </el-table-column>
      <el-table-column label="是否显示" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
              @change="handleHiddenChange(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.hidden">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="100" align="center">
        <template slot-scope="scope">{{scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
                @confirm="del(scope.row.id)"
            >
              <el-button slot="reference" size="mini" type="text" >删除</el-button>
            </el-popconfirm>
          </template>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog
        title="添加菜单"
        :visible.sync="centerDialogVisible"
        :before-close="handleClose"
        width="30%"
        center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="level">
          <el-select v-model="ruleForm.level" >
            <template v-for="item in list">
              <el-option :label='item.title' :value="item.level"></el-option>
              <template v-for="child in item.children">
                <el-option :label='child.title' :value="child.level">
                  <span>{{"- "+child.title}}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="前端名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="ruleForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="hidden">
          <el-radio-group v-model="ruleForm.hidden">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</div>
</template>

<script>
import {TreeList, updateHidden} from "../../../api/menu";

export default {
  name: "menu",
  data(){
    return {
      list:[],
      centerDialogVisible: false,
      ruleForm:"null",
      rules:{
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        hidden: [
          { required: true, message: '请选择是否显示', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '请填入排序号', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(){
      TreeList().then(response => {
        this.list = response.data.data;
      })
    },
    edit(id){
      this.$axios.get('/ums/menu/info/'+id).then(res=>{
        this.ruleForm=res.data.data
        this.centerDialogVisible=true
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/ums/menu/'+(this.ruleForm.id?'update':'save'), this.ruleForm).then(res=>{
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
              onClose:()=>{
                this.getList()
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleHiddenChange(index, row) {
      updateHidden(row.id,{hidden:row.hidden}).then(response=>{
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
      this.centerDialogVisible=false;
      this.ruleForm={}
    },
    handleClose(){
      this.resetForm('ruleForm')
    },
    del(id){
      this.$axios.post('/ums/menu/delete/'+id).then(res=>{
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success',
          onClose:()=>{
            this.getList()
          }
        });
      })
    }
  }
}
</script>

<style scoped>
.table-container{
  margin-top: 20px;
}
.app-container{
  padding: 20px;
}
.btn-add{
  float: right;
}
</style>
