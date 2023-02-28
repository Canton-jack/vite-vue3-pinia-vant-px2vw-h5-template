<template>
  <div class="test-view">
    <div @click="setName(1, '李')"><span>姓氏：</span>{{ firstName }}</div>
    <div @click="setName(2, '萧')"><span>名字：</span>{{ lastName }}</div>
    <div>
      修改姓氏
      <input type="test" v-model="firstName" />
    </div>
    <div>
      修改姓名
      <input type="test" v-model="lastName" />
    </div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script lang="ts" setup name="TestView">
import { ref, computed, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'

type Name = string | number

type TestType = {
  value: Name
}
let test: TestType = ref(0)
//响应式数据部分

interface Person {
  lastName: string
  firstName: string
}
let person: Person = reactive({
  lastName: '小鹅',
  firstName: '张'
})
function setName(type: number, name: string) {
  if (type === 1) {
    person.firstName = name
  } else {
    person.lastName = name
  }
}
let {lastName, firstName} = {...toRefs(person)}
// 组件完成初始渲染并创建 DOM 节点后
onMounted(() => {})
// 组件实例卸载前调用
onBeforeUnmount(() => {})
</script>
<style scoped lang="less">
.test-view {
  cursor: pointer;
  > div {
    > span {
      font-size: 24px;
      font-weight: 700;
      color: @primary;
    }
  }
}
</style>
