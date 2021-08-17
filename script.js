


const getXML = (callback) => {
  // create req object state 0
  const req = new XMLHttpRequest();
  // that callback will be fired every time state of req is changes 
  // loading state 3 
  // Done state 4
  req.addEventListener ("readystatechange", ()=>{
    if (req.readyState === 4 && req.status === 200){
      data = JSON.parse (req.responseText)
      callback (undefined, data)
    }
    else if (req.readyState === 4)
      callback ("could not fetch data")
  })
  // req.open("GET",'https://jsonplaceholder.typicode.com/todos/1'); 
  req.open ('GET', 'http://127.0.0.1:5500/todos.json')  // state 1 
  req.send()   // header recived state 2 
}

//////////////////////////////////////////////////////////////////////////


const getpromise = (src) => {
  return new Promise ((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener ("readystatechange", ()=>{
    if (req.readyState === 4 && req.status === 200){
      data = JSON.parse (req.responseText)
      resolve (data)
    }
    else if (req.readyState === 4)
      reject ("could not fetch data")
  })
  req.open ('GET', src)
  req.send()
})
}

/////////////////////////////////////////////////////////////////////////////

getXML ((err, data)=>{
  if (err) console.log (err)
  else 
  console.log(data)
})

/////////////////////////////////////////////////////////////////////////////////

// then callback will be fired when the promise resolved 
// catch callback  will be fired when the promise rejected

getpromise ('http://127.0.0.1:5500/todos.json')
.then((data)=> console.log('resolved data', data))
.catch((err) => console.log('rejected error', err))


////////////////////////////////////////////////////////////////////////////////

// fetch returns a promise 

fetch ('http://127.0.0.1:5500/todos.json').then ((response)=>{
  return response.json ()   // parse the json data to js object and return it as a promise 
})
.then(data => console.log(data))
.catch((err) => console.log('rejected error', err))


//////////////////////////////////////////////////////////////////////////////////

// async means it's an asynch function that always will return a promise  

const getTodos = async () => {
  // await will stop assigning the var UNTIL the PROMISE has been resolved 
  // then assign the resolved value to the var 
  const res = await fetch ('http://127.0.0.1:5500/todos.json')
  const data = await res.json()
  return data
}


// getTodo returns promise so it needs then to handle that promise 
getTodos().then ((data) => console.log(data))
