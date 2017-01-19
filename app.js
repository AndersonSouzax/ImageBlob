var input = document.getElementById('file');
var element = document.getElementById('image');
var other = document.getElementById('other');

//Ao adicionar um arquivo no file input//
input.addEventListener('change',function(){

    //Pegando o arquivo adicionado
    var file = input.files;

    //Construindo blob e o leitor de arquivos
    var bl = new Blob(file);
    var read = new FileReader();

    /*Calculando a quantidade em bytes de cada pedaço da imagem,
     neste caso dividida em quatro pedaços a título de exemplo*/
    var quant = (bl.size / 4);
    //Array usado para armazenar os pedaços da imagem//
    var blobs = [];

    //cortando a imagem em quatro pedaços
    for(var i=0, at = 0; i < 4; i++){
      blobs.push(bl.slice(at,at+quant));
      at += quant;
    }

    //adicionando a url da imagem ao carregar o blob
    read.addEventListener('loadend', function(event){
        if(element.src == ''){
            element.src = event.target.result;
            //Juntando os pedaços da imagem para formar a mesma em outra tag//
            read.readAsDataURL(new Blob(blobs));
        }else{
            other.src = event.target.result;
        }
    });

    //Tratamento de erros
    read.addEventListener('onerror', function(){
        document.getElementById('erro').innerHTML = '<h1>Error loading the image </h1>';
    });
    //Formando url da imagem//
    read.readAsDataURL(bl);

},false);
