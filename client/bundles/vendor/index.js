window.$ = (querySelector)=>{
    return document.querySelector(querySelector);
}

window.$$ = (querySelector)=>{
    return document.querySelectorAll(querySelector);
}