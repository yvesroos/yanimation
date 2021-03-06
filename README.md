YAnimation
=======================

Wrapper for jQuery animation. The main purpose of this library is to facilitate the creation of HTML banners

## Requirements

- [Velocity](http://velocityjs.org)

## Installation

Download the [latest release](https://github.com/yvesroos/yanimation/releases)

## Use

```javascript

var animations = [
  {
    id: "#i01", //Can be an id, class...
    delayBefore : 2000, //Delay before animations starts
    duration: 1000, //Duration of animations
    delayAfter: 1600, //Delay after animations
    easing: 'easeOutBack', //Easing name - Copied from https://matthewlein.com/ceaser/
    animations: {left:0,top:0, width:"440px"}
  },{
    [ //Use array when animations are in parallel
      {
        id: "#i02",
        duration: 1000,
        delayAfter: 1000,
        animations: {opacity:1},
      },{
        id: "#i03",
        duration: 1000,
        delayAfter: 1000,
        animations: {top: 0}
      }
    ]
  }
];

//Create a animation object
var options = {loop: false};
var movAnimations = new YAnimation(animations, options);

//Starts animation
movAnimations.startAnimation();

//Animation can be restarted
document.getElementById('banner').addEventListener("click", function(){
  movAnimations.restartAnimation();
});
```

## TODO

- [ ] Improve README XD
- [x] Remove jQuery dependency
- [ ] Modularize to implement other types of animation
- [ ] pause and continue animation
