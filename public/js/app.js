console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const sendMyLocation = document.querySelector('#send-my-location')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

sendMyLocation.addEventListener('click', (e) => {
    e.preventDefault()

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    sendMyLocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        sendMyLocation.removeAttribute('disabled')
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/current-weather?coords=' + latitude + ',' + longitude).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})
