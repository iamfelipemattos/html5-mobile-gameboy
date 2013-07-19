if ( navigator.userAgent.toLowerCase().indexOf('webkit') == -1) {
	// if NOT in WebKit, need phony connect() and disconnect()
	HTMLAudioElement.prototype.connect = function() {
	}
	HTMLAudioElement.prototype.disconnect = function() {
	}
} else {
// set up defaults
HTMLAudioElement.prototype.mozSampleRate = 41000;
HTMLAudioElement.prototype.mozChannels = 2;
HTMLAudioElement.prototype.mozFrameBufferLength = 8196;
// local buffer
HTMLAudioElement.prototype.seriesbuffer = null;
HTMLAudioElement.prototype.parallelbuffer = null;
HTMLAudioElement.prototype.context = null;
HTMLAudioElement.prototype.node = null;
HTMLAudioElement.prototype.mozcompat = true;
// mozSetup method
HTMLAudioElement.prototype.mozSetup = function(channels,samplerate) {
	var that = this;
  // create things as appropriate for Webkit
  this.context  = new webkitAudioContext();
  this.node = this.context.createJavaScriptNode(this.mozFramBufferLength, 1, 1);
  this.node.connect(this.context.destination);
  this.offset=0;
  // make associations with Mozilla fields
  this.mozSampleRate = this.context.sampleRate = samplerate;
  this.mozChannels = this.context.channels = channels;
  this.mozFrameBufferLength = this.node.bufferSize;
  this.parallelbuffer = new Array(this.mozChannels);
  // register event handler for Webkit to fire Mozilla event
  this.node.onaudioprocess = function(e) { that.process(e); }
  // void return
}
HTMLAudioElement.prototype.process = function(e) {
    // modify event with Mozilla fields
    e.type = "MozAudioAvailable";
    e.time = e.playbackTime;
    // use series buffer for event framebuffer
    e.framebuffer = this.seriesbuffer;
    // get buffer channels in parallel
    for (var k=0;k<this.mozChannels;k++) 
      this.parallelbuffer[k] = e.outputBuffer.getChannelData(k);
}
// mozCurrentSampleOffset method
HTMLAudioElement.prototype.offset = 0;
HTMLAudioElement.prototype.mozCurrentSampleOffset = function() { // returns int
  return this.offset;
}
// mozWriteAudio method
HTMLAudioElement.prototype.mozWriteAudio = function(buffer) { // returns int
  // given buffer in series, store it
  this.seriesbuffer = buffer;
  // now slit into parallel buffers
  var len = buffer.length / this.mozChannels;
  for (var i=0;i<len;i++) for (var j=0; j<this.mozChannels; j++) 
	  this.parallelbuffer[j][i] = buffer[i*this.mozChannels+j];
  // adjust offset and return length written
  this.offset += len;
  return len;
}
HTMLAudioElement.prototype.connect = function() {
	  this.node.connect(this.context.destination);	
}
HTMLAudioElement.prototype.disconnect = function() {
	  this.node.disconnect();	
}
}