var express  = require('express');
var app = express();

var net = require('net');
var server = require('http').Server(app);

var io = require('socket.io')(server)

var os = require('os');

// console.log("socket ok");

var insterfaces = os.networkInterfaces();
var addres = [];

for( var k in insterfaces) { //y 
    for(var k2 in insterfaces[k]) {//x
        var address = insterfaces[k][k2]
        if(address.family === 'IPv4' && !address.internal){
            addres.push(address.address)
            console.log(k.length);
        }
    }
}

var HOST = addres[0];
var PORT = 3000;

io.on('connection', function (socket){
    console.log(socket)
});


net.createServer(function(socket){
    console.log("DISPOSITIVO CONECTADO: " + socket.remoteAddress + ":"+socket.remotePort);
    socket.on('data', function(data){
        console.log(data);
    })
    
}).listen(PORT, HOST)
