
documnet.getElementById("heart").addEventListener("pointerup", function(event){
  navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
  .then(device => { /* … */ })
  .catch(error => { console.error(error); });
  
});
