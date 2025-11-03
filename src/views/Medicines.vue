<template>
    <div>
        <div class="input-search">
            <h2>Dorilar Bo'limi</h2>
            <a-flex gap="6">
                <a-input ref="searchInput" size="large" v-model:value="searchQuery"
                    placeholder="Dorilarni nomi yoki categoriyasi bo'yicha qidiring..."
                    :prefix="h(SearchOutlined, { class: 'my-icon-class' })">
                    <template #suffix>
                        <span class="access">Ctrl+K</span>
                    </template>
                </a-input>
                <a-button type="primary" size="large" @click="showModal">
                    Add
                </a-button>
            </a-flex>
        </div>
        <a-table :columns="column" :data-source="filterdMedicines" :loading="loading" @change="onChange">
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
        <a-modal title="Qo'shish" v-model:open="open" :footer="null" :width="600">

        </a-modal>
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
const open = ref(false)

//computeds
const filterdMedicines = computed(() => {
    if (!searchQuery) {
        return data
    }
    return data.value.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

//methods
const handleShortCut = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.value.focus()
    }
}

const onChange = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
}

const showModal = () => {
    open.value = true
}

onMounted(() => {
    getData()
    window.addEventListener('keydown', handleShortCut)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleShortCut)
})
</script>

<style scoped>
.input-search {
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
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