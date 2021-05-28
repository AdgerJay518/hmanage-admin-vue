<template>
<div>
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
          style="float:right"
          type="primary"
          @click=""
          size="small">
        查询搜索
      </el-button>
      <el-button
          style="float:right;margin-right: 15px"
          @click=""
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
        @click="centerDialogVisible=true"
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
                       @click="">分配菜单
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="">分配资源
            </el-button>
          </el-row>
          <el-row>
            <el-button size="mini"
                       type="text"
                       @click="">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="">删除
            </el-button>
          </el-row>
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
const defaultListQuery = {
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
      searchForm:Object.assign({}, defaultListQuery),
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
        this.list=res.data.data
        this.total = res.data.data.length;
        console.log("total="+this.total)
      })
    },
    handleSizeChange(val) {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getList();
    }
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
