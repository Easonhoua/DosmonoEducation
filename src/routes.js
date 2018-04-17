import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import ForeignerTeachers from './views/teacherManagement/foreignerTeachers.vue'
import ChineseTeachers from './views/teacherManagement/chineseTeachers.vue'
import AgentControl from './views/teacherManagement/agentControl.vue'
import EvaluationManagement from './views/teacherManagement/evaluationManagement.vue'
import ClassManagement from './views/teacherManagement/classManagement.vue'
import EnglishCourses from './views/courseManagement/englishCourses.vue'
import ChineseCourses from './views/courseManagement/chineseCourses.vue'
import StudentManagement from './views/userManagement/studentManagement.vue'
import ParentManagement from './views/userManagement/parentManagement.vue'
import LearningQuery from './views/channelManagement/learningQuery.vue'
import CourseQuery from './views/channelManagement/courseQuery.vue'
import StatisticalFunctions from './views/statisticalManagement/statisticalFunctions.vue'
import IPayment from './views/fundsManagement/iPayment.vue'
import AccountManagement from './views/accountManagement/accountManagement.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '老师管理',
        iconCls: 'fa fa-tumblr-square',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/foreignerTeachers', component: ForeignerTeachers, name: '外教管理' },
            { path: '/chineseTeachers', component: ChineseTeachers, name: '中教管理' },
            { path: '/agentControl', component: AgentControl, name: '代理管理' },
            { path: '/evaluationManagement', component: EvaluationManagement, name: '评价管理' },
            { path: '/classManagement', component: ClassManagement, name: '上课管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-book',
        children: [
            { path: '/englishCourses', component: EnglishCourses, name: '英文课程' },
            { path: '/chineseCourses', component: ChineseCourses, name: '中文课程' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-users',
        children: [
            { path: '/studentManagement', component: StudentManagement, name: '学生管理' },
            { path: '/parentManagement', component: ParentManagement, name: '家长管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '频道管理',
        iconCls: 'fa fa-gg-circle',
        children: [
            { path: '/learningQuery', component: LearningQuery, name: '随学查询' },
            { path: '/courseQuery', component: CourseQuery, name: '课程查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/statisticalFunctions', component: StatisticalFunctions, name: '功能统计' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资金管理',
        iconCls: 'fa fa-cc-paypal',
        children: [
            { path: '/iPayment', component: IPayment, name: '支付管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/accountManagement', component: AccountManagement, name: '账户管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;