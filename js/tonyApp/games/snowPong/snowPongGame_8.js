(function () {
var line1;
var arrow;

var textDebag;

var angleVector_AxisX;
var vectorSum;
var arcsin;

var entityGroup;
var snowGroup;
var snounGroup;

var explosions;
var explosion;

var aimsGroup;

var gifts;
var gift;

//music
var mainSound;
var indicator;
var iceCrack;
var snow_poof;
var rollingBall;
var wood_hit;
var stoun_hit;
var iceWall_hit;
var starSong;
//=============

var prevScale = 0;

var tempParametr;

var checkover;

var begin = false;

var saveBox = {};

///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
var starTable;

var scoreStarsImage;
var scoreHartImage;
var scoreTimerImage;

//переменные

var scoreStars = 0;
var counterStarterTime = 0;
var starterTime = 0;
var health = 3;

var realTimeNow = '-';

//кнопки управления
var replayGame;
var exitGame;
var doReplayGame;
var doExitGame;

var b_music_1;
var b_music_2;
var layerUnderMenu;

//условие победы
var cracksDestroy = 1;
//================

var saveBox = { time: 0, hp: 0, stars: 0, score: 0, mod: 1};

window.snowPongGame_8 = {

    preload: function () {
        gameLoad().spritesheet('arrow_indicator', 'assets/img/snowPong/arrow.png', 70, 30);

        gameLoad().image('fonPongGame', 'assets/img/snowPong/fon.png');
        gameLoad().image('snowStuck', 'assets/img/snowPong/snowStuck.png');
        gameLoad().image('iceBrick', 'assets/img/snowPong/iceBrick.png');
        gameLoad().image('crack', 'assets/img/snowPong/crack.png');
        gameLoad().image('stone', 'assets/img/snowPong/stone.png');
        gameLoad().image('iceWall', 'assets/img/snowPong/iceWall.png');
        gameLoad().image('woodStick', 'assets/img/snowPong/woodStick.png');

        gameLoad().image('smallSnow', 'assets/img/smallSnow.png');

        gameLoad().audio('mainSound', 'assets/audio/snowPongGame/Broke_For_Free_-_05_-_Something_Elated(main_sound).mp3');
        gameLoad().audio('iceCrack', 'assets/audio/snowPongGame/iceCrack_cuted.mp3');
        gameLoad().audio('rollingBall', 'assets/audio/snowPongGame/MarbleRollonWood_cuted.mp3');
        gameLoad().audio('indicator', 'assets/audio/snowPongGame/Rezinovyi_shar_trut_skrepit_cuted.mp3');
        gameLoad().audio('snow_poof', 'assets/audio/snowPongGame/Snow_cuted.mp3');
        gameLoad().audio('stoun_hit', 'assets/audio/snowPongGame/StounSong_cuted.mp3');
        gameLoad().audio('wood_hit', 'assets/audio/snowPongGame/Metal_Strike_on_Wood_cuted.mp3');
        gameLoad().audio('iceWall', 'assets/audio/snowPongGame/iceWall_cuted.mp3');

       // gameLoad().spritesheet('HartBar', 'assets/img/heartmenu.png', 40, 40);
    },
    create: function (){
      // button = this.add.button(300, 150, 'button_play', this.startGame, this, 1, 0 ,2);
        gameAdd().image(0, 0, 'fonPongGame');
        // gameAdd().image(0, 0, 'iceWall');
        // gameAdd().button(600, 250, 'button_play', replay, this, 1, 0 ,2);
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // snow = gameAdd().sprite(700, 150, 'smallSnow');
        // game.physics.arcade.enable(snow);
        // //snow.physicsBodyType = Phaser.Physics.ARCADE;
        snow_poof = gameAdd().audio('snow_poof');
        indicator = gameAdd().audio('indicator');
        mainSound = gameAdd().audio('snowBallGame_mainTrack');
        iceCrack = gameAdd().audio('iceCrack');
        rollingBall = gameAdd().audio('rollingBall');
        wood_hit =gameAdd().audio('wood_hit');
        stoun_hit= gameAdd().audio('stoun_hit');
        iceWall_hit = gameAdd().audio('iceWall');
        starSong = gameAdd().audio('starSong');

        mainSound.volume = 0.5;
        if (!mainSound.isPlaying)
        {
          //mainSound.play();
        }

        // //snow.enableBody = true;
        // snow.body.immovable = true;
//Группа подарков=======================================
        gifts = gameAdd().group();
        gifts.enableBody = true;
        //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        gifts.createMultiple(8, 'star');
        gifts.setAll('anchor.x', 0.5);
        gifts.setAll('anchor.y', 0.5);
        gifts.forEach(
          function (invader){
            invader.animations.add('play');
          }, this);

        var gift_1 = gifts.getFirstExists(false);
        gift_1.reset(270, 210);
        gift_1.animations.play('play', 12,  true ,true);

          //===========================
//Группы препятствий и прочих штук на карте==================
        entityGroup = gameAdd().group();
        entityGroup.enableBody = true;
        entityGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var entity_1 = entityGroup.create(30, 200, 'woodStick');
        entity_1.body.immovable = true;
        entity_1.anchor.setTo(0.5, 0.5);
        entity_1.type = 'wood';
        // entity_1.angle = 90;
        // entity_1.scale.setTo(0.1, 0.1);
        var entity_2 = entityGroup.create(350, 220, 'stone');
        entity_2.body.immovable = true;
        entity_2.anchor.setTo(0.5, 0.5);
        entity_2.type = 'stone';
        // // entity_2.angle = 90;
        // var entity_3 = entityGroup.create(120, 460, 'snowStuck');
        // entity_3.body.immovable = true;
        // entity_3.anchor.setTo(0.5, 0.5);
        var iceWall = entityGroup.create(0, 0, 'iceWall');
        iceWall.body.immovable = true;
        iceWall.type = 'iceWall';
//=============Группа снежных препятствий==================================
        snowGroup = gameAdd().group();
        snowGroup.enableBody = true;

        var snow_1 = snowGroup.create(120, 460, 'snowStuck');
        snow_1.anchor.setTo(0.5, 0.5);


//Группа целей====================================================
        aimsGroup = gameAdd().group();
        aimsGroup.enableBody = true;
        aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var aim_1 = aimsGroup.create(300, 7, 'crack');
        aim_1.body.immovable = true;
        aim_1.anchor.setTo(0.5, 0);
        //aim_1.scale.setTo(0.5, 0.5);
        //aim_1.tint = 0xFF0000;
//===============================================================

        explosions = gameAdd().group();
        explosions.createMultiple(30, 'kaboom');
        // explosions.setAll('anchor.x', 0.5);
        // explosions.setAll('anchor.y', 0.5);
        // explosions.animations.add('kaboom');
        explosions.forEach( function (invader){
          invader.anchor.x =  0.5;
          invader.anchor.y =  0.5;
          invader.animations.add('kaboom');
        }, this);
        // bigPolarMen.createMultiple(30, 'bigPolarMan');
        // bigPolarMen.setAll('anchor.x', 0.5);
        // bigPolarMen.setAll('anchor.y', 0.5);
        // bigPolarMen.forEach(
        //   function (invader){
        //     invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        //     animBigPolar = invader.animations.add('throw',  [12, 13, 14], 3, false);
        //
        //     //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        //   }, this);
        iceBall.sprite = gameAdd().sprite(iceBall.startX, iceBall.startY, 'bigSnowBaall');//110 x 110 px
        gamePhysics().arcade.enable(iceBall.sprite);
        iceBall.sprite.body.bounce.setTo(0.8, 0.8);
        iceBall.sprite.anchor.x = 0.5;
        iceBall.sprite.anchor.y = 0.5;
        iceBall.sprite.scale.setTo(0.5, 0.5);
        iceBall.sprite.animations.add('bigSnowBaall');
        iceBall.sprite.outOfBoundsKill = true;
        iceBall.sprite.checkWorldBounds = true;
        iceBall.sprite.tempYmax  = 200;
        iceBall.sprite.tempYmin = -200;
        iceBall.sprite.tempXmax  = 200;
        iceBall.sprite.tempXmin = -200;
        iceBall.sprite.vectorVelocitiMax = Math.sqrt(iceBall.velocityRatio*iceBall.velocityRatio*(iceBall.sprite.tempXmax*iceBall.sprite.tempXmax + iceBall.sprite.tempYmax*iceBall.sprite.tempYmax));

        iceBall.sprite.arrow_1 = this.add.button(iceBall.sprite.x + 80, iceBall.sprite.y, 'arrow',goRight, this, 1, 2 ,0);
        iceBall.sprite.arrow_1.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_1.scale.setTo(0.7, 0.7);
        iceBall.sprite.arrow_2 = this.add.button(iceBall.sprite.x - 80, iceBall.sprite.y, 'arrow_2', goLeft, this, 1, 2 ,0);
        iceBall.sprite.arrow_2.anchor.setTo(0.5, 0.5);
        iceBall.sprite.arrow_2.scale.setTo(0.7, 0.7);

        iceBall.recentX = iceBall.startX;
        iceBall.recentY = iceBall.startY;

        iceBall.status = 'wait';


        textDebag = gameAdd().text(220, 200, '', { fontSize: '32px', fill: 'red' , font: 'mainFont'});
        //iceBall.line = new Phaser.Line(100,15,500,400);
        //индикатор броска
        arrow = gameAdd().sprite(iceBall.startX, iceBall.startY, 'arrow_indicator');
        arrow.anchor.y = 0.5;
        arrow.anchor.x = 1;
        arrow.animations.add('arrow_indicator');
        arrow.alpha = 0;
        //arrow.angle = -135;

        //line1 = new Phaser.Line(0, 0, 800, 500);

        // game.debug.text("Drag the handles", 32, 550);
        //game.debug.lineInfo(line1, 32, 32);

        iceBall.minX = iceBall.sprite.x - iceBall.sprite.width/2;
        iceBall.maxX = iceBall.sprite.x + iceBall.sprite.width/2;

        iceBall.minY = iceBall.sprite.y - iceBall.sprite.height/2;
        iceBall.maxY = iceBall.sprite.y + iceBall.sprite.height/2;

        iceBall.manipulator = gameInput().mousePointer,
        gamePhysics().enable(iceBall.sprite, Phaser.Physics.ARCADE);
        // game.physics.arcade.enable(iceBall.sprite);



        //Табло================================================
        gameAdd().image(0, 0, 'underLyaer');

        scoreStarsImage = gameAdd().sprite (20 , 20, 'starBar');
        scoreStarsImage.scale.setTo(1, 1);
        scoreStarsImage.anchor.x = 0.5;
        scoreStarsImage.anchor.y = 0.5;
        scoreStarsImage.alpha = 1;
        scoreStarsImage.animations.add('starBar');
        starTable = gameAdd().text(50, 20, '-', { fontSize: '32px', fill: '#7C4111', font: 'mainFont' });
        starTable.anchor.x = 0.5;
        starTable.anchor.y = 0.5;
        //Сердце
        scoreHartImage = gameAdd().sprite (97 , 20, 'HartBar');
        scoreHartImage.scale.setTo(1, 1);
        scoreHartImage.anchor.x = 0.5;
        scoreHartImage.anchor.y = 0.5;
        scoreHartImage.alpha = 1;
        scoreHartImage.animations.add('hartBar');
        healthTable = gameAdd().text(132, 20, '-', { fontSize: '32px', fill: '#91294E', font: 'mainFont' });
        healthTable.anchor.x = 0.5;
        healthTable.anchor.y = 0.5;
        //часы
        scoreTimerImage =  gameAdd().sprite (178 , 20, 'timeBar');
        scoreTimerImage.scale.setTo(1, 1);
        scoreTimerImage.anchor.x = 0.5;
        scoreTimerImage.anchor.y = 0.5;
        scoreTimerImage.alpha = 1;
        scoreTimerImage.animations.add('timeBar');
        levelTable = gameAdd().text(213, 20,  '-', { fontSize: '32px', fill: '#8E3E36', font: 'mainFont'  });
        levelTable.anchor.x = 0.5;
        levelTable.anchor.y = 0.5;

        //=================================================
        //кнопки управления============
        layerUnderMenu = gameAdd().image(800, 0, 'underLyaerInGame');
        layerUnderMenu.anchor.x = 1;

        //управление музыкой==========================
        b_music_1 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this,  0, 2 ,1);
        b_music_1.anchor.setTo(0, 0.5);

        b_music_2 = gameAdd().button(layerUnderMenu.left + 2, layerUnderMenu.centerY, 'turnSound_new', this.turnMusic, this, 3, 5 ,4);
        b_music_2.anchor.setTo(0, 0.5);

        replayGame = gameAdd().button(b_music_1.right - 2, layerUnderMenu.centerY, 'replay_game_new', replay, this, 1, 2 ,0);
        replayGame.anchor.setTo(0, 0.5);
        exitGame = gameAdd().button(replayGame.right + 1, layerUnderMenu.centerY, 'exit_game_new', doExitGame, this, 1, 2 ,0);
        exitGame.anchor.setTo(0, 0.5);

        if(!gameSound().mute){
            b_music_2.kill();
        }else{
            b_music_1.kill();
        }
        //=================================
    },
    turnMusic: function (){
      // gameSound().mute = true;
      if(!gameSound().mute){
        gameSound().mute = true;
        b_music_1.kill();
        b_music_2.reset(layerUnderMenu.left + 2, layerUnderMenu.centerY);
      }else {
        gameSound().mute = false;
        b_music_2.kill();
        b_music_1.reset(layerUnderMenu.left + 2, layerUnderMenu.centerY);
      }
    },
    indication: function (vectorX, vectorY) {
        var arrowScale;
        arrow.alpha = 1;
        arrow.x = iceBall.sprite.x;
        arrow.y = iceBall.sprite.y;

        arrow.animations.play('arrow' , 5 , true);
        vectorSum = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        angleVector_AxisX = Math.asin(-vectorY / vectorSum) * (180/Math.PI);
        arcsin = angleVector_AxisX;
        if (vectorX > 0){
          if (angleVector_AxisX > 0){
              angleVector_AxisX = 180 - angleVector_AxisX;
          } else {
              angleVector_AxisX = 180 - angleVector_AxisX;
          }
        }
        // else if (vectorX < 0){
        //
        //     angleVector_AxisX = angleVector_AxisX;
        // }
        arrowScale = vectorSum / (2 * iceBall.sprite.height);

        if (Math.abs(arrowScale - prevScale) > 0.5 && !indicator.isPlaying){
            indicator.play(false);
        } else if (Math.abs(arrowScale - prevScale) > 0.5){
              indicator.restart();
              //indicator.play(false);
        }
        // else if (!indicator.isPlaying){
        //     // indicator.onPlay.addOnce(function (){ })
        //     //game.time.create().add(1000, function (){ indicator.paused = true;}, this);
        //     indicator.stop();
        // }
        // tempParametr = arrowScale - prevScale;

        prevScale = arrowScale;



        arrow.angle = angleVector_AxisX;
        arrow.scale.x = arrowScale;
        arrow.scale.y = arrowScale;

    },
    shoot: function (x, y){
        iceBall.recentX = iceBall.sprite.x;
        iceBall.recentY = iceBall.sprite.y;
        iceBall.sprite.body.velocity.x = x * iceBall.velocityRatio;
        iceBall.sprite.body.velocity.y = y * iceBall.velocityRatio ;
        iceBall.isSet = false;
        iceBall.status = 'start';
        killArrow();
        arrow.alpha = 0;
        begin = false;
        arrow.animations.stop();
        indicator.stop();
    },
    checkManipulator: function (){
        var pressMouse = iceBall.manipulator.isDown;
        var mouseX = iceBall.manipulator.x;
        var mouseY = iceBall.manipulator.y;



        iceBall.minX = iceBall.sprite.x - iceBall.sprite.width/2;
        iceBall.maxX = iceBall.sprite.x + iceBall.sprite.width/2;

        iceBall.minY = iceBall.sprite.y - iceBall.sprite.height/2;
        iceBall.maxY = iceBall.sprite.y + iceBall.sprite.height/2;

        if (iceBall.sprite.arrow_1){
          iceBall.sprite.arrow_1.x = iceBall.sprite.x + 85;
          iceBall.sprite.arrow_2.x = iceBall.sprite.x - 70;
        }


        if ((pressMouse && iceBall.isSet) || begin){
            if (((mouseY > iceBall.minY && mouseY < iceBall.maxY) && (mouseX > iceBall.minX && mouseX < iceBall.maxX )) || begin){
                begin =  true;
                killArrow();
                //записываем значения
                // iceBall.sprite.tempYmax  = 200;
                // iceBall.sprite.tempYmin = -200;
                // iceBall.sprite.tempXmax  = 200;
                // iceBall.sprite.tempXmin = -200;

                iceBall.tempX = -iceBall.velocityRatio * 3 * (mouseX - iceBall.sprite.x);
                iceBall.tempY = -iceBall.velocityRatio * 3 * (mouseY - iceBall.sprite.y);

                if (iceBall.tempY > iceBall.sprite.tempYmax){
                    iceBall.tempY = iceBall.sprite.tempYmax;
                } else if (iceBall.tempY < iceBall.sprite.tempYmin){
                    iceBall.tempY = iceBall.sprite.tempYmin;
                }
                if (iceBall.tempX > iceBall.sprite.tempXmax){
                    iceBall.tempX = iceBall.sprite.tempXmax;
                } else if (iceBall.tempX < iceBall.sprite.tempXmin){
                    iceBall.tempX = iceBall.sprite.tempXmin;
                }

                this.indication(iceBall.tempX, iceBall.tempY);

              //  iceBall.line.setTo(iceBall.startX, iceBall.startY, mouseX, mouseY);

            }
        }
    },
    checkShoot: function () {
        var pressMouse = iceBall.manipulator.isDown;
        if (!pressMouse && iceBall.isSet && (iceBall.tempX !== 0 || iceBall.tempY !== 0)){
            this.shoot(iceBall.tempX, iceBall.tempY);
        }
    },
    resetBall: function () {

        if (!iceBall.sprite.alive || (iceBall.sprite.body.velocity.x == 0 && iceBall.sprite.body.velocity.y == 0 && countSnowSong !== 0)){
            // alert( iceBall.sprite.alive);
            iceBall.tempX = 0;
            iceBall.tempY = 0;
            iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
            // iceBall.sprite.alive = true;
            iceBall.isSet = true;
            iceBall.status = 'wait';
            countSnowSong = 0;
            // counterStarterTime = 0;
            // realTimeNow = 0;
            // scoreStars = 0;
            health -= 1;

            healthTable.text = health;
            scoreHartImage.animations.play('hartBar');
            levelTable.text = realTimeNow;
            // starTable.text = '0';
            riseArrow();

            // aimsGroup.forEachDead(resetAll, this);
            // gifts.forEachDead(resetStars, this);

            function resetAll(aim) {
            aim.reset(aim.x, aim.y);
            }
            function resetStars(star){
              star.reset(star.x, star.y);
            }
        }
    },
    update: function (){
      levelTable.text = realTimeNow;
      //проверка победы
      if (!aimsGroup.getFirstAlive()){
          goMenuWin();
      }
      if (health < 1){
          goMenuLoose();
      }

      //Timer
      if (counterStarterTime == 0 && iceBall.status == 'start'){
         counterStarterTime++;
         starterTime = Math.floor(gameTime().now/1000);
         healthTable.text = health;
         starTable.text = scoreStars;
         //scoreHartImage.animations.play('hartBar');
         scoreTimerImage.animations.getAnimation('timeBar').onComplete.add(function () {scoreHartImage.animations.play('hartBar');}, this);
         scoreHartImage.animations.getAnimation('hartBar').onComplete.add(function () {scoreStarsImage.animations.play('starBar');}, this);

      }

      if (iceBall.status == 'start' || counterStarterTime != 0){
        realTimeNow = Math.floor(gameTime().now/1000) - starterTime;
        levelTable.text = realTimeNow;
        if (realTimeNow % 60 == 0){
             scoreTimerImage.animations.play('timeBar');
        }
      }
        //======================================

        if (!checkover){
            countSnowSong = 0;
        }
        checkRollingBall();

        this.checkManipulator();

        this.checkShoot();

        gamePhysics().arcade.collide(entityGroup, iceBall.sprite, playSong);
        gamePhysics().arcade.collide(aimsGroup, iceBall.sprite, killAim);

        checkover = gamePhysics().arcade.overlap(snowGroup, iceBall.sprite,  stopBall, null, this);
        gamePhysics().arcade.overlap(gifts, iceBall.sprite,  killgift, null, this);``

        this.resetBall();

        textDebag.text =   iceBall.sprite.body.velocity.x + '              ' + iceBall.sprite.body.velocity.y;

    },

    getInfo: function (){
      return saveBox;
    },


    render: function (){
        // game.debug.geom(iceBall.line);
        // game.debug.lineInfo(iceBall.line, 32, 32);
    }

}

var iceBall = {
  startX : 400,
  startY : 420,

  velocityRatio : 2,

  tempX : 0,
  tempY : 0,
  isSet : true,
  // manipulator : game.input.mousePointer,
}

var killAim = function (iceBall, aim) {
    iceCrack.play();
    aim.kill();
}

var replay = function (){

  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  // counterStarterTime = 0;
  // realTimeNow = 0;
  // scoreStars = 0;
  // health -= 1;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  rollingBall.stop();

  healthTable.text = health;
  scoreHartImage.animations.play('hartBar');
  levelTable.text = realTimeNow;
  starTable.text = scoreStars;
  // starTable.text = '0';
  riseArrow();

  aimsGroup.forEachDead(resetAll, this);
  gifts.forEachDead(resetStars, this);

  function resetAll(aim) {
  aim.reset(aim.x, aim.y);
  }
  function resetStars(star){
    star.reset(star.x, star.y);
  }


}
var countSnowSong = 0;
var stopBall = function (iceBall, snow) {
    if (iceBall.body.velocity.x > 0){
        iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x - 1);
    } else if (iceBall.body.velocity.x < 0){
      iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x + 1);;
    }
    if (iceBall.body.velocity.y > 0){
        iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y - 1);;
    } else if (iceBall.body.velocity.y < 0){
       iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y + 1);;
    }

    // iceBall.body.velocity.x = Math.floor(iceBall.body.velocity.x / 1.03);
    // iceBall.body.velocity.y = Math.floor(iceBall.body.velocity.y / 1.03);

    if(countSnowSong == 0){
      // gameAdd().tween(iceBall.body.velocity).to({x: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      //
      // gameAdd().tween(iceBall.body.velocity).to({y: 0}, 4000, Phaser.Easing.Exponential.Out, true, 0);
      snow_poof.play();
      var explosion = explosions.getFirstExists(false);
      explosion.reset(iceBall.x, iceBall.y);
      // explosion.reset(polar.x, polar.y);
      //explosion.animations.play('kaboom');
      explosion.play('kaboom', 30, false, true);
      countSnowSong++;
    }
    // game.state.start('snowPongGame');
}
var rollingCounter = 0;
var checkRollingBall = function () {
  if((Math.abs(iceBall.sprite.body.velocity.x) > 0 || Math.abs(iceBall.sprite.body.velocity.y) > 0) && !checkover){
    // var velocityXmax = iceBall.velocityRatio * 200;
    // var velocityYmax = iceBall.velocityRatio * 200;
    var currentVelocity = Math.sqrt(iceBall.sprite.body.velocity.x*  iceBall.sprite.body.velocity.x  +  iceBall.sprite.body.velocity.y* iceBall.sprite.body.velocity.y);

    iceBall.sprite.volume = currentVelocity/iceBall.sprite.vectorVelocitiMax;
    rollingBall.volume = iceBall.sprite.volume;
    if (rollingCounter == 0){
      rollingBall.loopFull();
      rollingCounter++;
    }
  }else {
    rollingBall.stop();
    rollingCounter = 0;
  }
}

var goLeft = function (){
  iceBall.sprite.x -= 20;
}

var goRight = function (){
  iceBall.sprite.x += +20;
}

var killArrow = function () {
      iceBall.sprite.arrow_1.kill();
      iceBall.sprite.arrow_2.kill();
}

var riseArrow = function () {
      iceBall.sprite.arrow_1.reset(iceBall.sprite.x, iceBall.sprite.y);
      iceBall.sprite.arrow_2.reset(iceBall.sprite.x, iceBall.sprite.y);
}
var playSong = function (ball, entity) {
  if (entity.type == 'wood'){
        wood_hit.volume = iceBall.sprite.volume;
        wood_hit.play();
  }else if (entity.type == 'stone'){
        stoun_hit.volume = iceBall.sprite.volume
        stoun_hit.play();
  } else if(entity.type == 'iceWall'){
        iceWall_hit.play();
  }

}

var killgift = function (player, star){
  star.kill();
  starSong.play();
  scoreStarsImage.animations.play('starBar');
  scoreStars += 1;
  starTable.text = scoreStars;
  // scoreStarsImage.animations.play('starBar');
  // scoreStars += 1;
  // starTable.text = scoreStars;
}

var goMenuLoose = function () {
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);

  changeState('Game_over');

}

var goMenuWin = function () {
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();

  saveBox.time = realTimeNow;
  saveBox.hp = health;
  saveBox.stars = scoreStars;
  if (scoreStars){
      saveBox.score = scoreStars * Math.floor(1000/realTimeNow) * health;
  }else {
      saveBox.score = Math.floor(1000/realTimeNow) * health;
  }
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);
  changeState('Win_SnowBallGame');
}

doReplayGame = function (){
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  countSnowSong = 0;
  riseArrow();
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  rollingBall.stop();
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);
  changeState('snowPongGame_8');
}

doExitGame = function (){
  gameSound().stopAll();
  iceBall.tempX = 0;
  iceBall.tempY = 0;
  iceBall.sprite.reset(iceBall.recentX, iceBall.recentY);
  // iceBall.sprite.alive = true;
  iceBall.isSet = true;
  iceBall.status = 'wait';
  riseArrow();
  realTimeNow = 0;
  health = 3;
  scoreStars = 0;
  //countSnowSong = 0;
  counterStarterTime = 0;
  realTimeNow = 0;
  saveBox.currentGame = 'snowPongGame_8';
  saveStat(28);

  changeState('map');
}

})()
