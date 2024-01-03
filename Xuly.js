var getAPI="http://localhost:3000/Student";
function start() {
    getStudent(function (sinhvien) {
      displaystudent(sinhvien);
       
      
    });
  }
  start();
  
  function getStudent(callback) {
    fetch(getAPI)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
  function createstudent(formdata,callback)
  {
    var options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formdata)
        
    };
  
    fetch(getAPI,options)
    .then(function(response)
    {
        response.json();
    }
    )
    .then(callback);
  }
  function displaystudent(student) {
    var body = document.querySelector("tbody");
    var html = student.map(function (sv) {
        return `<tr>
        <td id="id-${sv.id}">${sv.id}</td>
        <td id="name-${sv.id}">${sv.Name}</td>
        <td id="age-${sv.id}">${sv.Age}</td>
        <td id="address-${sv.id}">${sv.Address}</td>
        <td id="ngaysinh-${sv.id}">${sv.Ngaysinh}</td>
        <td id="hinhanh-${sv.id}"><img src="${sv.Hinhanh}"></td>
        <td id="ngaygio-${sv.id}">${sv.Ngaygio}</td>
        <td>
            <button onclick=deletestudent(${sv.id})>Xóa</button>
            <button onclick=hienthi_update(${sv.id}) >Sửa</button>
          </td>
        </tr>`;
    });
  
    body.innerHTML = html.join("");
  }
  function Add() {
    var name=document.querySelector('input[name="Name"]').value;
    var age=document.querySelector('input[name="Age"]').value;
    var address=document.querySelector('input[name="Address"]').value;
    var date=document.querySelector('input[name="Ngaysinh"]').value;
    var img=document.querySelector('input[name="Hinhanh"]').value;
    var datetime=document.querySelector('input[name="Ngaygio"]').value;
    var ns=new Date(date);
   var ngsinh=ns.toLocaleDateString("vi-VN");
   var ng=new Date(datetime);
   var ngaygio=ng.toLocaleDateString("vi-VN");
//    console.log(name);
//    console.log(age);
//    console.log(address);
//    console.log(ngsinh);
//    console.log(parseImage);
//    console.log(ngaygio);
   var formdata={
            ID:5,
            Name:name,
            Age:age,
            Address:address,
            Ngaysinh:ngsinh,
            Hinhanh:parseImage,
            Ngaygio:ngaygio
   };
   console.log(formdata);
   createstudent(formdata,function(){
    getStudent(function (sinhvien) {
      displaystudent(sinhvien);
       
      
    });
   });
    
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

var imageElement;
var parseImage;
var inputImage = document.querySelector('input[type="file"]');
inputImage.onchange = function (e) {
    var dataImage = e.target.files;

    if (dataImage.length > 0) {
         var imageElement = dataImage[0];
        
        toBase64(imageElement)
            .then(result => {
                parseImage = result;
                // console.log(parseImage);
            })
            .catch(error => {
                console.error("Lỗi khi chuyển đổi thành chuỗi base64", error);
            });
    }
};
function deletestudent(id)
{
  var options={
    method:'DELETE',
    headers:{
        'Content-Type':'application/json'
    },
};

fetch(getAPI+'/'+id,options)
.then(function(response)
{
    response.json();
}
)
.then(function(){
  getStudent(function (sinhvien) {
    displaystudent(sinhvien);
  });
});

}

// var Ns=new Date(ddate);
// var ngsinh=ns.toLocaleDateString("vi-VN");
// var ng=new Date(datetime);
// var ngaygio=ng.toLocaleDateString("vi-VN");

var Name=document.getElementById("Name");
var Age=document.getElementById("Age");
var Address=document.getElementById("Address");
var ddate=document.getElementById("Ngaysinh");
var Img=document.getElementById("Hinhanh");
var Datetime=document.getElementById("Ngaygio");
function hienthi_update(id)
{
  console.log(id);
  var name=document.getElementById("name-"+id).innerText;
  var age=document.getElementById("age-"+id).innerText;
  var address=document.getElementById("address-"+id).innerText;
  var date=document.getElementById("ngaysinh-"+id).innerText;
  var hinhanh=document.getElementById("hinhanh-"+id).innerText;

  var ngaygio=document.getElementById("ngaygio-"+id).innerText;
console.log(name);
 
  /////
 
  Name.value=name;
  Age.value=age;
  Address.value=address;
  ddate.value=date;
  Datetime.value=ngaygio;
  var btnSua=document.getElementById("buttonSua");
  
  btnSua.setAttribute('onclick',`update(${id})`)
}
function update(id)
{
  var data={
    Name:Name.value,
    Age:Age.value,
    Address:Address.value,
    Ngaysinh:ddate.value,
    Hinhanh:parseImage,
    Ngaygio:Datetime.value
  }
  var options={
    method:'PUT',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
};

fetch(getAPI+'/'+id,options)
.then(function(response)
{
    response.json();
}
)
.then(function(){
  getStudent(function (sinhvien) {
    displaystudent(sinhvien);
  });
});
}