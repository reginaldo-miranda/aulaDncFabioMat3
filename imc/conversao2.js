const conversorFator = 0.01;

function classificateImc(imc){
    if (imc < 18.5){
        return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25){
        return "Peso normal"
    } else if (imc >= 25 && imc > 30){
        return "sobre peso"
    } else{
        return "Obesidade"
    }

}


function calculaImc(person){

    let height = person.height;
    let weight = person.weight;

    height *= conversorFator;

    let imc = weight / (height * height);
    const classification  = classificateImc(imc);
    console.log(classification);
    const result = "O resultado do IMC é de " + imc;
    const isHealthy = true;

    return {
        name: person.name,
        imc,
        classification,
        result,
        isHealthy,
    }
  
}

const person = {
    name:'Fabio',
    weight:80,
    height: 180,
    
} 
console.log(calculaImc(person));
