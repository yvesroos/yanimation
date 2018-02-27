function YAnimation(arrAnimations, options){
  this.arrAnimations = arrAnimations || [];
  this.Time = {
    array: [],
    clear: function () {
      this.array.forEach(function (timer) {
        clearTimeout(timer);
      });
    }
  };
  this.times = 0;

  this.defaults = {
    delayBefore: 0,
    duration: 500,
    delayAfter: 0,
    loop: true,
	  clearAfterEnd: true,
    easing: 'linear',
    functionAfterLoop: function(){}
  }

  this.options = options || {};
    for (var opt in this.defaults)
        if (this.defaults.hasOwnProperty(opt) && !this.options.hasOwnProperty(opt))
            this.options[opt] = this.defaults[opt];

  this.options.loop = this.options.loop === true ? -1 : parseInt(this.options.loop);

  this.getEasing = function getEasing(easing){
    switch(easing){
      case 'ease': return [0.250, 0.100, 0.250, 1.000];
      case 'ease-in': return [0.420, 0.000, 1.000, 1.000];
      case 'ease-out': return [0.000, 0.000, 0.580, 1.000];
      case 'ease-in': return [0.420, 0.000, 0.580, 1.000];
      case 'easeInQuad': return [0.550, 0.085, 0.680, 0.530];
      case 'easeInCubic': return [0.550, 0.055, 0.675, 0.190];
      case 'easeInQuart': return [0.895, 0.030, 0.685, 0.220];
      case 'easeInQuint': return [0.755, 0.050, 0.855, 0.060];
      case 'easeInSine': return [0.470, 0.000, 0.745, 0.715];
      case 'easeInExpo': return [0.950, 0.050, 0.795, 0.035];
      case 'easeInCirc': return [0.600, 0.040, 0.980, 0.335];
      case 'easeInBack': return [0.600, -0.280,0.735, 0.045];
      case 'easeOutQuad': return [0.250, 0.460, 0.450, 0.940];
      case 'easeOutCubic': return [0.215, 0.610, 0.355, 1.000];
      case 'easeOutQuart': return [0.165, 0.840, 0.440, 1.000];
      case 'easeOutQuint': return [0.230, 1.000, 0.320, 1.000];
      case 'easeOutSine': return [0.390, 0.575, 0.565, 1.000];
      case 'easeOutExpo': return [0.190, 1.000, 0.220, 1.000];
      case 'easeOutCirc': return [0.075, 0.820, 0.165, 1.000];
      case 'easeOutBack': return [0.175, 0.885, 0.320, 1.275];
      case 'easeInOutQuad': return [0.455, 0.030, 0.515, 0.955];
      case 'easeInOutCubic': return [0.645, 0.045, 0.355, 1.000];
      case 'easeInOutQuart': return [0.770, 0.000, 0.175, 1.000];
      case 'easeInOutQuint': return [0.860, 0.000, 0.070, 1.000];
      case 'easeInOutSine': return [0.445, 0.050, 0.550, 0.950];
      case 'easeInOutExpo': return [1.000, 0.000, 0.000, 1.000];
      case 'easeInOutCirc': return [0.785, 0.135, 0.150, 0.860];
      case 'easeInOutBack': return [0.680, -0.550,0.265, 1.550];
      case 'spring1' : return [300, 8];
      case 'spring2' : return [600, 8];
      case 'oneStep': return [1];
      case 'twoStep': return [2];
      case 'threeStep': return [3];
      case 'fourStep': return [4];
      case 'fiveStep': return [5];
      case 'sixStep': return [6];
      default: return [0.250, 0.250, 0.750, 0.750];
    }
  };

  this.animate = function animate(arrObj, animation, onComplete) {
    animation = animation || {};
    for (var opt in this.defaults)
      if (this.defaults.hasOwnProperty(opt) && !animation.hasOwnProperty(opt))
        animation[opt] = this.defaults[opt];
    arrObj.Time.array.push(setTimeout(function (self) {
      var elem = document.querySelector(animation.id);
      if(animation.hasOwnProperty("action")){
        animation.action();
        arrObj.Time.array.push(setTimeout(function () {
          onComplete();
        }, animation.delayAfter));
      }else{
        Velocity(elem, animation.animations, {
          duration: animation.duration,
          easing: self.getEasing(animation.easing),
          complete: function () {
            arrObj.Time.array.push(setTimeout(function () {
              onComplete();
            }, animation.delayAfter));
          }
        });
        // jQueryAnimation.animate(animation.animations, animation.duration, );
      }
    }, animation.delayBefore, this));
  }

  this.startAnimation = function(){
    var self = this;
    if (typeof Velocity == 'undefined') {
      function getScript(url, success) {
        var script     = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0],
        done = false;
        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
          done = true;
            // callback function provided as param
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
          };
        };
        head.appendChild(script);
      };
      getScript('https://cdnjs.cloudflare.com/ajax/libs/velocity/1.4.0/velocity.min.js', function() {
        if (typeof Velocity=='undefined') {
          throw "Can't load Velocity!!!";
        } else {
          if (self.arrAnimations.length > 0) { self.nextAnimation(0); }
        }
      });
    } else {
      if (this.arrAnimations.length > 0) { this.nextAnimation(0); }
    };
  }

  this.nextAnimation = function (i) {
    var self = this;
    var animation = this.arrAnimations[i];
    if (i < this.arrAnimations.length) {
      if (Array.isArray(animation)) {
        var animationLength = animation.length;
        for (var ii = 0; ii < animationLength; ii++) {
          (function (contI) {
            var animationNested = animation[contI];
            self.animate(self, animationNested, function(){
              if (contI + 1 == animationLength) {
                self.nextAnimation(i + 1);
              }
            });
          })(ii)
        }
      } else {
        self.animate(self, animation, function(){
          self.nextAnimation(i + 1);
        });
      }
    } else {
      if(this.options.loop != -1 && this.times < this.options.loop){
		    this.options.functionAfterLoop();
		    this.restartAnimation();
		    this.times++;
      }else if(this.options.loop == -1){
		    this.restartAnimation();
      }else{
        this.stopAnimation();
      }
    }
  }

  this.removeStyles = function(){
	  loopThrough(this.arrAnimations);
  }

  this.stopAnimation = function(){
    this.Time.clear();
	  if(this.options.clearAfterEnd) this.removeStyles();
  }

  this.restartAnimation = function(){
    this.Time.clear();
	  this.removeStyles();
    this.startAnimation();
  }

  function loopThrough(obj){
    if(Array.isArray(obj)){
      obj.forEach(function(objChild){
        loopThrough(objChild);
      })
    }else{
      if(obj.hasOwnProperty("id")){
        document.querySelector(obj.id).removeAttribute('style');
        //$(obj.id).removeAttr('style');
      }
    }
  }

}