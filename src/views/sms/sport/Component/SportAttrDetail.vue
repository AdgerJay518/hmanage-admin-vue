<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="sportAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="商品相册：">
        <multi-upload v-model="selectSportPics"></multi-upload>
      </el-form-item>
      <el-form-item label="规格参数：">
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="电脑端详情" name="pc">
            <tiny-mac :width="595" :height="300" v-model="value.detailHtml"></tiny-mac>
          </el-tab-pane>
          <el-tab-pane label="移动端详情" name="mobile">
            <tiny-mac :width="595" :height="300" v-model="value.detailMobileHtml"></tiny-mac>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写附加信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import MultiUpload from "../../../../components/Upload/multiUpload";
import TinyMac from "../../../../components/imcoder-tinymce"

export default {
  name: "SportAttrDetail",
  components:{MultiUpload,TinyMac},
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      //商品富文本详情激活类型
      activeHtmlName: 'pc'
    }
  },
  computed:{
    selectSportPics:{
      get:function () {
        let pics=[];
        if(this.value.pic===undefined||this.value.pic==null||this.value.pic===''){
          return pics;
        }
        pics.push(this.value.pic);
        if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
          return pics;
        }
        let albumPics = this.value.albumPics.split(',');
        for(let i=0;i<albumPics.length;i++){
          pics.push(albumPics[i]);
        }
        return pics;
      },
      set:function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.value.pic = null;
          this.value.albumPics = null;
        } else {
          this.value.pic = newValue[0];
          this.value.albumPics = '';
          if (newValue.length > 1) {
            for (let i = 1; i < newValue.length; i++) {
              this.value.albumPics += newValue[i];
              if (i !== newValue.length - 1) {
                this.value.albumPics += ',';
              }
            }
          }
        }
      }
    }
  },
  methods:{
    handlePrev(){
      this.$emit('prevStep')
    },
    handleFinishCommit(){
      this.$emit('finishCommit',this.isEdit);
    }
  }
}
</script>

<style scoped>

</style>
