
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
if (navigator.getUserMedia){
navigator.getUserMedia({video: true, audio: true},function(stream){
    
    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator : location.hash === '#init',
        trickle: false,
        stream: stream
    });

    peer.on('signal',function(data){
        document.getElementById('yourId').value = JSON.stringify(data)  
    })

    document.getElementById('connect').addEventListener('click',function(){
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId);
    })

    document.getElementById('send').addEventListener('click',function(){
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
        
        document.getElementById("yourMessage").value = "";
    })

    peer.on('data',function(data){
        document.getElementById('messages').textContent += data + '\n'
        
    })
  peer.on('stream',function(stream){
      var video = document.createElement('video')
      document.getElementById('videoContainer').appendChild(video)
      
      video.src = window.URL.createObjectURL(stream)
      video.play()
  })  
}, function(err){
    console.log(err)
}
)
}else{
    alert("Getusermedia not supported")
}