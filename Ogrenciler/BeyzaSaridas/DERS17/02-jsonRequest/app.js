document.getElementById("getButton").addEventListener("click",getAllData);
function getAllData(){
   const xhr=new XMLHttpRequest();
   xhr.open("GET","./users.json",true);
   xhr.onload=function(){
      let list=document.getElementById("employees");
      if (this.status===200){
         const data=JSON.parse(this.responseText);
         data.foreach((user)=>{
            list.innerHTML +=`
            <tr>
               <td>${user.name }</td>
               <td>${user.department}</td>
               <td>${user.salary }</td>

            </tr>
            `;
         })
      };
   };
   
   xhr.send();
};