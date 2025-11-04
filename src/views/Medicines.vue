<template>
    <div>
        <div class="input-search">
            <h2>Dorilar Bo'limi</h2>
            <a-flex gap="6">
                <a-input ref="searchInput" size="large" v-model:value="searchQuery"
                    placeholder="Dorilarni nomi yoki categoriyasi bo'yicha qidiring..."
                    :prefix="h(SearchOutlined, { class: 'my-icon-class' })" allowClear>
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
        <a-modal title="Dori Ma'lumotlarini Qo'shish" v-model:open="open" :footer="null" :width="600">
            <p>Barcha kerakli ma'lumotlarni to'ldiring</p>
            <a-form layout="vertical">
                <a-form-item label="Dori Nomi" name="name">
                    <a-input placeholder="Dori nomini kiriting" />
                </a-form-item>
                <a-form-item label="Faol Modda" name="activeIngredient">
                    <a-input placeholder="Faol moddani kiriting" />
                </a-form-item>
                <a-form-item label="Kategoriya" name="category">
                    <a-input placeholder="Kategoriyani kiriting" />
                </a-form-item>
                <a-form-item label="Ishlab Chiqaruvchi " name="manufacturer">
                    <a-input placeholder="Firma nomi kiriting" />
                </a-form-item>
                <a-form-item label="Mamlakat" name="country">
                    <a-input placeholder="Mamlakatni kiriting" />
                </a-form-item>
                <a-form-item label="Dozalash" name="dosage">
                    <a-input placeholder="Doza miqdorini kiriting" />
                </a-form-item>
                <a-form-item label="Narxi" name="price">
                    <a-input placeholder="Dori narxini kiriting" />
                </a-form-item>
                <a-form-item label="Ombordagi miqdor" name="stock">
                    <a-input placeholder="Ombordagi midorni kiriting" />
                </a-form-item>
                <a-form-item label="Amal qilish mudati" name="expiryDate">
                    <a-input placeholder="Amal qilish muddatini kiriting" />
                </a-form-item>
                <a-form-item>
                    <a-checkbox>Sertifikat talap qiladimi</a-checkbox>
                </a-form-item>
                <a-form-item label="Ta'rif" name="description">
                    <a-textarea placeholder="Dori haqida qisqacha malumot..." />
                </a-form-item>
                <a-form-item label="Saqlaash sharoiti" name="storageConditions">
                    <a-input placeholder="Saqlash sharoitini kiriting" />
                </a-form-item>
                <a-form-item label="Qo'lash bo'yicha ko'rsatmalar" name="usageInstructions">
                    <a-input placeholder="Qanday qo'llanishini kiriting..." />
                </a-form-item>
                <a-form-item label="Ogohlantish" name="WarningMessage">
                    <a-textarea placeholder="Muhim ogohlantirish habari..."/>
                </a-form-item>
            </a-form>
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