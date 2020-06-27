<template>
    <div class="params-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>商品管理</li>>
            <li>分类参数</li>
        </Navbar>
        <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" style="margin: 60px auto 10px;width: 98%;"
        :closable="false" show-icon>
        </el-alert>
        <el-row style="width: 98%;margin: 0 auto; background-color: white;">
            <el-col>
                <span style="margin-left: 20px;">选择商品分类:</span>
                <el-cascader :options="cateList"  style="width: 20%;margin-left:20px ;" clearable
                :props="cascaderProps" v-model="selectedKeys" @change="cascaderChange">
                </el-cascader>
            </el-col>
        </el-row>
        <el-tabs style="width: 98%;margin: 0 auto;padding: 0 20px; background-color: white;" v-model="activeName" @tab-click="clickHandle">
            <el-tab-pane label="动态参数" name="many">
                <el-button @click="addParamsShow = !addParamsShow" type="primary" size="mini" :disabled="isDisable" style="margin: 0 20px;">添加参数</el-button>
                <el-table :data="manyParamsData" border stripe style="margin: 10px 0;">
                    <el-table-column type="expand">
                        <template slot-scope="data">
                            <el-tag v-for="(item,index) in data.row.attr_vals" :key="index" style="margin-left: 10px;" closable
                            @close="close('delTag',data.row,index)">
                            {{item}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="data.row.inputVisible" v-model="data.row.inputValue" size="small"
                             ref="inputTag" @keyup.native.enter="inputChange(data.row)" @blur="inputChange(data.row)" style="width: 80px;margin-left: 10px;">
                            </el-input>
                            <el-button  style="margin-left: 10px;" v-else class="button-new-tag" size="small" @click="showInput(data.row)">新增标签</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="data">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdit(data.row.attr_id)">编辑</el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(data.row.attr_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                 <el-button @click="addParamsShow = !addParamsShow"  type="primary" size="mini" :disabled="isDisable" style="margin: 0 20px;">添加属性</el-button>
                 <el-table :data="onlyParamsData" border stripe style="margin: 10px 0;">
                     <el-table-column type="expand">
                         <template slot-scope="data">
                             <el-tag v-for="(item,index) in data.row.attr_vals" :key="index" style="margin-left: 10px;" closable
                             @close="close('delTag',data.row,index)">
                             {{item}}
                             </el-tag>
                             <el-input class="input-new-tag" v-if="data.row.inputVisible" v-model="data.row.inputValue" size="small"
                              ref="inputTag" @keyup.native.enter="inputChange(data.row)" @blur="inputChange(data.row)" style="width: 80px;margin-left: 10px;">
                             </el-input>
                             <el-button  style="margin-left: 10px;" v-else class="button-new-tag" size="small" @click="showInput(data.row)">新增标签</el-button>
                         </template>
                     </el-table-column>
                     <el-table-column type="index" label="#"></el-table-column>
                     <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                     <el-table-column label="操作">
                         <template slot-scope="data">
                             <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdit(data.row.attr_id)">编辑</el-button>
                             <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(data.row.attr_id)">删除</el-button>
                         </template>
                     </el-table-column>
                 </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 添加 -->
        <el-dialog :visible.sync="addParamsShow" width="50%" :title="title" @close="close('add')">
            <el-form :model="addParamsForm" :rules="formRule" ref="addForm" label-width="120px">
                <el-form-item :label="title" prop="attr_name">
                    <el-input v-model="addParamsForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addParamsShow = !addParamsShow">取消</el-button>
                <el-button type="primary" @click="commitaddForm">确定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog :visible.sync="editShow" width="50%" :title="title" @close="close('edit')">
            <el-form :model="editParamsForm" :rules="editformRule" ref="editForm" label-width="120px">
                <el-form-item :label="title" prop="attr_name">
                    <el-input v-model="editParamsForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editShow = !editShow">取消</el-button>
                <el-button type="primary" @click="commiteditForm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Navbar from '../../../../components/common/nav/Navbar.vue';
    export default {
        name:'Params',
        components: {
			Navbar,
        },
        data() {
            return {
                cateList: [],
                manyParamsData:[],
                onlyParamsData:[],
                cascaderProps:{
                    value:'cat_id',
                    label:'cat_name',
                    children:'children',
                    expandTrigger: 'hover',
                    // checkStrictly:true,
                },
                selectedKeys:[],
                activeName:'many',
                addParamsShow:false,
                editShow:false,
                addParamsForm:{
                    attr_name:'',
                },
                formRule:{
                    attr_name:[{required:true,message:'请输入参数名称',trigger:'blur'}],
                },
                editParamsForm:{
                    attr_name:'123',
                },
                editformRule:{
                    attr_name:[{required:true,message:'请输入参数名称',trigger:'blur'}],
                },
            }
        },
        computed:{
            isDisable(){
                return !(this.selectedKeys.length == 3);
            },
            cateId(){
                if(this.selectedKeys.length !== 3){
                    return null;
                }else{
                    return this.selectedKeys[2];
                }
            },
            title(){
                if(this.activeName == 'many'){
                    return '动态参数'
                }else{
                    return '静态属性'
                }
            },
        },
        methods:{
            async getcateList(){
                 const response = await this.axios.get('categories');
                 if(response.meta.status == 200){
                     this.cateList = response.data;
                 }
             },
             async getParams(){
                 if(this.selectedKeys.length !== 3){
                     this.manyParamsData = [];
                     this.onlyParamsData = [];
                     this.selectedKeys = [];
                 }else{
                    const response = await this.axios.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}});
                    response.data.forEach((item)=>{
                        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : [];
                        item.inputVisible = false;
                        item.inputValue = '';
                    });
                    if(response.meta.status == 200){
                        if(this.activeName == 'many'){
                            this.manyParamsData = response.data;
                        }else{
                            this.onlyParamsData = response.data;
                        }
                    }
                 }
             },
            cascaderChange(){
                this.getParams();
             },
             clickHandle(){
                this.getParams();
             },
             commitaddForm(){
                 this.$refs.addForm.validate(async (vallidate) =>{
                     if(vallidate){
                        const response = await this.axios.post(`categories/${this.cateId}/attributes`,{attr_name:this.addParamsForm.attr_name,attr_sel:this.activeName});
                        if(response.meta.status == 201){
                            this.$message.success(response.meta.msg);
                            this.addParamsShow = !this.addParamsShow;
                            this.getParams();
                        }else{
                            this.$message.error(response.meta.msg);
                        }   
                     }
                 });
             },
            async showEdit(attr_id){
                 const response = await this.axios.get(`categories/${this.cateId}/attributes/${attr_id}`,{params:{attr_sel:this.activeName}});
                 if(response.meta.status == 200){
                     this.editParamsForm = response.data;
                     this.editShow = !this.editShow;
                 }
             },
             commiteditForm(){
                this.$refs.editForm.validate(async (vallidate) =>{
                    if(vallidate){
                       const response = await this.axios.put(`categories/${this.cateId}/attributes/${this.editParamsForm.attr_id}`,{attr_name:this.editParamsForm.attr_name,attr_sel:this.activeName});
                       if(response.meta.status == 200){
                           this.$message.success(response.meta.msg);
                           this.editShow = !this.editShow;
                           this.getParams();
                       }else{
                           this.$message.error(response.meta.msg);
                       }   
                    }
                });
             },
             removeParams(attr_id){
                 this.$toast(`确定要删除这条参数吗?`,async ()=>{
                     const response = await this.axios.delete(`categories/${this.cateId}/attributes/${attr_id}`);
                     if(response.meta.status == 200){
                         this.$message({message:response.meta.msg,type:'success'});
                         this.getParams();
                     }else{
                         this.$message({message:response.meta.msg,type:'error'});
                     }
                 });
             },
            inputChange(row){
                if(row.inputValue.trim().length == 0){
                    row.inputVisible = false;
                }else{
                    row.attr_vals.push(row.inputValue.trim());
                    row.inputValue = '';
                    row.inputVisible = false;
                    this.saveAttr_values(row);
                }
             },
             showInput(row){
                row.inputVisible = !row.inputVisible;
                this.$nextTick(()=>{
                    this.$refs.inputTag.$el.children[0].focus()
                })
             },
            async saveAttr_values(row){
                const response = await this.axios.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{attr_name:row.attr_name,attr_sel:row.attr_sel,attr_vals:row.attr_vals.join(' ')});
                if(response.meta.status == 200){
                    this.$message.success(response.meta.msg);
                }else{ this.$message.error(response.meta.msg)}
            },
             close(type,row,index){
                switch(type){
                    case 'add':
                     this.$refs.addForm.resetFields();
                     break
                    case 'edit':
                    this.$refs.editForm.resetFields();
                     break
                     case 'delTag':
                     row.attr_vals.splice(index,1);
                     this.saveAttr_values(row);
                }
             },
        },
        created() {
             this.getcateList();
        },
               
    }
</script>

<style lang="less" scoped>

</style>
