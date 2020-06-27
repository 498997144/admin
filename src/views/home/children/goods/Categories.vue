<template>
    <div class="cate-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>商品管理</li>>
            <li>商品分类</li>
        </Navbar>
        <!-- 添加分类 -->
        <div class="addCate-container">
            <button class="addCate" @click="addCate">添加分类</button>
        </div>
        <!-- 商品列表 -->
        <Treetable style="width: 99%;margin: 0 auto;" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index
        index-text="索引" border :show-row-hover="false">
            <template slot="isOk" slot-scope="data">
                <i class="el-icon-circle-check" v-if="data.row.cat_deleted == false" style="color: #55ff00;"></i>
                <i class="el-icon-circle-close" v-else style="color: red;"></i>
            </template>
            <template slot="order" slot-scope="data">
                <el-tag size="mini" type="info" v-if="data.row.cat_level == 0">一级</el-tag>
                <el-tag size="mini" type="success" v-else-if="data.row.cat_level == 1">二级</el-tag>
                <el-tag size="mini" type="warning" v-else>三级</el-tag>
            </template>
            <template slot="opt" >
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
        </Treetable>
        <!-- //分页器 -->
        <div class="pagination-container">
            <el-pagination
                @prev-click="getData"
                @current-change="getData"
                @next-click="getData"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="queryInfo.pagesize"
            ></el-pagination>
        </div>
        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="addCateShow" width="50%" @close="close">
            <el-form :model="addCateForm" :rules="addCateRules" ref="addCate" label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader :options="parentCatelist"  style="width: 100%;" change-on-select clearable
                    :props="cascaderProps" v-model="selectedKeys" @change="cascaderChange">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateShow = !addCateShow">取消</el-button>
                <el-button type="primary" @click="commitaddForm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Navbar from '../../../../components/common/nav/Navbar.vue';
    export default {
        name:'Categories',
        components: {
			Navbar,
        },
        data() {
            return {
                queryInfo:{
                    type:3,
                    pagenum:1,
                    pagesize:6,
                },
                cateList: [],
                total:0,
                columns:[
                    {
                        label:'分类名称',
                        prop:'cat_name',
                    },
                    {
                        label:'是否有效',
                        type:'template',
                        template:'isOk',
                    },
                    {
                        label:'等级排序',
                        type:'template',
                        template:'order',
                    }, 
                    {
                        label:'操作',
                        type:'template',
                        template:'opt',
                    },
                ],
                parentCatelist:[],
                cascaderProps:{
                    value:'cat_id',
                    label:'cat_name',
                    children:'children',
                    expandTrigger: 'hover',
                },
                selectedKeys:[],
                addCateShow:false,
                addCateForm:{
                    cat_name:'',
                    cat_pid:0,
                    cat_level:0,
                },
                addCateRules:{
                    cat_name:[
                        {required:true,message:'请输入分类的名称',trigger:'blur',},
                    ],
                },
            }
        },
        computed:{
            
        },
        methods:{
           async getcateList(){
                const response = await this.axios.get('categories',{params:this.queryInfo});
                console.log(response)
                if(response.meta.status == 200){
                    this.cateList = response.data.result;
                    this.total = response.data.total;
                }
            },
            getData(newPage){
                this.queryInfo.pagenum = newPage;
                this.getcateList();
            },
            async getParentCatelist(){
                const response = await this.axios.get('categories',{params:{type:2}});
                if(response.meta.status == 200){
                    this.parentCatelist = response.data;
                }
            },
            addCate(){
                this.getParentCatelist();
                this.addCateShow = !this.addCateShow
            },
            commitaddForm(){
                this.$refs.addCate.validate( async (valid) => {
                    if(valid){
                      const response = await this.axios.post('categories',this.addCateForm);
                      if(response.meta.status == 201){
                          this.$message({message:response.meta.msg,type:'success'});
                          this.getcateList();
                          this.addCateShow = !this.addCateShow
                      }else{
                          this.$message({message:response.meta.msg,type:'error'});
                      }
                    }
                })
            },
            cascaderChange(){
                if(this.selectedKeys.length >0){
                   this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1];
                   this.addCateForm.cat_level = this.selectedKeys.length;
                }else{
                    this.addCateForm.cat_pid = 0;
                    this.addCateForm.cat_level = 0;
                }
            },
            close(){
                this.$refs.addCate.resetFields();
                this.selectedKeys = [],
                this.addCateForm.cat_level = 0;
                this.addCateForm.cat_pid = 0;
            },
        },
        created() {
            this.getcateList();
        },
        
    }
</script>

<style lang="less" scoped>
.addCate-container {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: 50px;
    padding: 0 5px;
    .addCate {
        height: 40px;
        width: 100px;
        // margin-left: 30px;
        cursor: pointer;
    }
}
 /deep/ .zk-table__header-cell{
    text-align: center;
}
/deep/ .zk-table__body-cell{
    text-align: center;
}
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}
</style>
