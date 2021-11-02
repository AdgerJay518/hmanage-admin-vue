<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>

    <div class="table-container">
      <el-table ref="listTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" width="120" align="center">
          <template slot-scope="scope">{{scope.row.memberNickName}}</template>
        </el-table-column>
        <el-table-column label="用户头像"  width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.memberIcon"></template>
        </el-table-column>
        <el-table-column label="评论内容" align="center">
          <template slot-scope="scope">
            <el-popover
                placement="top-start"
                title="内容"
                width="200"
                trigger="hover"
                :content="scope.row.content"
            >
              <span slot="reference">{{scope.row.content}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="通过/不通过" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
                @change="handleUpdateStatus(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="160" align="center">
          <template slot-scope="scope">{{scope.row.showStatus | formatShowStatus}}</template>
        </el-table-column>
        <el-table-column label="评论时间" width="160" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.createTime | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                  size="mini"
                  type="warning"
                  @click="handleWarning(scope.$index, scope.row)">警告
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {listById,updateStatus,deleteComment} from '../../../api/subjectcomm';
import {formatDate} from '../../../utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  subjectId: null
};

export default {
  name: "SubjectComment",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      editDialogVisible:false,
      subList:{}
    }
  },
  created(){
    this.listQuery.subjectId=this.$route.query.subjectId;
    this.getList();
  },
  filters:{
    formatShowStatus(status){
      if(status===1){
        return '通过审核';
      }else{
        return '该条评论违规，无法通过审核';
      }
    },
    formatTime(time){
      if(time==null||time===''){
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  methods:{
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleUpdateStatus(index,row){
      this.$confirm('是否要修改审核状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id,{status:row.status}).then(response=>{
          this.getList();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消操作!'
        });
        this.getList();
      });
    },
    handleWarning(index,row){
      this.$confirm('该次警告将会扣除该用户信誉分，是否继续该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '执行成功!'
        });
      });
    },

    handleDelete(index,row){
      this.$confirm('是否要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteComment(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },

    getList() {
      this.listLoading = true;
      listById(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
  }
}
</script>

<style scoped>
.operate-container{
  margin-top: 0;
}
</style>
