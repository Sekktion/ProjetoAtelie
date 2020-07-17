const validaCPF = (cpf) => {
    if (!(cpf.length === 11))
        return false
    var i = 1, cont = 0
    while (i<11) {
        if (cpf[i] === cpf[0]){
            cont++
        }
        i++
    }
    if (cont === 10)
        return false
    i = 0
    var k = 10, val = 0
    while (i<9) {
        val = val + cpf[i]*k
        k--
        i++
    }
    val = (val*10) % 11
    if (val == cpf[9]) {
        i = 0, k = 2, val = 0
        while(i<9) {
            val = val + cpf[i]*k
            k++
            i++
        }
        val = (val*10) % 11
        if (val == cpf[10])
            return true
    }
    return false
}

module.exports = validaCPF