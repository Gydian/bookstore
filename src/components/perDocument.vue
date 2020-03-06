<template>
    <div>
      <div class="pic">
        <span>我的头像：</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="uname">
          <span>昵称：</span> 
          {{uName}}
        <el-button type="text" @click="changeName">修改昵称</el-button>
      </div>
      
      <div class="uid">
        <span>账号：</span> 
      </div>
      <div class="uid_pos">
        {{uID}}
      </div>
    </div>

</template>

<script>
export default {
    data() {
        return{
            //从数据库获取
            imageUrl: '', // 头像
            uName: '',    // 昵称
            uID: 'lyj'       // 用户名
        };
    },
    methods:{
      // 修改昵称的弹出框
      changeName(){
          this.$prompt('请输入新昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.uName = value;
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
        
    },
    mounted:function(){
      var that = this;
        //获取昵称
        this.axios.get('/users/user/lyj')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.uName = res.data[0].name;
                console.log(that.uName);
            })
            .catch(function (error) {
                console.log(error);
            });
        // // 提交修改昵称
        // this.axios.post('users/user/changename/lyj',{name:{{this.uName}}})
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        
    }
}
</script>

<style>
.pic {
  position: absolute;
  left: 680px;
  top: 10%;
}
.uname {
  position: absolute;
  left: 710px;
  top: 42%;
}

.uid {
  position: absolute;
  left: 710px;
  top: 53%;
}
.uid_pos{
  position: absolute;
  left: 760px;
  top: 53%;
}
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
