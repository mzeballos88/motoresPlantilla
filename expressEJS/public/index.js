document.addEventListener('submit',enviarFormulario);

function enviarFormulario(event){
    event.preventDefault();
    let formulario = document.getElementById('productForm');
    let data = new FormData(form);
    fetch('/api/productos',{
        method: 'POST',
        body:data
    }).then(result=>{
        return result.json();
    }),then(json =>{
        Swal.fire({
            title:'Éxito',
            text:json.message,
            icon: 'success',
            timer: 2000,
        }).then(result=>{
            location.href='/'
        })
    }) 
}

document.getElementById("image").onchange= (e)=>{
    let read= new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡Gran Pokemon!"
        document.getElementById("preview").src = e.target.resultM
    }
    read.readAsDataURL(e.target.files[0])
}
