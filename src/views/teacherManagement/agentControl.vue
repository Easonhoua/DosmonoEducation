<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding: 20px;background:#fff;">
			<el-form :inline="true" :model="filters">
				
				<el-form-item label="代理名称">
					<el-select v-model="agency" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>

        <el-form-item label="联系人">
					<el-input v-model="filters.name" placeholder="联系人"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
        
				<el-form-item>
					<el-button type="primary" @click="handleAdd">添加</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column prop="ID" label="ID" width="180">
			</el-table-column>
			<el-table-column prop="agency" label="代理姓名" width="200">
			</el-table-column>
			<el-table-column prop="linkman" label="联系人" width="200">
			</el-table-column>
			<el-table-column prop="tel" label="联系手机" width="200">
			</el-table-column>
			<el-table-column prop="QQ" label="联系qq" width="200">
			</el-table-column>
			<el-table-column prop="teacherNum" label="老师数" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="代理名称" prop="agency">
					<el-input v-model="editForm.agency" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="linkman">
					<el-input v-model="editForm.linkman" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="联系手机" prop="tel">
					<el-input v-model="editForm.tel" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="联系微信/QQ" prop="wechat">
					<el-input v-model="editForm.wechat" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="代理名称" prop="agency">
					<el-input v-model="editForm.agency" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="linkman">
					<el-input v-model="editForm.linkman" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="联系手机" prop="tel">
					<el-input v-model="editForm.tel" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="联系微信/QQ" prop="wechat">
					<el-input v-model="editForm.wechat" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
import util from "../../common/js/util";
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      value6: "",
	    student: "",
	    region: "",
	    agency:"",
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        agency: "",
        linkman: "",
        tel: "",
        wechat: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        agency: "",
        linkman: "",
        tel: "",
        wechat: ""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        sex: "",
        age: "",
        birth: "",
        addr: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
	},
	handleExport:function(){

	},
    // selsChange: function(sels) {
    //   this.sels = sels;
    // },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>

</style>