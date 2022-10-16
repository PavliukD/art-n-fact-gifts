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
    if (window.innerWidth >= 1000) {
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
        return
    }
    setInterval(() => {
            let marg = 0
            const els = document.querySelectorAll('.dates-graf-item')
            els.forEach(el => {
                el.children[0].style.width = getComputedStyle(el).marginTop

            })
            const last = document.querySelector('.dates-final')
            inwidth = getComputedStyle(last).marginTop.split('p')
            width = ((last.clientWidth / 2) + Number(inwidth[0]) - 28)
            last.children[0].style.width = `${width}px`
            // const wt = getComputedStyle(els[0]).marginTop.split('p')
            // marg = Number(wt[0])
            // const table = document.querySelector('.dates-notif')
            // table.style.width = `${(marg * 4) + 32 * 4 + 4}px`
        }, 500)
})();

//мобильное меню
(() => {
    const button = document.querySelector('.header-button')
    const menu = document.querySelector('.header-nav')
    button.addEventListener('click', onClick)

    function onClick() {
        menu.classList.toggle('is-hidden')
    }
    
})();

// слайдер для фактов

(() => {
    const lists = document.querySelectorAll('[data-facts-list]')
    const controls  = document.querySelectorAll('[data-control]')
    const pages = document.querySelectorAll('.control-page')

    lists.forEach(list => {
        console.log(list.dataset.factsList)
        const buttons = document.querySelectorAll(`[data-btnFor="${list.dataset.factsList}"]`)

        let itemCounter = 0
        controls.forEach(ctrl => {
            if (ctrl.dataset.control !== list.dataset.factsList){
                return
            }
            let arr = []

            for (let i = 0; i < list.children.length; i++){
                arr.push(`<li class="control-list-item" data-id="${i}"></li>`)
            }

            const html = arr.join(' ')

            ctrl.innerHTML = html
            const step = list.children[0].clientWidth

            ctrl.children[itemCounter].classList.add('active')

            const {children}  = ctrl

            for (let i = 0; i < children.length; i++){
                children[i].addEventListener('click', (e) => {
                    itemCounter = Number(e.currentTarget.dataset.id)
                    list.style.transform= `translateX(-${step*itemCounter}px)`
                    for (let i = 0; i < children.length; i++){
                        children[i].classList.remove('active')
                    }
                    e.currentTarget.classList.add('active')
                    pages.forEach(page => {
                        if (page.dataset.for !== list.dataset.factsList){
                            return
                        }
                        page.textContent = `${itemCounter + 1}/${lenght}`
                    })
                })
            }
            const timer = Number(list.dataset.timer)
            const lenght = list.children.length

            pages.forEach(page => {
                if (page.dataset.for !== list.dataset.factsList){
                    return
                }
                page.textContent = `${itemCounter + 1}/${lenght}`
            })

            setInterval(() => {
                const number = itemCounter + 1
                for (let i = 0; i < children.length; i++){
                    children[i].classList.remove('active')
                }
                if (number === lenght){
                    itemCounter = 0
                    children[itemCounter].classList.add('active')
                    list.style.transform= `translateX(-${step*itemCounter}px)`
                    pages.forEach(page => {
                        if (page.dataset.for !== list.dataset.factsList){
                            return
                        }
                        page.textContent = `${itemCounter + 1}/${lenght}`
                    })
                    return
                }
                itemCounter++
                children[itemCounter].classList.add('active')
                list.style.transform= `translateX(-${step*itemCounter}px)`
                pages.forEach(page => {
                    if (page.dataset.for !== list.dataset.factsList){
                        return
                    }
                    page.textContent = `${itemCounter + 1}/${lenght}`
                })
            }, timer)

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const number = itemCounter + 1
                    if (btn.dataset.direction === 'left'){
                        if (number === 1){
                            itemCounter = lenght - 1 
                            moveList()
                            return
                        }
                        itemCounter--
                        moveList()
                        return
                    }
                    if (btn.dataset.direction === 'right'){
                        if (number === lenght){
                            itemCounter = 0
                            moveList()
                            return
                        }
                        itemCounter++
                        moveList()
                        return
                    } 

                    function moveList(){
                        for (let i = 0; i < children.length; i++){
                            children[i].classList.remove('active')
                        }
                        children[itemCounter].classList.add('active')
                        list.style.transform= `translateX(-${step*itemCounter}px)`
                        pages.forEach(page => {
                            if (page.dataset.for !== list.dataset.factsList){
                                return
                            }
                            page.textContent = `${itemCounter + 1}/${lenght}`
                        })
                    }
                })
            })

        })
    })
})();

//слайдер для подарков

(() => {

    const wrap = document.querySelector('.prises-list-wrap')
    const controls = document.querySelector('.prises-control-list')

    if (wrap.clientWidth < 799){
        return
    }

    let itemCounter = 0
        let arr = []

        for (let i = 0; i < wrap.children.length; i++){
            arr.push(`<li class="prises-control-item" data-id="${i}"></li>`)
        }

    const html = arr.join(' ')

    controls.innerHTML = html
    const step = wrap.children[0].clientWidth

    controls.children[itemCounter].classList.add('active')

    const {children}  = controls

    for (let i = 0; i < children.length; i++){
    children[i].addEventListener('click', (e) => {
        itemCounter = Number(e.currentTarget.dataset.id)
        wrap.style.transform= `translateX(-${step*itemCounter}px)`
        for (let i = 0; i < children.length; i++){
            children[i].classList.remove('active')
        }
        e.currentTarget.classList.add('active')
    })
    }

    const timer = Number(wrap.dataset.timer)
    const lenght = wrap.children.length

    setInterval(() => {

        const number = itemCounter + 1
        for (let i = 0; i < children.length; i++){
            children[i].classList.remove('active')
        }
        if (number === lenght){
            itemCounter = 0
            children[itemCounter].classList.add('active')
            wrap.style.transform= `translateX(-${step*itemCounter}px)`
            return
        }
        itemCounter++
        children[itemCounter].classList.add('active')
        wrap.style.transform= `translateX(-${step*itemCounter}px)`
    }, timer)
})();

//список победителей

(() => {
    const points = document.querySelectorAll('.dates-graf-item')
    const final = document.querySelector('.dates-final-out')
    const notifications = document.querySelectorAll('.graf-not')

    points.forEach(point => {
        point.addEventListener('click', (e) => {
            const notification = point.querySelector('.graf-not')
            notification.classList.toggle('is-hidden')

            const finalNotification = final.querySelector('.graf-not')
            finalNotification.classList.add('is-hidden')

            points.forEach(pnt => {
                if(e.currentTarget === pnt){
                    return
                }
                const not = pnt.querySelector('.graf-not')
                not.classList.add('is-hidden')
            })

        })
    })

    final.addEventListener('click', (e) => {
        const notification = final.querySelector('.graf-not')
        notification.classList.toggle('is-hidden')

        points.forEach(point => {
            const notification = point.querySelector('.graf-not')
            notification.classList.add('is-hidden')
        })
    })
})();