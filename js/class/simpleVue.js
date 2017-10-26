class Vue {
    constructor(obj) {
        this.divMap = {};

        this.set(obj.data);

        Object.assign(this, obj.methods);
    }

    set (data) {
        for (let key in data) {
            let val = data[key];
            Object.defineProperty(this, key, {
                get () {
                    return val;
                },
                set (newVal) {
                    val = newVal;
                    this.divMap = this.broadcast(key, this.divMap);
                },
            });
        }
    }

    broadcast(key, divMap) {
        let div;
        if (divMap[key]) {
            div = divMap[key];
        } else {
            div         = document.getElementById(key);
            divMap[key] = div;
        }
        div.innerHTML = this[key];
        return divMap;
    }
}

// 例子
/*
let user = new User({
    data   : {
        name: '123',
        age : '',
    },
    methods: {
        set () {
            console.log(this.name)
        },
        setName() {

        },
    },
});
*/
