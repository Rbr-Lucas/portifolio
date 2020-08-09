$('.btn-menu').click(function(){
    $('.nav-menu').fadeIn(400);
})
$('.btn-close').click(function(){
    $('.nav-menu').fadeOut(400);
})

$('.btn-time').click(function(){
        if ($(this).attr('class') == 'btn-time start') {
            $(this).attr('class', 'btn-time stop').text('STOP')
            the_timer()
        } else if ($(this).attr('class') == 'btn-time stop'){
            $(this).attr('class', 'btn-time start').text('START')
            clearInterval(repeticoes)
        } else if ($(this).attr('class') == 'btn-time break'){
            $(this).attr('class', 'btn-time start').text('START')
            clearInterval(repeticoes)
        }
})

var minutos_original = 0
var segundos_original = 0
var n_ciclos = 0
var tempo_pausas = 0
var n_repeticoes = 0
$('.btn-ok').click(function(){
    n_repeticoes = 0
    n_ciclos = parseInt($('#n_ciclos').val())
    minutos_original = parseInt($('#tEstudos').val().slice(0, 2))
    segundos_original = parseInt($('#tEstudos').val().slice(3, 5))
    if (segundos_original < 10) {
        $('.segundos').text('0' + String(segundos_original))
    } else {
        $('.segundos').text(segundos_original)
    }
    if (minutos_original < 10) {
        $('.minutos').text('0' + String(minutos_original))
    } else {
        $('.minutos').text(minutos_original)
    }
})


function the_timer() {
    var terminou = false
    var minutos = minutos_original
    var segundos = segundos_original
    if (segundos < 10) {
        $('.segundos').text('0' + String(segundos))
    } else {
        $('.segundos').text(segundos)
    }
    if (minutos < 10) {
        $('.minutos').text('0' + String(minutos))
    } else {
        $('.minutos').text(minutos)
    }
    repeticoes = setInterval(function(){
        if (segundos > 0) {
            segundos = segundos -1
            if (segundos < 10) {
                $('.segundos').text('0' + String(segundos))
            } else {
                $('.segundos').text(segundos)
            }
        } else if (minutos != 0) {
            minutos = minutos -1
            if (minutos < 10) {
                $('.minutos').text('0' + String(minutos))
            } else {
                $('.minutos').text(minutos)
            }
            segundos = 59
            $('.segundos').text(segundos)
        } else {
            n_repeticoes += 1
            clearInterval(repeticoes)
            if (n_repeticoes < n_ciclos) {
                $('.btn-time').attr('class', 'btn-time break').text('REPOUSO')
            } else {
                $('.btn-time').attr('class', 'btn-time start').text('START')
            }
        }
        if ($('.btn-time').text() == 'REPOUSO') {
            let minutos = parseInt($('#tPausa').val().slice(0, 2))
            let segundos = parseInt($('#tPausa').val().slice(3, 5))
            if (segundos < 10) {
                $('.segundos').text('0' + String(segundos))
            } else {
                $('.segundos').text(segundos)
            }
            if (minutos < 10) {
                $('.minutos').text('0' + String(minutos))
            } else {
                $('.minutos').text(minutos)
            }
            repeticoes = setInterval(function(){
                if (segundos > 0) {
                    segundos = segundos -1
                    if (segundos < 10) {
                        $('.segundos').text('0' + String(segundos))
                    } else {
                        $('.segundos').text(segundos)
                    }
                } else if (minutos != 0) {
                    minutos = minutos -1
                    if (minutos < 10) {
                        $('.minutos').text('0' + String(minutos))
                    } else {
                        $('.minutos').text(minutos)
                    }
                    segundos = 59
                    $('.segundos').text(segundos)
                } else {
                    clearInterval(repeticoes)
                    $('.btn-time').attr('class', 'btn-time stop').text('STOP')
                }
                if (($('.btn-time').text() == 'STOP')) {
                    the_timer()
                }
            }, 1000)
        }
    }, 1000)
}