let primeira_alteracao = true
function validacao_input(nome, hora, nota_final, nota_antiga, alteracao){
    if (tem_erro) {
        $('.aviso-erro').remove()
        tem_erro = false
    }

    let nova_linha = `<td>${nome}</td><td>${alteracao}</td><td>${nota_final}</td>`
    let achou = false
    let tem_igual = false
    $('.tabela-historico tr').each(function(){
        let linha_verificacao = $(this).html()
        if (!achou){
            if (linha_verificacao == nova_linha){
                tem_igual = true
                achou = true
            }
        }
    })
    
    if (tem_igual){
        exibir_aviso(alteracao, '401')
        return false
    } else if (nome === '' || hora === '' || nota_final === '' || nota_antiga === ''){
        //erro de campo vazio
        exibir_aviso(alteracao, '101')
        return false
    } else if(hora > 4000 || hora <= 0) {
        exibir_aviso(alteracao, '102')
        // hora inválida
        return false
    } else if(nota_final > 10 || nota_final < 0 || nota_antiga > 10 || nota_antiga < 0) {
        // possui nota inválida
        exibir_aviso(alteracao, '103')
        return false
    } else if (alteracao != 'adicionar' && primeira_alteracao) {
        // O usuário tentou alterar média ou remover matéria sem adicionar nada antes
        exibir_aviso(alteracao, '201')
    } else if (alteracao_input_valida(hora, nota_final, nota_antiga, alteracao)){
        primeira_alteracao = false
        return true
    } else {
        return false
    }
}

function alteracao_input_valida(hora, nota, nota_antiga, operacao){
    if (tem_erro) {
        $('.aviso-erro').remove()
        tem_erro = false
    }
    let array_hora_copia = array_hora.slice()
    let array_nota_copia = array_nota.slice()

    if (operacao == 'adicionar') {
        array_hora_copia.push(hora)
        array_nota_copia.push(nota * hora)
    } else if (operacao == 'remover') {
        array_hora_copia.push(-hora)
        array_nota_copia.push(-(nota * hora))
    } else if (operacao == 'alterar') {
        array_hora_copia.push(0) 
        array_nota_copia.push((nota - nota_antiga) * hora)
    }

    let somatorio_hora = 0
    let somatorio_nota = 0
    for (c of array_hora_copia) {
        somatorio_hora += c
    }
    for (c of array_nota_copia) {
        somatorio_nota += c
    }
    cr_atual = Math.round((somatorio_nota/somatorio_hora) * 100) / 100

    if (cr_atual > 10 || cr_atual < 0) {
        exibir_aviso(operacao, '301')
        return false
    } else if(somatorio_hora <= 0) {
        exibir_aviso(operacao, '302')
        return false
    } else {
        return true
    }
}

function validacao_operacao(linha){
    if (tem_erro) {
        $('.aviso-erro').remove()
        tem_erro = false
    }
    let array_hora_copia = array_hora.slice()
    let array_nota_copia = array_nota.slice()
    let array_nota_antiga_copia = array_nota_antiga.slice()


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
    array_hora_copia.splice(posicao_no_historico, 1)
    array_nota_copia.splice(posicao_no_historico, 1)
    array_nota_antiga_copia.splice(posicao_no_historico, 1)

    let somatorio_hora = 0
    let somatorio_nota = 0
    for (c of array_hora_copia) {
        somatorio_hora += c
    }
    for (c of array_nota_copia) {
        somatorio_nota += c
    }
    cr_atual = Math.round((somatorio_nota/somatorio_hora) * 100) / 100
    if (somatorio_hora <= 0) {
        if (somatorio_nota != 0) {
            exibir_aviso('historico', '302')
            return false
        } else {
            // Para conseguir excluir caso tenha somente uma alteração
            let n_linhas = 0
            $('.tabela-historico tr').each(function(){
                n_linhas += 1
            })
            if (n_linhas > 2){
                exibir_aviso('historico', '302')
                return false
            } else {
                return true
            }
        }
    } else if (cr_atual > 10 || cr_atual < 0) {
        exibir_aviso('historico', '301')
        return false
    } else {
        return true
    }
}