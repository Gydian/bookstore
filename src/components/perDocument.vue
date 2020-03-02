<template>
    <div>
      <p>我的头像：</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

        <span>昵称：123</span>
        <!-- <el-input v-model="USRNAME" placeholder="昵称" class="userName"></el-input> -->
        <el-button type="text" @click="change">修改昵称</el-button>
        <p>账号：12345678911</p>
    </div>

</template>

<script>
export default {
    data() {
        return{
            imageUrl: ''
        };
    },
    methods:{
      // 修改昵称的弹出框
        change(){
            this.$prompt('请输入新昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   inputErrorMessage: '昵称格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的新昵称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
        },

      // 上传头像
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
        
    }
}
</script>

<style>
.userName {
    margin-top: 3%;
    display: inline-block;
    width: 20%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
