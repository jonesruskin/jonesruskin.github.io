 // images setup
 const images = [
    "resources/img/bgs/construction.jpg",
    "resources/img/bgs/renovation.jpg",
    "resources/img/bgs/planning.jpg",
    "resources/img/bgs/interior-design.jpg",
  ];
  
  // content setup
  const texts = [
    ["CONSTRUCTION", "Know More"],
    ["RENOVATION", "Know More"],
    ["PLANNING AND CONSULTATION", "Know More"],
    ["INTERIOR DESIGNING", "Know More"]
  ]

rgbKineticSlider = new rgbKineticSlider({

    slideImages: images, // array of images > must be 1920 x 1080
    itemsTitles: texts, // array of titles / subtitles

    backgroundDisplacementSprite: 'resources/img/bgs/kinetic-bg-displace.jpg', // slide displacement image 
    cursorDisplacementSprite: 'resources/img/bgs/kinetic-cursor-displace.png', // cursor displacement image

    cursorImgEffect : true, // enable cursor effect
    cursorTextEffect : false, // enable cursor text effect
    cursorScaleIntensity : 0.65, // cursor effect intensity
    cursorMomentum : 0.14, // lower is slower

    swipe: true, // enable swipe
    swipeDistance : window.innerWidth * 0.4, // swipe distance - ex : 580
    swipeScaleIntensity: 2, // scale intensity during swipping

    slideTransitionDuration : 1, // transition duration
    transitionScaleIntensity : 30, // scale intensity during transition
    transitionScaleAmplitude : 160, // scale amplitude during transition

    nav: true, // enable navigation
    navElement: '.main-nav', // set nav class
    
    imagesRgbEffect : false, // enable img rgb effect
    imagesRgbIntensity : 0.9, // set img rgb intensity
    navImagesRgbIntensity : 80, // set img rgb intensity for regular nav 

    textsDisplay : true, // show title
    textsSubTitleDisplay : true, // show subtitles
    textsTiltEffect : true, // enable text tilt
    googleFonts : ['Open Sans:800', 'Open Sans:400'], // select google font to use
    buttonMode : true, // enable button mode for title
    textsRgbEffect : true, // enable text rgb effect
    textsRgbIntensity : 0.03, // set text rgb intensity
    navTextsRgbIntensity : 15, // set text rgb intensity for regular nav

    textTitleColor : 'white', // title color
    textTitleSize : 125, // title size
    mobileTextTitleSize : 80, // title size
    textTitleLetterspacing : 2, // title letterspacing

    textSubTitleColor : 'white', // subtitle color ex : 0x000000
    textSubTitleSize : 30, // subtitle size
    mobileTextSubTitleSize : 30, // mobile subtitle size
    textSubTitleLetterspacing : 2, // subtitle letter spacing
    textSubTitleOffsetTop : 100, // subtitle offset top
    mobileTextSubTitleOffsetTop : 100 // mobile subtitle offset top
});