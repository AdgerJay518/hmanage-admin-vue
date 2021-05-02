import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
    state: {
        menu:[],
        aut:[],
        hasRoute:false,
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index'
        }]
    },
    mutations: {
        setMenu(state,menu){
            state.menu=menu
        },
        setAut(state,aut){
            state.aut=aut
        },
        changeRouteState(state,hasRoute){
            state.hasRoute=hasRoute
        },
        addTab(state,tab) {
            let index=state.editableTabs.findIndex(e=>e.name===tab.name)
            if(index===-1){
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }
            state.editableTabsValue = tab.name;
        },
        resetState:(state)=>{
            state.menu=[]
            state.aut=[]
            state.hasRoute=false
            state.editableTabsValue='/Index'
            state.editableTabs=[{
                title: '首页',
                name: 'Index'
            }]
        }
    },
    actions: {
    },
    modules: {
    }
})
