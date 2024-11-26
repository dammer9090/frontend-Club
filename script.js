 
//........................... creation ......................................
 async function  clubCreateHandler(event){
  try{
    event.preventDefault();
  
    const createForm = document.querySelector("#createForm");

    const formData = new FormData(createForm);

    const response = await fetch("http://localhost:4000/api/v1/createClub", {
      method: "POST",
      body: formData,
    });

    if(!response.ok)
      throw new Error(error.message);
    

    const data = await response.json();

    console.log(data);

    window.location.href = 'index.html';



  }catch(e){
    console.error("Error in creating club:", e.message);
  }
 }



 //.................. reading................................

 async function getClub(){
  try{
    const response = await fetch('http://localhost:4000/api/v1/getClub')

    const data = await response.json();

    console.log(data);

    showClub(data.club);

  }catch(e){
    console.error('failed to get club information',e)
  }
 }

 getClub();

 


 function showClub(data){
  let clubs = document.querySelector('#clubs');

  data.forEach(data => {
      const club = document.createElement('div');
      club.innerHTML= `
        <img src=${data.image} width="300"/>
      
        <h2>Title : ${data.title}</h2>
        <p>Description : ${data.description}</p>
        <p>Venue : ${data.venue}</p>
        <button onclick="deleteClub('${data._id}')">Delete</button>
        <button onclick="updateClub('${data._id}')">Update</button>
    
      `

      club.classList.add('club');
 


      clubs.appendChild(club);
  });



 }

 
 
 //...................deletion..................................
 async function deleteClub(id){
   try{
     console.log(id)
     const response = await fetch(`http://localhost:4000/api/v1/deleteClub/${id}`,{
       method: 'DELETE'
      })
      
      const data = await response.json();
      
      console.log(data)
      
      window.location.reload();
    }catch(error){
      console.log('failed to delete club',error)
    }
  }



  //..........................updation................................
  function updateClub(id){
    localStorage.setItem('clubId', id);
    window.location.href = 'updateClub.html';
  }
  
  
 async function updateHandler(event){
  try{
    event.preventDefault()
    const id = localStorage.getItem('clubId')

    const formData = new FormData(event.target)

 



    const response  = await fetch(`http://localhost:4000/api/v1/updateClub/${id}`,{
      method:'PUT',
      body: formData
    })

    const data = await response.json();
    console.log('response',data);

    window.location.href = 'index.html';
    localStorage.clear('clubId')

  }catch(error){
    console.error('Error in updating club:', error.message);
  }
 }
 
      