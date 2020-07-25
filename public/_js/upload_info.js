function abrir(){
    var file = document.getElementById('file').files[0];
    var r = new FileReader()
    r.onload = function(e){
        var x = r.result 
        document.getElementById('img_up').src = x
    }
    
    if((innerWidth!=350)&&(innerHeight!=280)){
        innerWidth=innerWidth-435;
        innerHeight=innerHeight-461;
        alert('As dimensões da sua imagem foram alteradas')
        return true;
        r.readAsDataURL(file);
    } else {
        return true;
        r.readAsDataURL(file);
    }
}