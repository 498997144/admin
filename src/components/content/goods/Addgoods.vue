<template>
	<div class="add-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>商品管理</li>>
            <li>添加商品</li>
        </Navbar>
        <!-- 提示信息 -->
        <el-alert title="添加商品信息" type="info"  :closable="false" show-icon class="tip"></el-alert>
        <!-- 步骤条 -->
        <el-steps class="step" :space="200" :active="parseInt(stepActive)" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <!-- tab栏 -->
       <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" label-position="top">
           <el-tabs tab-position="left" class="tab" v-model="stepActive" @tab-click="tabClick">
               <el-tab-pane label="基本信息" name="0">
                   <el-form-item label="商品名称" prop="goods_name">
                       <el-input v-model="addForm.goods_name"></el-input>
                   </el-form-item>
                   <el-form-item label="商品价格" prop="goods_price">
                       <el-input v-model.number="addForm.goods_price" type="number"></el-input>
                   </el-form-item>
                   <el-form-item label="商品重量" prop="goods_weight">
                       <el-input v-model.number="addForm.goods_weight" type="number"></el-input>
                   </el-form-item> 
                   <el-form-item label="商品数量" prop="goods_number">
                       <el-input v-model.number="addForm.goods_number" type="number"></el-input>
                   </el-form-item>
                   <el-form-item label="商品分类" prop="goods_cat">
                       <el-cascader :options="cateList" style="width: 20%;margin-left:20px ;" clearable
                :props="cascaderProps" v-model="addForm.goods_cat" @change="cascaderChange"></el-cascader>
                   </el-form-item>
               </el-tab-pane>
               <el-tab-pane label="商品参数" name="1">
                   <el-form-item v-for="item in goodsParams" :key="item.attr_id" :label="item.attr_name">
                       <el-checkbox-group v-model="item.attr_vals">
                           <el-checkbox :label="item" v-for="(item,index) in item.attr_vals" :key="index"></el-checkbox>
                         </el-checkbox-group>
                   </el-form-item>
               </el-tab-pane>
               <el-tab-pane label="商品属性" name="2">
                   <el-form-item v-for="item in goodsAttr" :key="item.attr_id" :label="item.attr_name">
                       <el-input v-model="item.attr_vals"></el-input>
                   </el-form-item>
               </el-tab-pane>
               <el-tab-pane label="商品图片" name="3">
                   <el-upload
                     action='http://127.0.0.1:8888/api/private/v1/upload'
                     :file-list="fileList"  list-type="picture"
                     :headers="header"
                     :on-success="uploadSuccess"
                     :on-remove="removeHandle"	
                     >
                     <el-button size="small" type="primary">点击上传</el-button>
                   </el-upload>
               </el-tab-pane>
               <el-tab-pane label="商品内容" name="4">
                    <quill-editor  ref="myQuillEditor" v-model="addForm.goods_introduce"/>
                    <el-button type="primary" style="margin:10px 440px;" @click="addGoods">添加商品</el-button>
               </el-tab-pane>
             </el-tabs>
       </el-form>
	</div>
</template>

<script>
    import Navbar from '../../common/nav/Navbar.vue';
	export default {
		name:'Addgoods',
		components:{
            Navbar,
        },
        data(){
            return {
                cateList:[],
                goodsParams:[],
                goodsAttr:[],
                stepActive:'0',
                addForm:{
                    goods_name:'',
                    goods_price:0,
                    goods_weight:0,
                    goods_number:0,
                    goods_cat:[],
                    pics:[],
                    goods_introduce:'',
                    attrs:[],
                },
                rules:{
                    goods_name:[{required:true,message:'请输入商品名称',trigger:'blur'}],
                    goods_price:[{required:true,message:'请输入商品价格',trigger:'blur'}],
                    goods_weight:[{required:true,message:'请输入商品重量',trigger:'blur'}],
                    goods_number:[{required:true,message:'请输入商品数量',trigger:'blur'}],
                    goods_cat:[{required:true,message:'请输入商品分类',trigger:'blur'}],
                },
                cascaderProps:{
                    value:'cat_id',
                    label:'cat_name',
                    children:'children',
                    expandTrigger: 'hover',
                    // checkStrictly:true,
                },
                fileList:[],
                header:{Authorization: sessionStorage.getItem('token')},
                
            }
        },
        methods:{
        async getCateList(){
                const response = await this.axios.get('categories');
                if(response.meta.status == 200){
                    this.cateList = response.data;
                }
            },
            cascaderChange(){
                if(this.addForm.goods_cat.length !== 3){
                    this.addForm.goods_cat = [];
                }
            },
           async tabClick(){
                if(this.stepActive === '1'){
                    const response = await this.axios.get(`categories/${this.cateId}/attributes`,{params:{sel:'many'}});
                    if(response.meta.status == 200){
                        response.data.forEach((item)=>{
                            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : [];
                        })
                        this.goodsParams = response.data;
                    }
                }
               else if(this.stepActive === '2'){
                    const response = await this.axios.get(`categories/${this.cateId}/attributes`,{params:{sel:'only'}});
                    if(response.meta.status == 200){
                        this.goodsAttr = response.data;
                    }
                }
            },
            uploadChange(){},
            uploadSuccess(response){
                this.addForm.pics.push({pic:response.data.tmp_path});
            },
            removeHandle(file){
                const filePath= file.response.data.tmp_path;
                const index = this.addForm.pics.findIndex(item => item.pic == filePath);
                this.addForm.pics.splice(index,1);
            },
            addGoods(){
                console.log(this.addForm)
                this.$refs.addForm.validate(async(validate)=>{
                    if(validate){
                      if(this.addForm.goods_cat instanceof Array){
                           this.addForm.goods_cat = this.addForm.goods_cat.join(',')
                      }
                      this.goodsParams.forEach(item =>{
                          this.addForm.attrs.push({attr_id:item.attr_id,attr_value:item.attr_vals.join(' ')});
                      })
                      this.goodsAttr.forEach(item =>{
                          this.addForm.attrs.push({attr_id:item.attr_id,attr_value:item.attr_vals});
                      })
                      const response = await this.axios.post('goods',this.addForm);
                      if(response.meta.status == 201){
                          this.$message.success(response.meta.msg);
                          this.$router.go(-1);
                      }else{
                          this.$message.error(response.meta.msg);
                      }
                    }else{
                        this.$message.warning('请完善表单项');
                    }
                });
            },
        },
        computed:{
            cateId(){
                if(this.addForm.goods_cat.length == 3){
                    return this.addForm.goods_cat[2];
                }
                return null;
            },
        },
		created() {
            this.getCateList();
		}
	}
</script>

<style scoped lang="less">
.add-container{
    .tip{
        justify-content: center;
        margin: 60px auto 10px;
        width: 98%;
    }
    .step{
        margin: 5px auto;
    }
    .tab{
        margin: 10px 10px;
        background-color: white
    }
}
/deep/ .ql-container{
    min-height: 300px;
}
</style>
