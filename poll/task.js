xhr = new XMLHttpRequest()
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php')
xhr.send()
let poll = undefined

xhr.addEventListener('readystatechange', (event) => {
    if (event.currentTarget.readyState === 4) {
        poll = JSON.parse(event.currentTarget.responseText)

        const pollTitle = document.querySelector('.poll__title')
        pollTitle.textContent = poll.data.title
        
        const pollAnswers = document.querySelector('.poll__answers')
        
        poll.data.answers.forEach((element) => {
            const button = document.createElement('button')
            button.classList.add('poll__answer')
            button.textContent = element

            pollAnswers.appendChild(button)
        })
    }
})

document.addEventListener('click', (event) => {
    const statistic = document.querySelector('.poll__statistic')
    if (event.target.classList.contains('poll__answer')) {
        document.querySelector('.poll__answers').classList.remove('poll__answers_active')

        const thanks = document.createElement('div')
        thanks.classList.add('thanks')
        thanks.textContent = 'Спасибо, ваш голос учтен!'

        const variants = document.createElement('div')
        variants.classList.add('variants')

        const newPoll = document.createElement('button')
        newPoll.classList.add('new_poll')
        newPoll.textContent = 'Пройти новый опрос'
        newPoll.setAttribute('onclick', "location.href='task.html'")
        variants.appendChild(newPoll)

        const getStatistics = document.createElement('button')
        getStatistics.classList.add('get_statistics')
        getStatistics.textContent = 'Показать статистику'
        variants.appendChild(getStatistics)

        statistic.appendChild(thanks)
        statistic.appendChild(variants)

    } else if (event.target.classList.contains('get_statistics')) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`vote=${poll.id}&answer=${poll.data.answers.indexOf(event.target.textContent, 0)}`);

        xhr.addEventListener('readystatechange', (event) => {
            statistic.innerHTML = ''
            if (event.currentTarget.readyState === 4) {
                const stat = JSON.parse(event.currentTarget.responseText).stat
                stat.forEach((element) => {
                    statistic.innerHTML = statistic.innerHTML + `<div>${element.answer} - <b>${element.votes}%</b></div>`
                })

                const newPoll = document.createElement('button')
                newPoll.classList.add('new_poll')
                newPoll.textContent = 'Пройти новый опрос'
                newPoll.setAttribute('onclick', "location.href='task.html'")
                statistic.appendChild(newPoll)
            }
        })
    }
})