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
  console.log(options.body);
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
        <td>${sv.ID}</td>
        <td>${sv.Name}</td>
        <td>${sv.Age}</td>
        <td>${sv.Address}</td>
        <td>${sv.Ngaysinh}</td>
        <td>${sv.Hinhanh}</td>
        <td>${sv.Ngaygio}</td>
        <td>
            <button onclick=deletestudent(${sv.ID})>Xóa</button>
            <button onclick=hienthi_update(${sv.ID}) >Sửa</button>
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
console.log(options.body);
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
