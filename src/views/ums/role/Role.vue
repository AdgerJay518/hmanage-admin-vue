<template>
<div>
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
        查询搜索
      </el-button>
      <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
        重置
      </el-button>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true"  size="small" label-width="140px">
        <el-form-item label="输入搜索：">
          <el-input v-model="searchForm.name" class="input-width" placeholder="角色名称" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets" style="margin-top: 5px"></i>
    <span style="margin-top: 5px">数据列表</span>
    <el-button
        class="btn-add"
        @click="handleAdd()"
        size="mini">
      添加
    </el-button>
  </el-card>
  <div class="table-container">
    <el-table ref="roleTable"
              :data="list"
              style="width: 100%;"
              v-loading="listLoading" border>
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <el-table-column label="用户数"  width="100" align="center">
        <template slot-scope="scope">{{scope.row.adminCount}}</template>
      </el-table-column>
      <el-table-column label="添加时间" width="160" align="center">
        <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
      </el-table-column>
      <el-table-column label="是否启用" width="140" align="center">
        <template slot-scope="scope">
          <el-switch
              @change=""
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini"
                       type="text"
                       @click="handleSelectMenu(scope.$index, scope.row)">分配菜单
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="">分配资源
            </el-button>
          </el-row>
          <el-row>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!--  编辑角色和添加角色对话框-->
  <el-dialog
      :title="isEdit?'编辑角色':'添加角色'"
      :visible.sync="dialogVisible"
      width="40%">
    <el-form :model="role"
             ref="roleForm"
             label-width="150px" size="small">
      <el-form-item label="角色名称：">
        <el-input v-model="role.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="role.description"
                  type="textarea"
                  :rows="5"
                  style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio-group v-model="role.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
  </el-dialog>

  <div class="pagination-container">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="searchForm.pageNum"
        :page-size="searchForm.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
    </el-pagination>
  </div>

</div>
</template>

<script>
import {formatDate} from '../../../utils/date';
import {createRole,updateRole,deleteRole} from '../../../api/role';
const defaultSearchForm = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1
};
export default {
  name: "Role",
  data(){
    return {
      searchForm:Object.assign({}, defaultSearchForm),
      list: [
        {
          id:' ',
          name:' ',
          description:' ',
          adminCount:' ',
          createTime:' ',
          status:' '
        }
      ],
      total: null,
      listLoading: false,
      dialogVisible: false,
      role: Object.assign({}, defaultRole),
      isEdit: false
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods:{
    getList(){
      this.listLoading=true
      this.$axios.get('/ums/role/List').then(res=>{
        this.listLoading=false
        this.list=res.data.data.list
        this.total = res.data.data.list.length;
      })
    },
    handleSelectMenu(index,row){
      this.$router.push({path:'/ums/allocMenu',query:{roleId:row.id}})
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    handleSearchList() {
      this.searchForm.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.role = Object.assign({},defaultRole);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = Object.assign({},row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateRole(this.role.id,this.role).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          createRole(this.role).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        }
      })
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        let params=new URLSearchParams();
        params.append("ids",ids);
        deleteRole(params).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
  }
}
</script>

<style scoped>
.btn-add{
  float: right;
}

.operate-container {
  margin-top: 20px;
}
.table-container {
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
</style>
