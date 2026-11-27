<template>
  <div>
    <div class="toolbar">
      <el-button @click="load">刷新</el-button>
    </div>

    <el-table :data="rows" border style="margin-top: 16px">
      <el-table-column prop="id" label="记录号" width="90" />
      <el-table-column prop="bookTitle" label="书名" />
      <el-table-column prop="userId" label="用户" width="90" />
      <el-table-column label="状态" width="110">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'warning'">
            {{ row.status === 1 ? '已还' : '借出中' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="借出时间" width="180">
        <template #default="{ row }">{{ fmt(row.borrowTime) }}</template>
      </el-table-column>
      <el-table-column label="归还时间" width="180">
        <template #default="{ row }">{{ fmt(row.returnTime) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template #default="{ row }">
          <el-button size="small" type="success"
                     :disabled="row.status === 1"
                     @click="giveBack(row)">归还</el-button>
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

function fmt(t) {
  return t ? t.replace('T', ' ').slice(0, 19) : '-'
}

async function load() {
  const { data } = await axios.get('/api/borrow', {
    params: { page: page.value, size: size.value }
  })
  if (data.code !== 0) { ElMessage.error(data.message); return }
  rows.value = data.data.records
  total.value = data.data.total
}

function onPageChange(p) { page.value = p; load() }

async function giveBack(row) {
  const { data } = await axios.post(`/api/borrow/return/${row.id}`)
  if (data.code === 0) {
    ElMessage.success('归还成功')
    load()
  } else {
    ElMessage.error(data.message)
  }
}

onMounted(load)
</script>