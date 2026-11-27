<template>
  <div>
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="搜索书名或作者" clearable
                style="width: 280px" @keyup.enter="search" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <el-table :data="rows" border style="margin-top: 16px">
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="stock" label="库存" width="80" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button size="small" type="primary" :disabled="row.stock <= 0"
                     @click="borrow(row)">借阅</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="margin-top: 16px"
                   layout="prev, pager, next, total"
                   :total="total" :page-size="size" :current-page="page"
                   @current-change="onPageChange" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const rows = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const keyword = ref('')
const userId = 1

async function load() {
  const { data } = await axios.get('/api/books', {
    params: { page: page.value, size: size.value, keyword: keyword.value }
  })
  if (data.code !== 0) { ElMessage.error(data.message); return }
  rows.value = data.data.records
  total.value = data.data.total
}

function search() { page.value = 1; load() }
function onPageChange(p) { page.value = p; load() }

async function borrow(row) {
  const { data } = await axios.post(`/api/borrow/${row.id}`, null, { params: { userId } })
  if (data.code === 0) {
    ElMessage.success('借阅成功')
    load()
  } else {
    ElMessage.error(data.message)
  }
}

onMounted(load)
</script>