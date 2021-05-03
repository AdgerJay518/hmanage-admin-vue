<template>
  <el-dialog
      title="添加菜单"
      :visible.sync="centerDialogVisible"
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "addMenu",
  data(){
    return{
      centerDialogVisible: false,
      ruleForm:{

      }
    }
  }
}
</script>

<style scoped>

</style>
