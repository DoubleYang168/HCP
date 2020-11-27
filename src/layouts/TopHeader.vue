<template>
  <div>
    <div class="banner">
      <div class="banner-div">
        <a-row type="flex" align="middle">
          <a-col :span="8">
            <span id="welcome">欢迎您来到水文云！</span>
            <span id="time"
              >{{ date.yyyy + "年" + date.mm + "月" + date.dd + "日" }} 星期{{
                date.week
              }}</span
            >
          </a-col>
          <a-col>
            <a-form layout="inline" :form="form" @submit="handleSubmit">
              <a-form-item>
                <a-input placeholder="Username" class="input" v-model="formInline.user">
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input placeholder="Password" class="input" v-model="formInline.password" type="password">
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  :disabled="
                    formInline.user === '' || formInline.password === ''
                  "
                >
                  Log in
                </a-button>
              </a-form-item>
            </a-form>
          </a-col>
          <a-col>
            <span>
              <a target="_blank" href="#">EN</a>
            </span>
            <span>|</span>
            <span>
              <a target="_blank" href="#">繁</a>
            </span>
            <span>|</span>
            <span>
              <a href="#" target="_self">无障碍阅读</a>
            </span>
            <span></span>
            <span></span>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="top-header"></div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      // hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      formInline: {
        user: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(this.formInline);
    },

    //dingy:获取系统当前时间，格式化展示
    getClientTime() {
      const date = new Date();
      const weeks = ["天", "一", "二", "三", "四", "五", "六"];
      const that = this;
      this.date = {
        yyyy: date.getFullYear(),
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        MM: date.getMinutes(),
        ss: date.getSeconds(),
        week: weeks[date.getDay()],
      };
      console.log(this.date);

      if (this.date.mm < 10) {
        this.date.mm = "0" + this.date.mm;
      }
      if (this.date.dd < 10) {
        this.date.dd = "0" + this.date.dd;
      }
      if (this.date.hh < 10) {
        this.date.hh = "0" + this.date.hh;
      }
      if (this.date.MM < 10) {
        this.date.MM = "0" + this.date.MM;
      }
      if (this.date.ss < 10) {
        this.date.ss = "0" + this.date.ss;
      }
    },
  },
  created() {
    this.getClientTime();
  },
};
</script>

<style scoped>
.top-header {
  height: 185px;
  background-image: url("../assets/title.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.banner {
  height: 40px;
  background-color: rgb(1, 74, 133);
  text-align: center;
}

.banner-div {
  margin: 0 auto;
  width: 80%;
  min-width: 1230px;
}
span {
  color: aliceblue;
}
</style>
