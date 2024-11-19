window.addEventListener("load", limpaDados())

function limpaDados(){
    document.getElementById("display-dados").innerHTML = "Logradouro:<br>Bairro:<br>Cidade:<br>Estado:";
}

function buscarCEP(){
    let inputCEP = document.getElementById("input-cep").value;
    
    if(inputCEP === ""){
        limpaDados();
        alert("É necessário informar um CEP, Tente novamente!");
    }else{
        const validacep  = /^\d{8}$/;
        validacep.test(inputCEP);

        if(validacep.test(inputCEP)== true){
            const ajax = new XMLHttpRequest();  
            ajax.open('GET', 'https://viacep.com.br/ws/'+inputCEP+'/json/');
            ajax.send();

            ajax.onload = function(){
                document.getElementById('display-dados').innerHTML = this.responseText;
                let obj = JSON.parse(this.responseText);
                let logradouro = obj.logradouro;
                let cidade = obj.localidade;
                let estado = obj.uf;
                let bairro = obj.bairro;

                document.getElementById('display-dados').innerHTML = "Logradouro: "+logradouro+"<br>Bairro: "+bairro+"<br>Cidade: "+cidade+"<br>Estado: "+estado;
            }
        }if(validacep.test(inputCEP)== false){
            limpaDados();
            alert("CEP deve conter 8 caracteres numéricos, edite e tente novamente!");
        }/*else{
            limpaDados();
            alert("CEP não encontrado, tente outro!");
        }*/
         
    }          
}

