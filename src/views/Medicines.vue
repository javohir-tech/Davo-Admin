<template>
    <div>
        <div class="input-search">
            <h2>Dorilar Bo'limi</h2>
            <a-input ref="searchInput" size="large" v-model:value="searchQuery"
                placeholder="Dorilarni nomi  bo'yicha qidiring..."
                :prefix="h(SearchOutlined, { class: 'my-icon-class' })">
                <template #suffix>
                    <span class="access">Ctrl+K</span>
                </template>
            </a-input>
        </div>
        <a-table :columns="column" :data-source="filterdMedicines" :loading="loading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'prescriptionRequired'">
                    <a-tag :color="record.prescriptionRequired ? 'red' : 'green'">
                        {{ record.prescriptionRequired ? 'Retsept kerak' : 'Retsept kerak emas' }}
                    </a-tag>
                </template>
                <template v-if="column.key === 'operation'">
                    <a-flex :gap="6">
                        <a-button type="primary" danger>
                            <ClearOutlined />
                        </a-button>
                        <a-button>
                            <ToolOutlined />
                        </a-button>
                    </a-flex>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
//Vue
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useFetch } from '@/Hook/useFetch';
//Antd
import { ClearOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons-vue'

const { loading, data, getData } = useFetch('/medicines')
const column = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Restesp',
        dataIndex: 'prescriptionRequired',
        key: 'retsept'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock'
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'rigth',
        width: 100
    }
]

const searchQuery = ref('')
const searchInput = ref(null)

//computeds
const filterdMedicines = computed(() => {
    if (!searchQuery) {
        return data
    }
    return data.value.filter(medicine => medicine.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

//methods
const handleShortCut = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.value.focus()
    }
}

onMounted(() => {
    getData()
    window.addEventListener('keydown', handleShortCut)
})

onBeforeUnmount(()=>{
    window.removeEventListener('keydown', handleShortCut)
})
</script>

<style scoped>
.input-search {
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 10px;
}

.my-icon-class {
    color: #1890ff;
    font-size: 18px;
}

.access {
    font-size: 14px;
    color: #8c8c8c;
    font-weight: 500;
}
</style>