self.onmessage = async (event)=>{

console.log("Worker received message:", event);
    const api = event.data;

console.log("Worker received message bbbbbb:", api);
    // API call in background
    const response = await fetch(
        `${api}/users`
    );


    const users = await response.json();


    // send result back
    self.postMessage({

        count: users.length,

        data: users.slice(0,10)

    });


}