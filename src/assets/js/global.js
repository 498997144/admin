import Vue from 'vue';

//全局过滤器
import moment from 'moment';
Vue.filter('dateFormat',(data,format='YYYY-MM-DD HH:mm:ss')=>{
    return moment(data).format(format)
});

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)
//引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入树型表单插件
import Treetable from 'vue-table-with-tree-grid'
Vue.component('Treetable',Treetable)





