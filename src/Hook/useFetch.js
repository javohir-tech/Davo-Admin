//Vue
import { ref } from "vue";
//FireBase
import { db } from "@/Firebase/config";
import { collection, getDocs } from "firebase/firestore";

export function useFetch(collectionName) {

    const loading = ref(false);
    const error = ref(false);
    const data = ref([]);

    async function getData() {
        loading.value = true
        try {
            const querySnapshot = await getDocs(collection(db, collectionName))
            data.value = querySnapshot.docs.map(doc => {
                return {
                    id:  doc.id, 
                    ...doc.data()
                }
            })
        } catch (err) {
            console.log(err)
            error.value = true
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        data,
        getData
    }
}