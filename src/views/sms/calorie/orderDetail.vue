<template>
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前计划状态：{{order.status | formatStatus}}</span>
        <div class="operate-button-container"
             v-show="order.status===0
             ||order.status===1
             ||order.status===2
             ||order.status===3
">
          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===4">
          <el-button size="mini" @click="handleDeleteOrder">删除该条无效计划</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">计划编号</el-col>
          <el-col :span="6" class="table-cell-title">用户账号</el-col>
          <el-col :span="6" class="table-cell-title">用户编号</el-col>
          <el-col :span="6" class="table-cell-title">订单类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.planSn}}</el-col>
          <el-col :span="6" class="table-cell">{{order.memberUsername}}</el-col>
          <el-col :span="6" class="table-cell">{{order.memberId}}</el-col>
          <el-col :span="6" class="table-cell">{{order.sourceType | formatSourceType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">消耗卡路里</el-col>
          <el-col :span="4" class="table-cell-title">总时长</el-col>
          <el-col :span="4" class="table-cell-title">自动确认时间</el-col>
          <el-col :span="4" class="table-cell-title">计划可得积分</el-col>
          <el-col :span="4" class="table-cell-title">计划可得成长值</el-col>
          <el-col :span="4" class="table-cell-title">备注信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.totalCalorie | formatNull}}卡</el-col>
          <el-col :span="4" class="table-cell">{{order.totalTime | formatNull}}h</el-col>
          <el-col :span="4" class="table-cell">{{order.autoConfirmDay}}天</el-col>
          <el-col :span="4" class="table-cell">{{order.integration | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">{{order.growth | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">{{order.note | formatNull}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">运动信息</span>
      </div>
      <el-table
          ref="orderItemTable"
          :data="order.orderItemList"
          style="width: 100%;margin-top: 20px" border>
        <el-table-column label="图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.sfPic" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.sfName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="卡路里/运动号" width="120" align="center">
          <template slot-scope="scope">
            <p>卡路里：{{scope.row.sfCalorie}}卡</p>
            <p>运动号：{{scope.row.sfId}}</p>
          </template>
        </el-table-column>
        <el-table-column label="计划编号" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderSn}}
          </template>
        </el-table-column>
        <el-table-column label="时间" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.sfQuantity*0.5}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.sfCalorie*scope.row.sfQuantity*0.5}}卡
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：<span class="color-danger">{{order.totalCalorie}}卡</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">运动信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="12" class="table-cell-title">运动合计</el-col>
          <el-col :span="12" class="table-cell-title">时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-cell">{{order.totalCalorie}}卡</el-col>
          <el-col :span="12" class="table-cell">￥{{order.totalTime}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">操作信息</span>
      </div>
      <el-table style="margin-top: 20px;width: 100%"
                ref="orderHistoryTable"
                :data="order.historyList" border>
        <el-table-column label="操作者"  width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.operateMan}}
          </template>
        </el-table-column>
        <el-table-column label="操作时间"  width="160" align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="状态"  width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatStatus}}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{scope.row.note}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="发送站内信"
               :visible.sync="messageDialogVisible"
               width="40%">
      <el-form :model="message"
               ref="receiverInfoForm"
               label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注"
               :visible.sync="markOrderDialogVisible"
               width="40%">
      <el-form :model="markInfo"
               label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getOrderDetail,updateOrderNote,deleteOrder} from '../../../api/sportList';
import {formatDate} from '../../../utils/date';
export default {
  name: 'orderDetail',
  data() {
    return {
      id: null,
      order: {},
      receiverDialogVisible:false,
      moneyDialogVisible:false,
      moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
      messageDialogVisible:false,
      message: {title:null, content:null},
      closeDialogVisible:false,
      closeInfo:{note:null,id:null},
      markOrderDialogVisible:false,
      markInfo:{note:null},
      logisticsDialogVisible:false
    }
  },
  created() {
    this.id = this.list = this.$route.query.id;
    getOrderDetail(this.id).then(response => {
      this.order = response.data;
      console.log(this.order.orderItemList)
    });
  },
  filters: {
    formatNull(value) {
      if(value===undefined||value===null||value===''){
        return '暂无';
      }else{
        return value;
      }
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
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    showMessageDialog(){
      this.messageDialogVisible=true;
      this.message.title=null;
      this.message.content=null;
    },
    handleSendMessage(){
      this.$confirm('是否要发送站内信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.messageDialogVisible=false;
        this.$message({
          type: 'success',
          message: '发送成功!'
        });
      });
    },
    showMarkOrderDialog(){
      this.markOrderDialogVisible=true;
      this.markInfo.id=this.id;
    },
    handleMarkOrder(){
      this.$confirm('是否要备注订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id",this.markInfo.id);
        params.append("note",this.markInfo.note);
        params.append("status",this.order.status);
        updateOrderNote(params).then(response=>{
          this.markOrderDialogVisible=false;
          this.$message({
            type: 'success',
            message: '订单备注成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder(){
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids",[this.id]);
        deleteOrder(params).then(response=>{
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.$router.back();
        });
      })
    }
  }
}
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #F2F6FC;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


