<template>
  <div class="manage">
    <div class="manage-flex">
      <el-button @click="handleAdd" type="primary" icon="Plus">新增</el-button>
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog v-model="dialogVisible" title="新增用户" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            :size="size"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <!-- <span>新增用户</span> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-table height="80%" :data="tableData" style="width: 100%;" stripe>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.sex == 1 ?'男':'女' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="birth" label="出生日期" />
      <el-table-column prop="addr" label="地址" />
      <el-table-column>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handelDelete(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage" />
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import { getUser, addUser, editUser, delUser } from "../api";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        address: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名"
          }
        ],
        age: [
          {
            required: true,
            message: "请输入年龄"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别"
          }
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期"
          }
        ],
        address: [
          {
            required: true,
            message: "请填写地址"
          }
        ]
      },
      tableData: [],
      modalType: 0,
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ""
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
      this.$refs.form.resetFields();
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
      this.$refs.form.resetFields();
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 后续对表单的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表接口
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          console.log(this.form);
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handelDelete(row) {
      ElMessageBox.confirm(
        "proxy will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          delUser({ id: row.id }).then(() => {
            ElMessage({
              type: "success",
              message: "Delete completed"
            });
          });
          this.getList();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    getList() {
      // 获取列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    handlePage(val) {
      this.pageData.page = val;
      console.log(val);
      this.getList();
    },
    onSubmit() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
// const dialogVisible = ref(false);

// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm("Are you sure to close this dialog?")
//     .then(() => {
//       done();
//     })
//     .catch(() => {
//       // catch error
//     });
// };
</script>

<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.manage {
  height: 90%;
  position: relative;
  .manage-flex {
    display: flex;
  }
  .pager {
    position: absolute;
    right: 20px;
  }
}
</style>