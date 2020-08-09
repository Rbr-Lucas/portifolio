$('.adc-materia').on('click', function(){
    let alteracao = $(this).attr('id')
    let nome = $(`#${alteracao}_materia #campo_input_nome`).val()
    let hora = $(`#${alteracao}_materia #campo_input_hora`).val()
    let nota_final = $(`#${alteracao}_materia #campo_input_nota`).val()
    if (alteracao == 'alterar') {
        nota_antiga = $(`#${alteracao}_materia #campo_input_nota_antiga`).val()
    } else {
        var nota_antiga = 0
    }
    if (validacao_input(nome, hora, nota_final, nota_antiga, alteracao)){
        hora = parseInt(hora)
        nota_final = parseFloat(nota_final)
        nota_antiga = parseFloat(nota_antiga)
        adicionar_tabela_historico(nome, alteracao, nota_final)
        adicionar_materia(hora, nota_final, nota_antiga, alteracao)
        $(`#${alteracao}_materia #campo_input_nome`).val('')
        $(`#${alteracao}_materia #campo_input_hora`).val('')
        $(`#${alteracao}_materia #campo_input_nota`).val('')
        if (alteracao == 'alterar') {
            nota_antiga = $(`#${alteracao}_materia #campo_input_nota_antiga`).val('')
        }
    }
})


let array_hora = []
let array_nota = []
let array_nota_antiga = []


function mostrador(){
    let somatorio_hora = 0
    let somatorio_nota = 0
    for (c of array_hora) {
        somatorio_hora += c
    }
    for (c of array_nota) {
        somatorio_nota += c
    }
    cr_atual = Math.round((somatorio_nota/somatorio_hora) * 100) / 100
    $('.cr_atualizado').html(`${cr_atual}`)
}
function adicionar_materia(hora, nota_final, nota_antiga, operacao){
    if (operacao == 'adicionar') {
        array_hora.push(hora)
        array_nota.push(nota_final * hora)
    } else if (operacao == 'remover') {
        array_hora.push(-hora)
        array_nota.push(-(nota_final * hora))
    } else if (operacao == 'alterar') {
        array_hora.push(0) 
        array_nota.push((nota_final - nota_antiga) * hora)
    }
    mostrador()
}

function remover_materia(linha){
    let posicao_no_historico = -1
    let achou = false
    // A posição começa do -1 pois a primeira linha é titulo e não deve ser contabilizada.
    $('.tabela-historico tr').each(function(){
        if (linha != $(this).html() && !achou){
            posicao_no_historico += 1
        } else {
            achou = true
        }
    })
    array_hora.splice(posicao_no_historico, 1)
    array_nota.splice(posicao_no_historico, 1)
    array_nota_antiga.splice(posicao_no_historico, 1)
    mostrador()
    $(linha).remove()
}