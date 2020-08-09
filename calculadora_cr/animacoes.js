let mostrando_historico = false
$('.btn-historico').on('click', function(){
    if (!mostrando_historico) {
        $('.div-historico').css('background-color', '#df2b2b')
        $('.seta-historico').html('<i class="fas fa-arrow-up"></i>')
        $('.div-historico').css('box-shadow', '0 0.7em 8px #d3d2d2')
        mostrando_historico = true
    } else {
        $('.div-historico').css('background-color', 'rgba(0, 0, 0, 0)')
        $('.seta-historico').html('<i class="fas fa-arrow-down"></i>')
        $('.div-historico').css('box-shadow', '0 0 0 rgba(0, 0, 0, 0)')
        mostrando_historico = false
    }
    $('.div-tabela-historico').slideToggle(300)
})
$('.campos_alteracoes').on('click', function(){
    if (mostrando_historico) {
        $('.div-historico').css('background-color', 'rgba(0, 0, 0, 0)')
        $('.seta-historico').html('<i class="fas fa-arrow-down"></i>')
        $('.div-historico').css('box-shadow', '0 0 0 rgba(0, 0, 0, 0)')
        mostrando_historico = false
        $('.div-tabela-historico').slideToggle(300)
    }
})


if($(window).width() >= 720){
    $('.dica-historico').html('Dê um clique duplo na alteração para apaga-la')
    $(document).on('dblclick', '.tabela-historico tr', function(){
        let linha = $(this)
        if ($(linha).attr('class') != 'primeira-linha' && $(linha).attr('class') != 'primeira_linha_vazia'){
            if (validacao_operacao($(linha).html())){
                remover_materia($(linha).html())
                $(linha).remove()
                let n_linhas = 0
                $('.tabela-historico tr').each(function(){
                    n_linhas += 1
                })
                if (n_linhas == 1) {
                    primeira_linha_existe = true
                    let nova_linha_vazia = document.createElement('tr')
                    $(nova_linha_vazia).addClass('primeira_linha_vazia')
                    $(nova_linha_vazia).html("<td class='nome'><i>VAZIO</i></td><td class='alteracao'><i>NENHUMA</i></td><td class='nota'><i>X</i></td>")
                    $('.tabela-historico').append(nova_linha_vazia)
                    $('.cr_atualizado').html('VAZIO')
                }
            }
        }
    })
} else{
    $(document).on('touchstart', '.tabela-historico tr', function(){
        if ($(this).attr('class') != 'primeira-linha' && $(this).attr('class') != 'primeira_linha_vazia'){
            let contador = 0
            let linha = $(this)
            var tempo_apagar = setInterval(function(){
                contador += 1
                if (contador == 2){
                    if (validacao_operacao($(linha).html())){
                        remover_materia($(linha).html())
                        $(linha).remove()
                        let n_linhas = 0
                        $('.tabela-historico tr').each(function(){
                            n_linhas += 1
                        })
                        if (n_linhas == 1) {
                            primeira_linha_existe = true
                            let nova_linha_vazia = document.createElement('tr')
                            $(nova_linha_vazia).addClass('primeira_linha_vazia')
                            $(nova_linha_vazia).html("<td class='nome'><i>VAZIO</i></td><td class='alteracao'><i>NENHUMA</i></td><td class='nota'><i>X</i></td>")
                            $('.tabela-historico').append(nova_linha_vazia)
                            $('.cr_atualizado').html('VAZIO')
                        }
                    }
                    clearInterval(tempo_apagar)
                }
            },350)
            $(this).on('touchend', function(){
                clearInterval(tempo_apagar)
            })
        }
    })
    $(document).on('mousedown', '.tabela-historico tr', function(){
        if ($(this).attr('class') != 'primeira-linha' && $(this).attr('class') != 'primeira_linha_vazia'){
            let contador = 0
            let linha = $(this)
            var tempo_apagar = setInterval(function(){
                contador += 1
                if (contador == 2){
                    if (validacao_operacao($(linha).html())){
                        remover_materia($(linha).html())
                        $(linha).remove()
                        let n_linhas = 0
                        $('.tabela-historico tr').each(function(){
                            n_linhas += 1
                        })
                        if (n_linhas == 1) {
                            primeira_linha_existe = true
                            let nova_linha_vazia = document.createElement('tr')
                            $(nova_linha_vazia).addClass('primeira_linha_vazia')
                            $(nova_linha_vazia).html("<td class='nome'><i>VAZIO</i></td><td class='alteracao'><i>NENHUMA</i></td><td class='nota'><i>X</i></td>")
                            $('.tabela-historico').append(nova_linha_vazia)
                            $('.cr_atualizado').html('VAZIO')
                        }
                    }
                    clearInterval(tempo_apagar)
                }
            },350)
            $(this).mouseup(function(){
                clearInterval(tempo_apagar)
            })
        }
    })
}

$('.btn-menu').on('click', function(){
    $('.nav-menu').fadeIn(100);
})
$('.btn-close').on('click', function(){
    $('.nav-menu').fadeOut(100);
})
$('.btn-adicionar').on('click', function(){
    $('#adicionar_materia').slideToggle(300)
    $('#remover_materia').hide()
    $('#alterar_materia').hide()
})
$('.btn-remover').on('click', function(){
    $('#adicionar_materia').hide()
    $('#remover_materia').slideToggle(300)
    $('#alterar_materia').hide()
})
$('.btn-alterar').on('click', function(){
    $('#adicionar_materia').hide()
    $('#remover_materia').hide()
    $('#alterar_materia').slideToggle(300)
})

let primeira_linha_existe = true
function adicionar_tabela_historico(nome, alteracao, nota_final) {
    if (primeira_linha_existe){
        primeira_linha_existe = false
        $('.primeira_linha_vazia').remove();
    }
    let nova_linha = document.createElement('tr')
    let c = 0
    for (c; c < 3; c++){
        if (c==0) {
            let novo_td = document.createElement('td')
            novo_td.innerHTML = `${nome}`
            $(nova_linha).append(novo_td)
        } else if (c==1) {
            let novo_td = document.createElement('td')
            novo_td.innerHTML = `${alteracao}`
            $(nova_linha).append(novo_td)
        } else if (c==2) {
            let novo_td = document.createElement('td')
            novo_td.innerHTML = `${nota_final}`
            $(nova_linha).append(novo_td)
        }
    }
    $('.tabela-historico').append(nova_linha)
}

let tem_erro = false
function exibir_aviso(alteracao, codigo){
    tem_erro = true
    let aviso = document.createElement('p')
    $(aviso).addClass('aviso-erro')
    switch(codigo) {
        case '101':
            $(aviso).html('ERRO [101] Por favor, preencha todos os campos.')
            break
        case '102':
            $(aviso).html('ERRO [102] Carga horária/Créditos inválidos')
            break
        case '103':
            $(aviso).html('ERRO [103] Nota inválida')
            break
        case '201':
            $(aviso).html('ERRO [201] Necessário que adicione matérias para depois poder altera-las.')
            break
        case '301':
            $(aviso).html('[ERRO: 301] Alteração inválida. CR estaria fora do intervalo correto. <a href="#">Saiba mais</a>')
            break
        case '302':
            $(aviso).html('[ERRO: 302] Alteração inválida. Somatório de horas seria menor ou igual a zero. <a href="#">Saiba mais</a>')
            break
        case '401':
            $(aviso).html('[ERRO 401] Alteração inválida. Operação já existente no histórico. <a href="#">Saiba mais</a>')
            break
    }
    if (alteracao != 'historico') {
        $(`#${alteracao}_materia`).append(aviso)
    } else {
        if ($(window).width() < 720) {
            $(aviso).addClass('aviso-300')
        }
        $('.div-tabela-historico').append(aviso)
    }
}

/* VALIDANDO ENTRADAS COM ENTER */
$('.input_alteracoes').on('keypress', function(key){
    let id = $(this).attr('id')
    if (key.which == 13){
        if ($(`#${id} #campo_input_nome`).val() == ''){
            $(`#${id} #campo_input_nome`).focus()
        } else if ($(`#${id} #campo_input_hora`).val() == ''){
            $(`#${id} #campo_input_hora`).focus()
        } else if (id == 'alterar_materia' && $(`#${id} #campo_input_nota_antiga`).val() == ''){
            $(`#${id} #campo_input_nota_antiga`).focus()
        } else if ($(`#${id} #campo_input_nota`).val() == ''){
            $(`#${id} #campo_input_nota`).focus()
        } else {
            $('.adc-materia').click()
        }
    }
})