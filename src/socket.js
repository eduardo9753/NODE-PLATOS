module.exports = (io) => {
    io.on('connection' , (socket) => {
        console.log('new socket connected');

       socket.on('userCoordinates' , (coords) => {//ENCUCHANDO DATOS(1)
           console.log('Coor Initial: ' , coords);
           socket.broadcast.emit('newUserCoordinates' , coords);//EMITIENDO DATOS(2) 
       });
    });
};