const progress = document.getElementById('progress')


document.forms.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const xhr = new XMLHttpRequest()
    
    xhr.upload.onprogress = (event) => {
        progressHandler(event)
    }

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php')
    let formData = new FormData(document.forms.form)

    xhr.send(formData)
})

function progressHandler(event) {
    const percentLoaded = Math.round((event.loaded / event.total) * 100)
    progress.value = percentLoaded
  }