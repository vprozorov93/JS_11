xhr = new XMLHttpRequest()
xhr.open('GET','https://netology-slow-rest.herokuapp.com')
xhr.send()

xhr.addEventListener('readystatechange', (event) => {
    if (event.currentTarget.readyState === 4) {
        const valutes = JSON.parse(event.currentTarget.responseText).response.Valute
        const items = document.getElementById('items')
        const preloader = document.querySelector('.loader')
        preloader.classList.remove('loader_active')
        Object.keys(valutes).forEach((valute) => {
            const code = valutes[valute].CharCode
            const value = valutes[valute].Value
            const divItem = document.createElement('div')
            divItem.classList.add('item')

            const divItemCode = document.createElement('div')
            divItemCode.classList.add('item__code')
            divItemCode.textContent = `${code}`

            const divItemValue = document.createElement('div')
            divItemValue.classList.add('item__value')
            divItemValue.textContent = `${value}`
            
            const divItemCurrency = document.createElement('div')
            divItemCurrency.classList.add('item__currency')
            divItemCurrency.textContent = 'руб.'

            divItem.appendChild(divItemCode)
            divItem.appendChild(divItemValue)
            divItem.appendChild(divItemCurrency)
            items.appendChild(divItem)
        })
    }
})