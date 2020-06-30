<template>
    <div class="main-container">
        <!-- //左边菜单 -->
        <ul class="left-bar">
            <li v-for="item in menuList" :key="item.id">
                <div class="menu" :class="icons[item.id]" @click="dropDown">{{ item.authName }}</div>
                <ul>
                    <router-link tag="li" :to="children.path" class="menu-item el-icon-link" v-for="children in item.children" :key="children.id">
                        {{ children.authName }}
                    </router-link>
                </ul>
            </li>
        </ul>
        <!-- //右边内容 -->
        <div class="right-bar"><router-view></router-view></div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    props: {
        menuList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            icons: {
                125: 'el-icon-user',
                103: 'el-icon-setting',
                101: 'el-icon-goods',
                102: 'el-icon-truck',
                145: 'el-icon-coin'
            }
        };
    },
    methods: {
        dropDown() {
            event.target.classList.toggle('active');
            event.target.nextSibling.classList.toggle('show');
        }
    }
};
</script>

<style scoped lang="less">
.main-container {
    display: flex;
    .left-bar {
        width: 245px;
        height: calc(100% - 80px);
        background-color: #bababa;
        position: fixed;
        top: 80px;
        left: 0;
        li {
            .menu {
                position: relative;
                display: flex;
                height: 40px;
                justify-content: center;
                align-items: center;
                background-color: #515453;
                color: white;
                cursor: pointer;
                &::before {
                    margin-right: 15px;
                }
                &:hover {
                    background-color: #707070;
                }
                &::after {
                    position: absolute;
                    content: '';
                    height: 5px;
                    width: 5px;
                    border: 2px solid white;
                    border-right: none;
                    border-bottom: none;
                    transform: rotateZ(45deg);
                    right: 30px;
                }
            }
            ul {
                display: none;
                .menu-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 30px;
                    background-color: #eeefee;
                    color: #666666;
                    cursor: pointer;
                    &::before {
                        margin-right: 15px;
                    }
                    &:hover {
                        background-color: #0055ff;
                        color: #eeefee;
                    }
                }
            }
        }
    }
    .right-bar {
        width: 100%;
        margin-left:245px;
        margin-top: 80px;
    }
}
.active::after {
    transform: rotateZ(225deg) !important;
}
.show {
    display: block !important;
}
</style>
