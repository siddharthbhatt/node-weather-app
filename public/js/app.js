console.log("Client side javascript file is loaded")





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Jvascript'

weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{

    response.json().then((data) =>{
        
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
        messageTwo.textContent = data.forecast
        messageOne.textContent = data.location
        
        }
    })

})
    //console.log(location)
    //console.log('testing')
})
