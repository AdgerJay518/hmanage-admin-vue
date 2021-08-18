<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写详细信息"></el-step>
      <el-step title="填写附加信息"></el-step>
      <el-step title="填写运动属性"></el-step>
    </el-steps>
    <sport-info-detail
        v-show="showStatus[0]"
        v-model="sportParam"
        :is-edit="isEdit"
        @nextStep="nextStep">
    </sport-info-detail>
    <sport-more-detail
        v-show="showStatus[1]"
        v-model="sportParam"
        :is-edit="isEdit"
        @nextStep="nextStep"
        @prevStep="prevStep">
    </sport-more-detail>
    <sport-attr-detail
        v-show="showStatus[2]"
        v-model="sportParam"
        :is-edit="isEdit"
        @prevStep="prevStep"
        @finishCommit="finishCommit">
    </sport-attr-detail>
  </el-card>
</template>

<script>
import SportInfoDetail from "./SportInfoDetail";
import SportMoreDetail from "./SportMoreDetail";
import SportAttrDetail from "./SportAttrDetail";
import {createSport, getSport, updateSport} from "../../../../api/sport";

const defaultSportParam ={
  sportCategoryId:null,
  sportCategoryName: '',
  name:'',
  description:'',
  sportSn:'',
  unit:'',
  calorie:0,
  sort:0,
  giftPoint: 0,
  giftGrowth: 0,
  recommandStatus: 0,
  detailTitle: '',
  detailDesc: '',
  keywords: '',
  note: '',
  detailHtml: '',
  detailMobileHtml: '',
  pic: '',
  albumPics: '',
}

export default {
  name: "SportDetail",
  components:{
    SportInfoDetail,
    SportMoreDetail,
    SportAttrDetail
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      sportParam: Object.assign({}, defaultSportParam),
      showStatus: [true, false, false]
    }
  },
  created(){
    if(this.isEdit){
      getSport(this.$route.query.id).then(response=>{
        this.sportParam=response.data;
      });
    }
  },
  methods:{
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      this.$confirm('是否要提交该相关信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(isEdit){
          updateSport(this.$route.query.id,this.sportParam).then(response=>{
            this.$message({
              type: 'success',
              message: '提交成功',
              duration:1000
            });
            this.$router.back();
          });
        }else{
          createSport(this.sportParam).then(response=>{
            this.$message({
              type: 'success',
              message: '提交成功',
              duration:1000
            });
            location.reload();
          });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
