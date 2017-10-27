class IndexDB {
    constructor(obj) {
        Object.assign(this, obj);
        this.name    = obj.name;
        this.version = obj.version || 1;
        this.db      = obj.db || null;
    }

    /**
     * 打开一个DB
     * @returns {*|Window}
     */
    openDB() {
        let request = window.indexedDB.open(this.name, this.version);

        request.onerror = e => {
            error(`Error: ${e.target.error.message}.`);
        };

        return request;
    }

    /**
     * 关闭该DB
     */
    closeDB() {
        this.db.close();
    }

    /**
     * 删除该DB
     */
    deleteDB() {
        window.indexedDB.deleteDatabase(this.name);
    }

    /**
     * 事务
     * @param args
     * @returns {*}
     */
    transaction(...args) {
        return this.db.transaction(...args);
    }

    /**
     * 创建store
     * @param args
     * @returns {*}
     */
    createObjectStore(...args) {
        if (!this.hasObjectStore(args[0])) {
            return this.db.createObjectStore(...args);
        }
    }

    /**
     * 向指定store中增加一条数据
     * @param itemName
     * @param storeName
     * @returns {Set.<T>}
     */
    addObjectStoreItem(itemName, storeName) {
        return this.getObjectStore(storeName).add(itemName);
    }

    /**
     * 通过键获取store中的一条数据
     * @param key
     * @param storeName
     * @returns {Promise}
     */
    getObjectStoreItemByKey(key, storeName) {
        return new Promise((reject, resolve) => {
            let store   = this.getObjectStore(storeName);
            let request = store.get(key);

            request.onsuccess = e => {
                let item = e.target.result;
                if (typeof item !== 'undefined' && item !== null) {
                    reject({store, item});
                }
                else resolve(`Error: The key(${key}) is not exist.`);
            };

            request.onerror = e => {
                error(
                    `Error: Get objectStore(${storeName}) item(${key}) error.`);
            };
        });
    }

    /**
     * 通过键更新store中的一条数据
     * @param key
     * @param storeName
     * @param updateItemAttrObj 需要更新的属性对象
     */
    updateObjectStoreItemByKey(key, storeName, updateItemAttrObj) {
        return this.getObjectStoreItemByKey(key, storeName).then(data => {
            Object.assign(data.item, updateItemAttrObj);
            let request = data.store.put(data.item);

            request.onerror = e => {
                error(
                    `Error: Update objectStore(${storeName}) item(${key}) error.`);
            };

            return data;
        }).catch(err => error(err));
    }

    /**
     * 通过键删除store中的一条数据
     * @param key
     * @param storeName
     * @returns {*|boolean}
     */
    deleteObjectStoreItemByKey(key, storeName) {
        return new Promise((reject, resolve) => {
            let store   = this.getObjectStore(storeName);
            let request = store.delete(key);

            request.onsuccess = e => {
                reject(true);
            };

            request.onerror = e => {
                error(
                    `Error: Delete objectStore(${storeName}) item(${key}) error.`);
            };
        });
    }

    /**
     * 通过store名称清空store
     * @param storeName
     * @returns {Promise}
     */
    clearObjectStore(storeName) {
        return new Promise((reject, resolve) => {
            let store         = this.getObjectStore(storeName);
            let request       = store.clear();
            request.onsuccess = e => {
                reject(true);
            };

            request.onerror = e => {
                error(`Error: Clear objectStore(${storeName}) error.`);
            };
        });
    };

    /**
     * 是否具有指定store
     * @param storeName
     * @returns {boolean}
     */
    hasObjectStore(storeName) {
        return this.db.objectStoreNames.contains(storeName);
    }

    /**
     * 通过名称获取store
     * @param storeName
     * @param transactionMode 模式'read'、'readwrite'、verionchange
     * @returns {*} 返回该store
     */
    getObjectStore(storeName, transactionMode = 'readwrite') {
        if (!this.hasObjectStore(storeName)) {
            error(`Error: The storeName(${storeName}) is not exist.`);
            return null;
        }
        let transaction = this.transaction(storeName, transactionMode);
        return transaction.objectStore(storeName);
    }

    /**
     * 通过名称删除store
     * @param storeName
     * @returns {boolean}
     */
    deleteObjectStore(storeName) {
        if (this.hasObjectStore(storeName)) {
            this.db.deleteObjectStore(storeName);
            return true;
        } else {
            error(`Error: The storeName(${storeName}) is not exist.`);
            return false;
        }
    }

}


