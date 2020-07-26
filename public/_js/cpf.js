const validaCPF = (cpf) => {
    var i = 0, k = 10
    let add = true
    var cpf2 = 0
    while (i<cpf.length || k>=0){
        add = true
        if (cpf[i] === '.' || cpf[i] === '-') {
            add = false
        }
        if (add === true) {
            cpf2 = cpf2 + cpf[i]*(10**k)
            k--
        }
        i++
    }
    cpf2 = cpf2.toString()
    
    if (!(cpf2.length === 11))
        return false
    i = 1
    var cont = 0
    while (i<11) {
        if (cpf2[i] === cpf2[0]){
            cont++
        }
        i++
    }
    if (cont === 10)
        return false
    i = 0
    k = 10 
    var val = 0
    while (i<9) {
        val = val + cpf2[i]*k
        k--
        i++
    }
    val = (val*10) % 11
    if (val == cpf2[9]) {
        i = 0, k = 2, val = 0
        while(i<9) {
            val = val + cpf2[i]*k
            k++
            i++
        }
        val = (val*10) % 11
        if (val == cpf2[10])
            return true
    }
    return false
}

module.exports = validaCPF