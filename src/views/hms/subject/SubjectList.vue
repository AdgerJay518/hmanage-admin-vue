<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
          class="btn-add"
          @click="handleAddSubjectList()"
          size="mini">
        添加主题
      </el-button></el-card>

    <div class="table-container">
      <el-table ref="listTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="专题分类名称" width="120" align="center">
          <template slot-scope="scope">{{scope.row.categoryName}}</template>
        </el-table-column>
        <el-table-column label="标题" width="140" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="主图"  align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="内容" show-overflow-tooltip  align="center">
          <template slot-scope="scope">
            <el-popover
                placement="top-start"
                title="内容"
                width="200"
                trigger="hover"
                :content="scope.row.description"
            >
              <span slot="reference">{{scope.row.description}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="阅读量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.readCount}}次</template>
        </el-table-column>
        <el-table-column label="点击量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.collectCount}}次</template>
        </el-table-column>
        <el-table-column label="评论量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.commentCount}}条</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleShowComment(scope.$index, scope.row)">评论
            </el-button>
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

import {listByCateId,deleteSubject} from '../../../api/subject';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  subjectId: null
};

export default {
  name: "SubjectList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      subList:{}
    }
  },
  created(){
    this.listQuery.subjectId=this.$route.query.subjectId;
    this.getList();
  },
  methods:{
    handleAddSubjectList(){
      this.$router.push('/hms/addSubjectList');
    },
    handleShowComment(index,row){
      this.$router.push({path:'/hms/subjectComment',query:{
          subjectId:row.id}})
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleUpdate(index,row){
      this.$router.push({path:'/hms/updateSubjectList',query:{id:row.id}});
    },
    handleDelete(index,row){
      this.$confirm('是否要删除该专题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params=new URLSearchParams();
        params.append("id",row.id);
        deleteSubject(params).then(response => {
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
      listByCateId(this.listQuery).then(response => {
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
.input-width{
  width: 200px;
}
.el-tooltip__popper{
  display: none;
  max-width:30%
}
</style>
