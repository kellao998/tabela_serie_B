var objetoReferencia = {
    posicao: "",
    time: "",
    variacao_posicao: "",
    pontos: "",
    jogos: "",
    vitorias: "",
    empates: "",
    derrotas: "",
    gols_pro: "",
    gols_contra: "",
    saldo_gols: "",
    aproveitamento: "",
    ultimos_jogos: "",
}    

window.onload = function () {
    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/14/tabela",
        headers: { 'Authorization': 'Bearer test_76176f75a6477ac211a273071d2c5f' },
        contentType: 'json',
        dataType: 'json',
        success: function (voltarDados)
        {
            gerarDados(voltarDados);
        },
        done: function (msg)
        {

        },
        error: function (msg)
        {

        }
    });
}

function gerarDados(voltarDados)
{
    var tabela = document.getElementById("tabela")

    for (var i = 0; i < voltarDados.length; i++)
    {
        var tr = document.createElement("tr");

        tabela.appendChild(tr);
        for (var j = 0; j < Object.keys(voltarDados[i]).length; j++)
        {
            var td = document.createElement("td");

            var objectNames = Object.getOwnPropertyNames(objetoReferencia);

            if (objectNames[j] == "ultimos_jogos")
            {
                var ultimosJogos = criaDadosUltimosJogos(voltarDados[i][objectNames[j]]);
                
                td.appendChild(ultimosJogos);
            }
            else if(objectNames[j] == "time"){
                //cria td com o logo
                var tdLogo = retornaTdLogo(voltarDados[i][objectNames[j]].escudo)

                //coloca a descricao do time
                td.innerText = voltarDados[i][objectNames[j]].nome_popular;
                td.setAttribute("class", "nomeTime");

                //adiciona td logo na linha (tr)
                tr.appendChild(tdLogo);
            }
            else {
                td.innerText = voltarDados[i][objectNames[j]];
            }
            tr.appendChild(td);
        }
    }
}

function retornaTdLogo(escudo){
    var tdLogo = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("src", escudo);
    img.setAttribute("class", "logo");
    tdLogo.appendChild(img);
    return tdLogo;
}

function criaDadosUltimosJogos(dadosUltimosJogos){
    var divUltJogos = document.createElement("div");
    for (var k = 0; k < dadosUltimosJogos.length; k++) {
        var bola = document.createElement("span");
        bola.setAttribute("class", "ultJogos");

        if (dadosUltimosJogos[k] == "v")
        {
            bola.classList.add("vitoria");
        }
        else if (dadosUltimosJogos[k] == "d")
        {
            bola.classList.add("derrota");
        }
        else if (dadosUltimosJogos[k] == "e")
        {
            bola.classList.add("empate");
        }
        divUltJogos.append(bola);
    }       
    return divUltJogos; 
}


