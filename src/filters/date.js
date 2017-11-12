/********************全局时间过滤器*********************/
//1.导入vue组件
import  Vue from 'vue'
//2.导入moment组件
import moment from 'moment'
//3.创建全局过滤器
Vue.filter('date',(input,fmt="YYYY-MM-DD HH:mm:ss")=>moment(input).format(fmt));
