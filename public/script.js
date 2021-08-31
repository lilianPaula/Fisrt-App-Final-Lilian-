let cadastro;

listaCriada= false;

function update(index,link){
    
        
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs-1]; //cria uma conexao com o input que é do tipo button


    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show'; //mostra butao de envio

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        
        
        const http = new XMLHttpRequest(); //as requisições HTTP sejam feitas via browser, permite a comunicação assííncrona com o servidor, 
        //através de script (JavaScript), sem que seja iniciada uma nova janela , não tendo a necessidade de atualização da página,
        // sendo possível criar páginas mais interativas.
        const url=link; //"/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }
    //    // essa funcao esta sendo colocada aqui só para dar uma parada e você poder ver os inputs desabilitados
    //    //funcao que espera um tempo N, dado em milissegundos, e então chama uma função (callback). No caso, vamos usar 2000 ms = 2s
    //    //essa funcao foi construida somente para que voce possa ver os inputs ficando desabilitados. Nao precisa usar.
    //    function sleep(milliseconds) {
    //         const date = Date.now();
    //         let currentDate = null;
    //         do {
    //             currentDate = Date.now();
    //         } while (currentDate - date < milliseconds);
    //     }
    //     console.log("Mostra essa mensagem no console, primeiro!");
    //     sleep(2000)
    //     console.log("Pronto, você consegue ver seus inputs desabilitados!");
    //    //fim do codigo usado para ver os inputs desabiulitados

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = ()=>{ 

            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready

            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita??????
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }
    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready

    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */
    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    // http.onreadystatechange = (e)=>{
    //     if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
    //         console.log(http.responseText);

    //     }
    // }

    });  

}

function remove(index,_name,link){ //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({name:_name}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready

    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = ()=>{ 
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(nome, email, endereço, altura,idade,vote,rota){
    //Adiciona um dado novo
   
    let Nome= document.getElementById(nome).value;
    let EnderecoEmail= document.getElementById(email).value;
    let EnderecoCasa= document.getElementById(endereço).value;
    let Altura= document.getElementById(altura).value;
    let Idade= document.getElementById(idade).value;
    let Vota= document.getElementById(vote).value;

    if(
    validarNome(Nome) && 
    validarEmail(EnderecoEmail) && 
    validarIdade(Idade) && 
    validarVoto(Vota) && 
    validarAltura(Altura)
    ){
        

   const http = new XMLHttpRequest()
   http.open('POST', rota, true)
   http.setRequestHeader('Content-Type','application/json')

   dataToSend = JSON.stringify({name:Nome,email:EnderecoEmail,address:EnderecoCasa,heigth:Altura,age:Idade,vote:Vota })

   http.send(dataToSend)

   http.onload =()=>{

    if (http.readyState === 4 && http.status === 200) {
        console.log(`usuário ${Nome} adicionado`)
        window.location.href = '/cadastro'
    } else {
        console.log(`Ocorreu um erro ao tentar adicionar novo usuário: ${Nome}! Código do Erro: ${http.status}`); 
    }
   }
    }

    else{
        alert('Cadastro está incompleto')
    }

    function validarAltura(height){
        if(typeof Number(height == 'number' && (height<=3 && height>0))){
            Altura = String(Number(height).toFixed(2));
            //var Alt= Altura.toFixed(2);
            return height
        }
    
        alert(`Digite uma altura válida.`)
        return null
    }

}
//Funções de validação de cadastro

function validarNome(string){
    if(typeof string =='string' && string !==''){

        for(let i = 0; i<string.length; i++){
            if(string.charAt(i)!==' '){
            if(string.charAt(i)/1 || string.charAt(i) == 0){
                alert(`'${string}' é uma entrada inválida. (Contém números)`)
                return null
            }
            }
        }
        return string

    }

    alert(`Digite um nome válido.`)
    return null
}

function validarEmail(email){
    if(typeof email == 'string' && email !== ''){
        for(let i = 0; i<email.length; i++){
            if(email.charAt(i) == '@' ){
                for(let j = 0; j<email.length; j++){
                    if(email.charAt(j) == '.' ){
                        return email
                    }
                }
            }
        }
       
    }

    alert(`Digite um email válido. Para um email ser considerado válido ele deve conter '@' e '.'`)
    return null

}
function validarIdade(num){
    if(typeof Number(num) == 'number' && Number.isInteger(Number(num))){
        return num
    }

    alert(`Digite uma idade válida.`)
    return null
}


function validarVoto(vote){
    if(vote == 'true' || vote == 'false'){
        return vote
    }
    alert(`Resposta inválida. O campo vote apenas recebe valores 'true' ou 'false'`)
    return null
}

    function ListaUpdate(link){
        const http = new XMLHttpRequest(); 
        const urls= link;
    
        http.open("GET", urls, true); 
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.send();
    
        http.onload = ()=>{                
            if (http.readyState === 4 && http.status === 200) {
                var resp = JSON.parse(http.response);
                console.log(resp);
                if(listaCriada == false){
                    listaCriada = true;
                    createList(resp);
                }else{
                   var qtdRows = document.getElementById("lista").rows.length;
                   console.log("qtdRows: "+qtdRows);
    
                   /*
                   * CONSEGUI, MEU BRASILLLLLLL - by Vaneska SOUSAAAAAAA as 00:33 do dia 28/08/2021//Salve Vaneska valeu pelo help
                   */
                   for(contador = qtdRows-1; contador > 0; contador--){
                       document.getElementById('lista').deleteRow(contador);//caso ja exista uma lista ela apaga
                   }
    
                   createList(resp);
                }
                
            } else {
                console.log(`Erro ao adicionar usuario na lista: ${http.status}`); 
            } 
        }
        http.onreadystatechange = (e)=>{
            if (http.readyState === 4 && http.status === 200) { 
                console.log(http.responseText);//??????
            }
        }
    }
    
    function createList(resp){
        var tbody = document.querySelector('.Lista');
        resp.forEach(function (r) {
            var tr = document.createElement('tr');
            for (var campo in r) {
                var td = document.createElement('td');
                td.innerHTML = r[campo];
                tr.appendChild(td);
            };
            tbody.appendChild(tr);
        });
    }
    

    //Primeira parte: envia mensagem para o servidor pedindo uma listagem dos usuários

    //Segunda parte: apos recebimento da lista de usuarios, no formato JSON, colocar os usuarios na interface
    //let tableList = document.getElementById("lista");

    //let tr = document.createElement("tr");
    //let td = document.createElement("td");
    //let span = document.createElement("span");
    //let cont;
    //for(let cont=0;cont<datas.length;cont++){ 
        /* td.setAttribute(`data-index-row=${cont}`);
        span.innerHTML =  Object.keys(datas[cont])[0] //keys 0 - name, 1 - email
        span.className="show";
        td.appendChild(span);
        tr.appendChild(td);
        
        tableList.appendChild(tr);
    //} */


   




