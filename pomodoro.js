const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on("ready", () => {
    client.user.setActivity("+help", { type: "LISTENING"})
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(" ");
    const comando = args.shift().toLowerCase(); // +"init" 50 5 lofi radio ... ... ...
    var min_foco = args[0];                   // +init "50" 5 lofi radio ... ... ...
    var min_pausa = args[1];                  // +init 50 "5" lofi radio ... ... ...
    
    var pesquisa = "";
    for (i in args) {
        if (i > 1) {
            pesquisa = pesquisa.concat(args[i] + " ");
        }
    }
    pesquisa = pesquisa.trim();                // +init 50 5 "lofi radio ... ... ..."

    
    

    if(comando === "init") {
        message.member.voice.channel.join(); 
    }
    else if(comando === "help") {
        message.channel.send("`+help`: lista de comandos\n`+init X Y`: inicia o bot e define o tempo de foco(`X`) e de pausa(`Y`) em minutos\n`+pause`: pausa o timer\n`+stop`: interrompe o timer\n`+disconnect`: desconecta o bot do canal");
    }
    else if(comando === "pause") {

    }
    else if(comando === "stop") {

    }
    else if(comando === "disconnect") {
        message.member.voice.channel.leave();
    }
});

client.login(config.token);

// ao entrar no server, se não tiver um canal de chat e de voz chamados "pomodoro", criar ambos

// formato comando init = +init {minutos concentração} {minutos pausa} {opcional| url de musica pro groovy iniciar junto com o pomodoro }
    // se o comando init for chamado por um usuário que estiver fora de um canal de voz ele vai:
        // entrar no canal de voz pomodoro
        // chamar o usuário que mandou o comando init
        // chamar o groovy
