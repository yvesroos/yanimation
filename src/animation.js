// Developed by Yves Roos Diehl
// This library is developed for facilitate the use of jQuery animate function

function YAnimation(arrAnimations, options){
  this.arrAnimations = arrAnimations || [];
  this.Time = {
    array: [],
    clear: function () {
      this.array.forEach(function (timer) {
        clearTimeout(timer);
      });
    }
  }

  this.defaults = {
    delayBefore: 0,
    duration: 500,
    delayAfter: 0,
    loop: true
  }

  this.options = options || {};
    for (var opt in this.defaults)
        if (this.defaults.hasOwnProperty(opt) && !this.options.hasOwnProperty(opt))
            this.options[opt] = this.defaults[opt];

  this.animate = function animate(arrObj, animation, onComplete) {

    animation = animation || {};
    for (var opt in this.defaults)
        if (this.defaults.hasOwnProperty(opt) && !animation.hasOwnProperty(opt))
            animation[opt] = this.defaults[opt];

    arrObj.Time.array.push(setTimeout(function () {
      var jQueryAnimation = $(animation.id);
      if(animation.hasOwnProperty('rotate')){
        jQueryAnimation.rotate(animation.rotate);
      }
      jQueryAnimation.animate(animation.animations, animation.duration, function () {
        arrObj.Time.array.push(setTimeout(function () {
          onComplete();
        }, animation.delayAfter));
      });
    }, animation.delayBefore));
  }

  this.startAnimation = function(){
    if (this.arrAnimations.length > 0) {
      this.nextAnimation(0);
    }
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
      if(this.options.loop){
        this.restartAnimation();
      }
    }
  }

  this.restartAnimation = function(){
    this.Time.clear();
    loopThrough(this.arrAnimations);
    this.startAnimation();
  }

  function loopThrough(obj){
    if(Array.isArray(obj)){
      obj.forEach(function(objChild){
        loopThrough(objChild);
      })
    }else{
      if(obj.hasOwnProperty("id")){
        $(obj.id).removeAttr('style');
      }
    }
  }

}

// Array.prototype.startAnimation = function () {
//   var animationsLength = this.length;
//   if (animationsLength > 0) {
//     var self = this;
//     var animation = self[0];

//     self.nextAnimation(0);
//   }
// }

// Array.prototype.nextAnimation = function (i) {
//   var self = this;
//   var animation = self[i];
//   var cont = i;

//   if (i + 1 < this.length) {
// 				if (Array.isArray(animation)) {
//       var animationLength = animation.length;
//       for (var ii = 0; ii < animationLength; ii++) {
//         (function (contI) {
//           var animationNested = animation[contI];
//           animate(self, animationNested, function(){
//             if (contI + 1 == animationLength) {
//               self.nextAnimation(i + 1);
//             }
//           });
//         })(ii)
//       }
// 				} else {
//           animate(self, animation, function(){
//             self.nextAnimation(cont + 1);
//           });
// 				}
//   } else {
// 				alert('fimmm!!');
//   }
// }