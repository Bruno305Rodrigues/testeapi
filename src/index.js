import api from "./api";


class App {
    constructor() {
        document.getElementById('logar').onclick = () => this.logar();
        document.getElementById('realizarCadastro').onclick = () => this.cadastrar();
        document.getElementById("cadastrar").onclick = () => this.trocarPagina();
        document.getElementById("cadastrarGrowdever").onclick = () => this.paginaCadastrarGrowdever();
        document.getElementById("bt-cadastro").onclick = () => this.cadastrarGrowdever();
        document.getElementById("sair").onclick = () => this.sairDaLista();
        document.getElementById("sair-telaCadastro").onclick = () => this.sairDoCadastro();
        document.getElementById("sair-tela-user").onclick = () => this.sairTelaUser();

      //document.querySelectorAll(".excluirGrowdever").onclick = () => this.excluirGrowdever();

        this.token = ""; 
        this.uid = "";
        this.id = "";
    }
    
//Logar usuario

logar() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
   

    api.post('/login', {
        "username": username,
        "password": password
    }).then(r => {
        this.uid = r.data.user.uid;
       const { success, token } = r.data;
       console.log("teste1",this.uid);

     

       

        if (success) {

            this.token = token;
            this.buscaGrowdevers();
            

        }

    
    }).catch(e => alert(e.response.data.message)); 
}

buscaGrowdevers() {
    api.getAutenticado('/growdevers' , this.token)
        .then( r => {
            console.log(this.uid);

            let html = "";
            r.data.growdevers.forEach( (gd) => {
                html += `

                <ul class="list-group" >
                <li class="list-group-item"> Nome: ${gd.user.name} </li>
                 <li class="list-group-item"> Email: ${gd.email}</li>
                 <li class="list-group-item"> Telefone: ${gd.phone}</li>
                 <li class="list-group-item"> Programa: ${gd.program}</li>
                

               

                 <hr>
                 <button type="button"  class="btn btn-dark excluirGrowdever" data-id="${gd.uid}">Excluir Growdever</button>
                 <hr>

           
            
                </ul>
                
                   
                    
                       
                   

                `
            });
            document.getElementById("listaGrowdevers").innerHTML = html;
            document.getElementById("logarUsuario").style.display = "none";
            document.getElementById("lista").style.display = "block";
            document.querySelectorAll(".excluirGrowdever").forEach((el) => {
                el.onclick = (event) => this.excluirGrowdever(event);
            });


        })
}

trocarPagina() {
    document.getElementById("logarUsuario").style.display = "none";
    document.getElementById("cadastrarUsuario").style.display = "block";

}

//cadastrar User

cadastrar() {
    console.log(this.uid);

    const nome = document.getElementById("nomeUsuario").value;
    const senha1 = document.getElementById("password2").value;
    const tipo1 = document.getElementById("tipo").value;
    const username1 = document.getElementById("user").value;

    api.post('/users',{
        "name": nome,
        "password":senha1,
        "type": tipo1,
        "username": username1

    }).then(r => {
        this.uid = r.data.user.uid;
        console.log(this.uid);
        document.location.reload();

        
    }).catch(e => {
        alert(e.response.data.message)

    })
    


  
}

cadastrarGrowdever() {

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const program = document.getElementById("program").value;
  
    
    api.postAutenticado('/growdevers', this.token, {
        "email": email,
        "phone":phone,
        "program": program,
        "user_uid":this.uid
        

    }).then(r => {
        console.log(r.data)

       

    }).catch(e => {
        alert(e.response.data.message)
      
       console.log("data",e.response.data)
      

        
    })

}

excluirGrowdever(event) {
    const id = event.path[0].dataset.id;
    this.id = id
  

    api.delete(`/growdevers/${this.id}`, this.token,{
        
        
        

    }).then(r => {
     alert(r.response.data.message);
     alert("Registro excluído !");
     
     

        
    }).catch(e => {
        alert(e.response.data.message)
        console.log("uid:", this.token)

    })

    document.getElementById("lista").style.display = "none";
    document.getElementById("logarUsuario").style.display = "block";
    
    
    
}

paginaCadastrarGrowdever() {
    document.getElementById("lista").style.display = "none";
    document.getElementById("cadastrarAluno").style.display = "block";


}
sairDaLista() {
    document.getElementById("lista").style.display = "none";
    document.getElementById("logarUsuario").style.display = "block";


}

sairDoCadastro() {
    document.getElementById("cadastrarAluno").style.display = "none";
    document.getElementById("lista").style.display = "block";


}

sairTelaUser() {

    document.getElementById("cadastrarUsuario").style.display = "none";
    document.getElementById("logarUsuario").style.display = "block";
}

}

new App();