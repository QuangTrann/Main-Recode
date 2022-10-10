// var courses = [
//     {
//         id: 1,
//         name:'Quang',
//         age: 13
//     },
//     {
//         id: 2,
//         name:'Tran',
//         age: 13
//     },
//     {
//         id: 3,
//         name:'minh',
//         age: 1
//     },
//     {
//         id: 4,
//         name:'anh',
//         age: 12
//     },
//     {
//         id: 5,
//         name:'anh',
//         age: 17
//     }
    
// ]


// // var newCourses = courses.reduce()

// // var i = 0 

// // function totalAge (accumulator,currentValue){
// //     i++
// //     var total = accumulator + currentValue.age
// //     console.table({
// //         'luot chay': i,
// //         'bien luu tru': accumulator,
// //         'so tuoi': currentValue.age,
// //         'tong so tuoi': total
// //     }
// //         )
// //         return total;

// // }

// // var tongAge = courses.reduce(totalAge,0)


// Array.prototype.reduce2 = function(callback,result){
//     let i = 0 
//     if(arguments.length < 2) { 
//         i = 1
//         result = this[0]
//     }
//     for (; i < this.length; i++) {
//         result = callback(result,this[i],i,this)

//     }
//     return result
// }

  
// const arr = [1,2,3,4,5]
// const result = arr.reduce2(function(acc,currentValue){
//     return acc + currentValue 
// },)
// console.log(result);
function load(url) {
    return new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.onloadend = function () {
        if (this.readyState === 4 && this.status == 200) {
          resolve(this.response);
        } else {
          reject(this.status);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  
  const url = "https://www.javascripttutorial.net/sample/promise/api.json";
  const btn = document.querySelector("#btnGet");
  const msg = document.querySelector("#message");
  
  btn.addEventListener("click", () => {
    load(url)
      .then((response) => {
        const result = JSON.parse(response);
        msg.innerHTML = result.message;
      })
      .catch((error) => {
        msg.innerHTML = `Error getting the message, HTTP status: ${error}`;
      });
  });
  
  // promise chain
  
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 3 * 100);
  });
  
  p.then((result) => {
    console.log(result); // 10
    return result * 2;
  })
    .then((result) => {
      console.log(result); // 20
      return result * 3;
    })
    .then((result) => {
      console.log(result); // 60
      return result * 4;
    });
  
  function getUser(userId) {
    return new Promise((resolve, reject) => {
      console.log("Get the user from the database.");
      setTimeout(() => {
        resolve({
          userId: userId,
          username: "admin",
        });
      }, 1000);
    });
  }
  
  function getServices(user) {
    return new Promise((resolve, reject) => {
      console.log(`Get the services of ${user.username} from the API.`);
      setTimeout(() => {
        resolve(["Email", "VPN", "CDN"]);
      }, 3 * 1000);
    });
  }
  
  function getServiceCost(services) {
    return new Promise((resolve, reject) => {
      console.log(`Calculate the service cost of ${services}.`);
      setTimeout(() => {
        resolve(services.length * 100);
      }, 2 * 1000);
    });
  }
  
  getUser(100).then(getServices).then(getServiceCost).then(console.log);
  