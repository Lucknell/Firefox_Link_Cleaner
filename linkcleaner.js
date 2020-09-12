console.log("linkcleaner");
function setCurrentChoice(result) {
    defaultFilters = result.filters || "Error";
}

function onError(error) {
    console.log(`Error: ${error}`);
}

let getting = browser.storage.sync.get("filters");
getting.then(setCurrentChoice, onError);
//creates context menu
browser.contextMenus.create({
    id: "newTabText",
    title: "Clean text link in new tab",
    contexts: ["selection"], //get selected text
});
browser.contextMenus.onClicked.addListener(contextMenuNewTab);

browser.contextMenus.create({
    id: "curTabText",
    title: "Clean text link in current tab",
    contexts: ["selection"], //get selected text
});
browser.contextMenus.onClicked.addListener(contextMenuCurTab);

browser.contextMenus.create({
    id: "curTabLink",
    title: "Clean link in current tab",
    contexts: ["link"], //get link
});

browser.contextMenus.onClicked.addListener(contextMenuCurTab);

browser.contextMenus.create({
    id: "newTabLink",
    title: "Clean link in new tab",
    contexts: ["link"], //get link
});

browser.contextMenus.onClicked.addListener(contextMenuNewTab);

browser.browserAction.onClicked.addListener(actionButtonAction);

function actionButtonAction(tab) {
    url = tab.url;
    url = processLink(url);
    if (url === undefined) return;
    browser.tabs.update({ url: url });
}

function contextMenuNewTab(info) {
    text = info.selectionText;
    url = info.linkUrl;
    url = text !== undefined ? text : url;
    url = processLink(url);
    if (url === undefined) return;
    browser.tabs.create({ url: url });
}

function contextMenuCurTab(info) {
    text = info.selectionText;
    url = info.linkUrl;
    url = text !== undefined ? text : url;
    url = processLink(url);
    if (url === undefined) return;
    browser.tabs.update({ url: url });
}

function processLink(url) {
    if (validURL(url)) {
        url = decodeHTMLSymbols(url);
        let temp = url;
        url = cleanLink(url);
        if (isEqual(temp, url)) return undefined;
        url = protocolAdd(url) ? url : 'https://' + url;
        return url;
    }
}
function validURL(str) {
    var pattern = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
    return pattern.test(str);
}

function protocolAdd(url) {
    let proto = new RegExp("^(http|https)://", "i");
    return proto.test(url);
}

function isEqual(str1, str2) {
    return str1.toUpperCase() === str2.toUpperCase()
}
function cleanLink(args) {
    console.log("link provided :" + args);
    if (validURL(args)) {
        url = decodeHTMLSymbols(args);
        url = filterLink(url);
        if (!validURL(url)) return undefined;
        console.log("filtered link is " + url);
        if (validURL(url)) {
            if (isEqual(args, url)) {
                return args;
            } else {
                return url;
            }
        }
        return undefined;
    }
    return undefined;
}

function decodeHTMLSymbols(url) {
    url += "";
    return url.replace(/%2F/gi, '/')
        .replace(/%3A/gi, ":").replace(/%3F/gi, "?")
        .replace(/%3D/gi, "=").replace(/%26/gi, "&")
        .replace(/%2B/gi, "+").replace(/%23/gi, "#")
        .replace(/%7C/gi, "|").replace(/%24/gi, "$")
        .replace(/%27/gi, "'").replace(/%25/gi, "%");
}

function filterLink(url) {
    let getting = browser.storage.sync.get("filters");
    getting.then(setCurrentChoice, onError);
    filters = defaultFilters.split("\n");
    url += "";
    for (i = 0; i < filters.length; i++) {
        params = filters[i] + "";
        filter = params.split(",");
        if (filter[0] === 'Split') {
            if (url.includes(filter[1])) {
                index = filter[3];
                var temp = url.split(filter[2]);
                if (validURL(temp[index])) {
                    url = temp[index];
                }
            }
        }
        if (filter[0] === 'Replace') {
            if (url.includes(filter[1])) {
                if (filter.length == 3) {
                    var replace = ""
                } else {
                    var replace = filter[3]
                }
                if (validURL(url.replace(filter[2], replace))) {
                    url = url.replace(filter[2], replace);
                }
            }
        }
        if (filter[0] === 'Prepend') {
            if (url.includes(filter[1])) {
                url = filter[2] + url;
            }
        }
        if (filter[0] === 'Append') {
            if (url.includes(filter[1])) {
                url =+filter[2];
            }
        }
    }
    return url;
}