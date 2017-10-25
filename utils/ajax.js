let ajax = {
    get (url) {
        return XHR({
            method: 'GET',
            url,
        });
    },
    post(url, body) {
        return XHR({
            method: 'POST',
            url,
            body,
        });
    },
};


let XHR = function(obj) {
    return new Promise(resolve => {
        let xhr;

        function loadXHR(obj) {
            xhr = null;
            if (window.XMLHttpRequest) {
                // code for all new browsers
                xhr = new XMLHttpRequest();

            } else if (window.ActiveXObject) {
                // code for IE5 and IE6
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            if (xhr != null) {
                xhr.onreadystatechange = stateChangeCallback;

                xhr.open(obj.method, obj.url);
                xhr.send(obj.body == null ? null : obj.body);

            } else {
                alert('Your browser does not support XMLHTTP.');
            }
        }

        function stateChangeCallback() {
            // 4 = "loaded"
            // 200 = ok
            if (xhr.readyState == 4 && xhr.status == 200) {
                let responseText = xhr.responseText;
                resolve(responseText);
            }
        }

        loadXHR(obj);
    }).then(responseText => {
        return JSON.parse(responseText);
    });
};
