function DataWebSocketRequest(timeRange, density, sensors, ws) {

  ws.onopen = function() {
    ws.send([timeRange, density, sensors])
  }

  var dataObj;
  ws.onmessage = function(msg) {
    dataObj = msg.data
  }

  return dataObj
}

export default DataWebSocketRequest
