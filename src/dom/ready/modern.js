var avalon = require('../../seed/core')
avalon._hydrate = require('../../strategy/hydrateByDom.modern')

var document = avalon.document

var readyList = [], isReady
var fireReady = function (fn) {
    isReady = true

    while (fn = readyList.shift()) {
        fn(avalon)
    }
}

avalon.ready = function (fn) {
    if (!isReady) {
        readyList.push(fn)
    } else {
        fn(avalon)
    }
}

avalon.ready(function () {
    avalon.scan(document.body)
})

new function () {
    if (!avalon.browser)
        return
    if (document.readyState === 'complete') {
        setTimeout(fireReady) //如果在domReady之外加载
    } else {
        document.addEventListener('DOMContentLoaded', fireReady)
    }

    avalon.bind(window, 'load', fireReady)

}


