<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding: 20px;background:#fff;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="老师名字/email/ID">
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="block">
    					<span class="demonstration">上线时间</span>
    						<el-date-picker
      							v-model="value6"
      							type="datetimerange"
      							start-placeholder="开始日期"
      							end-placeholder="结束日期"
      							:default-time="['12:00:00']">
    						</el-date-picker> 
  					</div>
  				</el-form-item>

				<el-form-item label="适合学员">
					<el-select v-model="student" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="所属代理">
					<el-select v-model="agency" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="handleExport">导出</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="ID" width="300" >
			</el-table-column>
			<el-table-column prop="name" label="名称" width="180">
			</el-table-column>
			<el-table-column prop="email" label="email/skype/QQ" min-width="180">
			</el-table-column>
			<el-table-column prop="salary" label="工资" width="120" >
			</el-table-column>
			<el-table-column prop="addr" label="所属代理" width="180">
			</el-table-column>
			<el-table-column prop="value6" label="上线日期" width="180">
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="soldOut(scope.$index, scope.row)">下架</el-button>
					<el-button type="danger" size="small" @click="resetPasswords(scope.$index, scope.row)">重置密码</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="10" :total="total" style="float:right;"> 
			</el-pagination>
		</el-col> 

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" ></el-input>
				</el-form-item>

				<el-form-item label="ID" prop="id">
					<el-input v-model="editForm.id" ></el-input>
				</el-form-item>

				<el-form-item label="email/QQ" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
        
				<el-form-item label="工资" prop="salary">
					<el-input v-model="editForm.salary" ></el-input>
				</el-form-item>

				<el-form-item label="所属代理" prop="addr">
					<el-select v-model="editForm.addr" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="上线时间" prop="value6">
					<div class="block">
    						<el-date-picker
      							v-model="editForm.value6"
      							type="datetimerange"
      							start-placeholder="开始日期"
      							end-placeholder="结束日期"
      							:default-time="['12:00:00']">
    						</el-date-picker> 
  					</div>
  				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

    <!-- 新增界面 -->
  	<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" ></el-input>
				</el-form-item>

				<el-form-item label="ID" prop="ID">
					<el-input v-model="addForm.id" ></el-input>
				</el-form-item>

				<el-form-item label="email/QQ" prop="email/QQ">
					<el-input v-model="addForm.email" ></el-input>
				</el-form-item>
				<el-form-item label="工资" prop="salary">
					<el-input v-model="addForm.salary" ></el-input>
				</el-form-item>

				<el-form-item label="所属代理" prop="addr">
					<el-select v-model="addForm.addr" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="上线时间" prop="value6">
					<div class="block">
    						<el-date-picker
      							v-model="addForm.value6"
      							type="datetimerange"
                    editable = 'false'
      							start-placeholder="开始日期"
      							end-placeholder="结束日期"
      							:default-time="['12:00:00']">
    						</el-date-picker>
  					</div>
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
import { getUserListPage, removeUser, editUser, addUser } from "../../api/api";

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
      //sels: [], //列表选中列
      value6: "",
      addr: "",
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "",
        name: "",
        email: "",
        salary: "",
        addr: "",
        value6: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        id: "",
        name: "",
        email: "",
        salary: "",
        addr: "",
        value6: ""
      }
    };
  },

  methods: {
    //分页
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
    soldOut: function(index, row) {
      this.$confirm("确认下架该条记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "下架成功",
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
        id: "",
        name: "",
        email: "",
        salary: "",
        addr: "",
        value6: ""
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
    //导出
    handleExport: function() {

    },
    //重置密码
    resetPasswords: function() {
      var $this = this;
      $this.$router.push("/accountManagement");
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
.toolbar {
  background: #fff;
}
</style>