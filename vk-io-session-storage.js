export default class FirestoreStorage{
    constructor(opts){
        const options = Object.assign({
            property: 'session_vk',
            store: null
        }, opts)
        if (!options.store) {
            throw Error("База не указана")
        }
        this.store = options.store;
        this.property = options.property;
    }

    async get(key){
        let res = await this.store.collection(this.property).doc(key).get();
        if (!res.exists) return undefined;
        return res.data();
    }

    async set(key, value){
        delete value['$forceUpdate'];
        await this.store.collection(this.property).doc(key).set(value);
        return true;
    }

    async delete(key){
        return this.store.collection(this.property).doc(key).delete();
    }

    // eslint-disable-next-line class-methods-use-this
    async touch(){
        // ...
    }
}
