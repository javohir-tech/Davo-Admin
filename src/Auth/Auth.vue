<template>
  <div class="auth">
    <div class="auth-box">
      <h3 class="auth-title">Admin Panel</h3>
      <a-form :model="formState" layout="vertical" :rules="rules" @finish="onFinish" ref="formRef">
        <a-form-item label="Login" name="login" has-feedback>
          <a-input v-model:value="formState.login" placeholder="Loginni kiriting" />
        </a-form-item>
        <a-form-item label="Parol" name="password" has-feedback>
          <a-input-password v-model:value="formState.password" placeholder="Parolni kiriting">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            <template #icon>
              <SwapRightOutlined />
            </template>
            Kirish
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
//VUE
import { reactive, ref, h } from 'vue'
//Antd VUE
import { LockOutlined, SwapRightOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const formState = reactive({
  login: '',
  password: '',
})
const formRef = ref()

const rules = {
  login: [
    {
      required: true,
      message: 'Iltimos maydonni toldiring',
      trigger: 'blur',
    },
    {
      min: 6,
      message: "kamida 6 ta belgidan iborat bo'lishi kerak",
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Iltimos maydonni toldiring',
      trigger: 'blur',
    },
    {
      min: 6,
      message: 'kamida 6 ta belgi',
      trigger: 'blur',
    },
  ],
}

const onFinish = () => {
  try {
    console.log(formState.login)
    console.log(formState.password)
    formRef.value.resetFields()
  } catch (error) {}
}
</script>

<style scoped>
.auth {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-box {
  padding: 10px 15px;
  border-radius: 10px;
  background-color: blue;
  width: 400px;
}

.auth-title {
  text-align: center;
}
</style>
