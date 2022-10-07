// сделать элементу высоту равную ширине

(() => {
    const elements = document.querySelectorAll('[data-set-height]')
    elements.forEach((element) => {
        setInterval(() => {
            element.style.height = `${element.clientWidth}px`
        }, 500);
    })
})();

//та штука с графиком дат
(() => {
    if (window.innerWidth >= 768) {
        setInterval(() => {
            let marg = 0
            const els = document.querySelectorAll('.dates-graf-item')
            els.forEach(el => {
                el.children[0].style.width = getComputedStyle(el).marginLeft

            })
            const last = document.querySelector('.dates-final')
            inwidth = getComputedStyle(last).marginLeft.split('p')
            width = ((last.clientWidth / 2) + Number(inwidth[0]) - 28)
            last.children[0].style.width = `${width}px`
            const wt = getComputedStyle(els[0]).marginLeft.split('p')
            marg = Number(wt[0])
            const table = document.querySelector('.dates-notif')
            table.style.width = `${(marg * 4) + 32 * 4 + 4}px`
        }, 500)
    }
})();