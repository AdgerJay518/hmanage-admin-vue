<template>
  <div class="app-container">
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
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.planSn" class="input-width" placeholder="计划编号"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
                class="input-width"
                v-model="listQuery.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源：">
            <el-select v-model="listQuery.sourceType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in sourceTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="计划编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.planSn}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="计划总卡路里" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.totalCalorie}}</template>
        </el-table-column>
        <el-table-column label="计划总时长" width="120" align="center">
          <template slot-scope="scope">{{scope.row.totalTime}}h</template>
        </el-table-column>
        <el-table-column label="来源" width="120" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleViewOrder(scope.$index, scope.row)"
            >查看计划</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDeleteOrder(scope.$index, scope.row)"
                >删除计划</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
          size="small"
          v-model="operateType" placeholder="批量操作">
        <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small">
        确定
      </el-button>
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
import {fetchList,deleteList} from '../../../api/sportList'
import {formatDate} from '../../../utils/date';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  planSn: null,
  status: null,
  sourceType: null,
  createTime: null,
};
export default {
  name: "Calorie",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder:{
        dialogVisible:false,
        content:null,
        orderIds:[]
      },
      statusOptions: [
        {
          label: '待执行',
          value: 0
        },
        {
          label: '正在执行',
          value: 1
        },
        {
          label: '已完成',
          value: 2
        },
        {
          label: '已关闭',
          value: 3
        },
        {
          label: '无效计划',
          value: 4
        }
      ],
      sourceTypeOptions: [
        {
          label: 'PC端',
          value: 0
        },
        {
          label: 'APP微信小程序端',
          value: 1
        }
      ],
      operateOptions: [
        {
          label: "批量删除",
          value: 1
        }
      ],
      logisticsDialogVisible:false
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP端';
      } else {
        return 'PC端';
      }
    },
    formatStatus(value) {
      if (value === 0) {
        return '待执行';
      } else if (value === 1) {
        return '正在执行';
      } else if (value === 2) {
        return '已完成';
      } else if (value === 3) {
        return '已关闭';
      } else if (value === 4) {
        return '无效计划';
      } else {
        return '错误计划';
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleViewOrder(index, row){
      this.$router.push({path:'/sms/orderDetail',query:{id:row.id}})
    },
    handleCloseOrder(index, row){
      this.closeOrder.dialogVisible=true;
      this.closeOrder.orderIds=[row.id];
    },
    handleDeleteOrder(index, row){
      let ids=[];
      ids.push(row.id);
      this.deleteOrder(ids);
    },
    handleBatchOperate(){
      if(this.multipleSelection==null||this.multipleSelection.length<1){
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if(this.operateType===1){
        //删除订单
        let ids=[];
        for(let i=0;i<this.multipleSelection.length;i++){
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids);
      }
    },
    handleSizeChange(val){
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val){
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    deleteOrder(ids){
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids",ids);
        deleteList(params).then(response=>{
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      })
    },
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


