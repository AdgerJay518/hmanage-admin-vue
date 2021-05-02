<template>
  <el-tabs v-model="editableTabsValue"
           type="card"
           closable
           @tab-remove="removeTab"
           @tab-click="tabClick"
  >
    <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
      {{item.content}}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {

    }
  },
  computed:{
    editableTabs:{
      get(){
        return this.$store.state.menu.editableTabs
      },
      set(val){
        this.$store.state.menu.editableTabs=val
      }
    },
    editableTabsValue:{
      get(){
        console.log(this.$store.state.menu.editableTabsValue)
        return this.$store.state.menu.editableTabsValue
      },
      set(val){
        this.$store.state.menu.editableTabsValue=val
      }
    }
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: ''
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if(targetName==="Index"){
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({name:activeName})
    },
    tabClick(target){
      this.$router.push({name:target.name})
    }
  }

}
</script>

<style scoped>

</style>
