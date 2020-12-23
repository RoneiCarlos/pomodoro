const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

var situacao = 0;
var sit = situacao;
var rodando = false;
var min_foco = null;
var min_pausa = null;
var tempo = null;
mensagem = null;

function funcao(){
    if (rodando) {
        if (situacao == 1){
            if (tempo > 0) {
                tempo -= 1;
                mensagem.edit(`Tempo de foco restante: ${tempo}`);
                sit = situacao;
            }
            else {
                situacao = 2;
                tempo = min_pausa;
                mensagem.edit(`Tempo de pausa: ${tempo}`);
                sit = situacao;
            }
            return;
        } else if (situacao == 2) {
            if (tempo > 0) {
                tempo -= 1;
                mensagem.edit(`Tempo de pausa restante: ${tempo}`);
                sit = situacao;
            }
            else {
                situacao = 1;
                tempo = min_foco;
                mensagem.edit(`Tempo de foco: ${tempo}`);
                sit = situacao;
            }
            return;
        } 
    }
        
} 

var intervalo = setInterval(funcao, 1000);

client.on("ready", () => {
    client.user.setActivity("+help", { type: "LISTENING"})
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;
    

    const args = message.content.slice(config.prefix.length).trim().split(" ");
    const comando = args.shift().toLowerCase(); 
    min_foco = args[0];
    min_pausa = args[1];
    
    var pesquisa = "";
    for (i in args) {
        if (i > 1) {
            pesquisa = pesquisa.concat(args[i] + " ");
        }
    }
    pesquisa = pesquisa.trim();
    
    tempo = min_foco;

    if(comando === "init") {
        if (args[0] === undefined || args[1] === undefined) {
            mensagem = await message.channel.send("Comando `+init` precisa de argumentos completos.\nDigite `+help` para exemplo.");
        } else {
            situacao = 1;
            rodando = true;
            mensagem = await message.channel.send(`${message.author} Tempo de foco: ${min_foco} tempo de pausa: ${min_pausa}`);
            intervalo;
        }
        
    }
    else if(comando === "stop") {
        if (!rodando) {
            mensagem = await message.channel.send("Comando `+stop` só funciona se houver um pomodoro ativo.");
        } else {
            rodando = false;
            clearInterval(intervalo);
            mensagem = await message.channel.send(`${message.author} Timer encerrado!`);
        }
    }
    else if(comando === "help") {
        message.channel.send("`+help`: lista de comandos\n`+init X Y`: inicia o bot e define o tempo de foco(`X`) e de pausa(`Y`) em minutos\n`+stop`: interrompe o timer e desconecta do canal de voz");
    }
    else {
        message.channel.send("Comando inválido\n`+help`: lista de comandos\n`+init X Y`: inicia o bot e define o tempo de foco(`X`) e de pausa(`Y`) em minutos\n`+stop`: interrompe o timer e desconecta do canal de voz");
    }
});

client.login(config.token);