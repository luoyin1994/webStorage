class XHR {
    constructor(obj) {
        this.method = obj.method;
        this.url    = obj.url;
        this.body   = obj.body;
        return this.loadXHR().then(responseText => {
            return JSON.parse(responseText);
        });
    }

    loadXHR() {
        return new Promise(resolve => {
            let xhr = null;
            if (window.XMLHttpRequest) {
                // code for all new browsers
                xhr = new XMLHttpRequest();

            } else if (window.ActiveXObject) {
                // code for IE5 and IE6
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            if (xhr != null) {
                xhr.onreadystatechange = stateChangeCallback;

                xhr.openDB(this.method, this.url);
                xhr.send(this.body == null ? null : this.body);

            } else {
                alert('Your browser does not support XMLHTTP.');
            }

            function stateChangeCallback() {
                // 4 = "loaded"
                // 200 = ok
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let responseText = xhr.responseText;
                    resolve(responseText);
                }
            }
        });
    }
}

let ajax = {
    get (url) {
        return new XHR({
            method: 'GET',
            url,
        });
    },
    post(url, body) {
        return new XHR({
            method: 'POST',
            url,
            body: toQueryString(body)
        });
    },
};