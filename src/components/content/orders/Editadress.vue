<template>
    <el-dialog title="修改地址" :visible="show" @close="close">
        <el-form :model="editForm" :rules="rules" label-position="right" ref="editForm">
            <el-form-item label="省市区/县" prop="adress1">
                <el-cascader class="casecader" :options="cityData" v-model="editForm.adress1" :props="cascaderProps"></el-cascader>
            </el-form-item>
            <el-form-item label="祥细地址" prop="adress2"><el-input v-model="editForm.adress2"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="close">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import cityData from '../../../assets/js/citydata.js';
export default {
    name: 'Editadress',
    props: ['show'],
    data() {
        return {
            cityData: cityData,
            editForm: {
                adress1: [],
                adress2: ''
            },
            rules: {
                adress1: [{ required: true, message: '请选择地址', trigger: 'blur' }],
                adress2: [{ required: true, message: '请输入祥细地址', trigger: 'blur' }]
            },
            cascaderProps: {
                value: 'value',
                label: 'label',
                children: 'children',
                expandTrigger: 'hover'
            }
        };
    },
    methods: {
        close() {
            this.$refs.editForm.resetFields();
            this.$emit('close');
        }
    }
};
</script>

<style scoped lang="less">
.casecader {
    width: 100%;
}
</style>
