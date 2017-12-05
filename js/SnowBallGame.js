(function () {

//Спрайты================
var playerBet;
var computerBet;

//полярники
var simplePolarMan;
var simplePolarMen;
var smartPolarMen;
var smartPolarMan;
var bigPolarMen;
var bigPolarMan;

var timeDealyPolarCreate = 1000;

//====================
var refuse;
var gifts;
var gift;
//var refuseLive = 10;
//======================
//Музыка и звкуи audio
var throw_player;
var throw_enemy;
var harmPolar;
var clap;
var hitPinguin
var starSong;
//========================
//====================
///Таблица данных об игре
var scoreTable;
var levelTable;
var healthTable;
var starTable;

var scoreStarsImage;
var scoreHartImage;

//Статистика смертей===========
var bigPolarDead = 0;
var simplePolarDead = 0;
var smartPolarDead = 0;
//===========================
//=============================
//Анимационные эффекты===================
var explosions;
var explosion;
var animBigPolar;

//============================Переменные значения(настройки игры)==================
var computerBetSpeed = 150; //Скорость передвижения компьютера
var score = 0; //Количество попаданий
var nextLevelScore = 3; //Критерий перехода на следующий уровень
var Level = 1; //Текущий уровень
var health = 10; //Жизни игрока
var scoreStars = 0;
var counterStarterTime = 0;
var starterTime = 0;

var realTimeNow;
//==================================================================
//===========Управление============================================
// var plyaerMouse;
var cursors;
var fireButton;
//=====Для стрельбы=================================================

//Группы пуль
var bullets;
var enemyBullets;
var enemyBulletsBig;
//Экземплры пуль
var bullet;
var enemyBullet;
var enemyBulletBig;

//Параметры стрельбы
var bulletTime = 1000;  //Начальная задержка пуль по времени PLayer
var enemyBigBulletTime = 2000;
var enemyBulletTime = 1000;//Начальная задержка пуль по времени Enemys

var enemyBulletvelocity = 400;//скорость пуль PLayer
var playerBulletVelocity = 300;//скорость пуль Enemys

var mark = 'right';//марке стрельбы

var timeDilayEnemy = 2000;//перезардка выстрела  Enemys
var timeDilayPlayer = 600;//перезардка выстрела  PLayer
//=================Результат матча========================================
var saveBox = {stars: 0, hp: 0, time: 0, score: 0};
/////////================================================\\\\\\\\\\\\\\\\\\\\
window.SnowBallGame =
{
    preload: function () {
        game.load.audio('harmPolar', 'assets/audio/harmPolar_4.mp3');
        game.load.audio('clap', 'assets/audio/clap_2.mp3');
        game.load.audio('hitPinguin', 'assets/audio/hitPinguin.wav');
        game.load.audio('starSong', 'assets/audio/bell.mp3');
        //
        game.load.spritesheet('simplePolarMan', 'assets/img/Morty.png', 96, 76);
        game.load.spritesheet('smartPolarMan', 'assets/img/Morty2.png', 96, 76);
        game.load.spritesheet('bigPolarMan', 'assets/img/Poo.png', 143.75, 115);
        game.load.spritesheet('HartBar', 'assets/img/heartMenu.png', 40, 40);
        // game.load.spritesheet('throwSimpleMan', 'assets/img/throwSimpleMan.jpg', 60, 79);
        game.load.spritesheet('bet', 'assets/img/Pingvin.png', 50, 78);
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('mainLayer', 'assets/img/snowBall_mainLayer.png');
        game.load.image('bigSnow', 'assets/img/bigSnow.png');
        game.load.image('smallSnow', 'assets/img/smallSnow.png');
        game.load.image('midleSnow', 'assets/img/midleSnow.png');
        game.load.image('refuse', 'assets/img/refuse.png');
        game.load.spritesheet('star', 'assets/img/stars.png', 49, 50);
        game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
        game.load.spritesheet('bigSnowBaall', 'assets/img/bigSnowBaall.png', 110, 110);
        game.load.spritesheet('starBar', 'assets/img/startMenu.png', 40, 40);

    },

    create: function () {
    //базовый режим и фон
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.image(0, 0, 'mainLayer');
    //====================MAINPLAYEEEEEEER===
    playerBet = game.add.sprite(35, 230, 'bet');
    playerBet.anchor.setTo(0.5, 0.5);
    playerBet.status = 'whait';
    game.physics.arcade.enable(playerBet);
        // playerBet.animations.add('throw',[0, 1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20], 40);
    playerBet.animations.add('throw',[ 7 , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20], 40);
    playerBet.animations.add('right',[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], 25, true);
    playerBet.animations.add('hit',[42, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], 25);

    //====================Добавлем музыку и звуки====================
    //звуки бросков
    throw_plyer = game.add.audio('throw');
    throw_plyer.volume = 1;
    throw_enemy = game.add.audio('throw');
    throw_enemy.volume = 0.85;
    //звуки полярников
    harmPolar = game.add.audio('harmPolar');
    clap = game.add.audio('clap');
    clap.volume = 0.3;
    //удар в пингвина
    hitPinguin = game.add.audio('hitPinguin');
    hitPinguin.volume = 0.4;
    //сбор звездочек
    starSong = game.add.audio('starSong');
    //=======================================
    mainTrack = game.add.audio('snowBallGame_mainTrack');
    mainTrack.volume = 0.5;
    mainTrack.play();
//=============Снег на фоне игры===================================
      // back_emitter = this.add.emitter(game.world.centerX, -32, 600);
      // back_emitter.makeParticles('snow_small', [0, 1, 2, 3, 4, 5]);
      // back_emitter.maxParticleScale = 0.2;
      // back_emitter.minParticleScale = 0.1;
      // back_emitter.setYSpeed(20, 100);
      // back_emitter.gravity = 0;
      // back_emitter.width = game.world.width * 1.5;
      // back_emitter.minRotation = 0;
      // back_emitter.maxRotation = 40;
      // back_emitter.start(false, 14000, 20);
//=======Пули игрока============================
      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(30, 'ball');
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 1);
      bullets.setAll('outOfBoundsKill', true);
      bullets.setAll('checkWorldBounds', true);
//============Пули противника обыкновенные=======================
      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(30, 'ball');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 1);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);
//===================BIG bullets========================
      enemyBulletsBig = game.add.group();
      enemyBulletsBig.enableBody = true;
      enemyBulletsBig.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBulletsBig.createMultiple(30, 'bigSnowBaall');
      enemyBulletsBig.setAll('anchor.x', 0.5);
      enemyBulletsBig.setAll('anchor.y', 1);
      enemyBulletsBig.forEach(
        function (invader){
          invader.animations.add('goBall',  [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        }, this);
//=====================Простые полярники===============
      simplePolarMan = game.add.group();
      simplePolarMan.enableBody = true;
      simplePolarMan.physicsBodyType = Phaser.Physics.ARCADE;
      simplePolarMan.createMultiple(30, 'simplePolarMan');
      simplePolarMan.setAll('anchor.x', 0.5);
      simplePolarMan.setAll('anchor.y', 0.5);
      simplePolarMan.forEach(
        function (invader){
          invader.animations.add('go', [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 30, true);
          invader.animations.add('goBack', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 30, true);
          invader.animations.add('shoot',  [26, 27, 28, 0], 10, false);
          //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
        }, this);
//================BigPolarMen=============================
        bigPolarMen = game.add.group();
        bigPolarMen.enableBody = true;
        bigPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        bigPolarMen.createMultiple(30, 'bigPolarMan');
        bigPolarMen.setAll('anchor.x', 0.5);
        bigPolarMen.setAll('anchor.y', 0.5);
        bigPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
            animBigPolar = invader.animations.add('throw',  [12, 13, 14], 3, false);

            //invader.animations.add('right', [0, 1, 2, 4, 5, 6, 7, 8, 9], 10, true);
          }, this);
//===============SmartPolarMen==============================
        smartPolarMen = game.add.group();
        smartPolarMen.enableBody = true;
        smartPolarMen.physicsBodyType = Phaser.Physics.ARCADE;
        smartPolarMen.createMultiple(30, 'smartPolarMan');
        smartPolarMen.setAll('anchor.x', 0.5);
        smartPolarMen.setAll('anchor.y', 0.5);
        smartPolarMen.forEach(
          function (invader){
            invader.animations.add('go',  [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
            invader.animations.add('goBack', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 30, true);
            invader.animations.add('shoot',  [26, 27, 28, 0], 10, false);
          }, this);
//================Анимационные группы==================
//=============Группа взрывов==========================
      explosions = game.add.group();
      explosions.createMultiple(30, 'kaboom');
      // explosions.setAll('anchor.x', 0.5);
      // explosions.setAll('anchor.y', 0.5);
      // explosions.animations.add('kaboom');
      explosions.forEach( function (invader){
        invader.anchor.x =  0.5;
        invader.anchor.y =  0.5;
        invader.animations.add('kaboom');
      }, this);
//===========Статичные объект====================
        //Подарочки
        gifts = game.add.group();
        gifts.enableBody = true;
        //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        gifts.createMultiple(30, 'star');
        gifts.setAll('anchor.x', 0.5);
        gifts.setAll('anchor.y', 0.5);
        gifts.forEach(
          function (invader){
            invader.animations.add('play');
          }, this);
        // var new_star = gifts.getFirstExists(false);
        // new_star.reset(110, 250);
        // new_star.animations.play('play', true);
        // new_star = gifts.getFirstExists(false);
        // new_star.reset(390, 240);
        // new_star.animations.play('play', 4, true ,true);
      //хижина
      refuse = game.add.group()
      refuse.physicsBodyType = Phaser.Physics.ARCADE;
      refuse.enableBody = true;
      //Сугробы
      var ref = refuse.create(420, 240, 'bigSnow');
      ref.body.immovable = true;
      ref.hp = 8;
      ref.anchor.x = 0.5;
      ref.anchor.y = 0.5;
      var ref_2 = refuse.create(70, 70, 'refuse');
      ref_2.body.immovable = true;
      ref_2.hp = 10;
      ref_2.anchor.x = 0.5;
      ref_2.anchor.y = 0.5;
      var ref_3 = refuse.create(510, 10, 'midleSnow');
      ref_3.body.immovable = true;
      ref_3.hp = 5;
      ref_3.anchor.x = 0.5;
      ref_3.anchor.y = 0.5;
      var ref_4 = refuse.create(240, 350, 'smallSnow');
      ref_4.body.immovable = true;
      ref_4.hp = 2;
      ref_4.anchor.x = 0.5;
      ref_4.anchor.y = 0.5;
      var ref_5 = refuse.create(100, 240, 'smallSnow');
      ref_5.body.immovable = true;
      ref_5.hp = 2;
      ref_5.anchor.x = 0.5;
      ref_5.anchor.y = 0.5;
      var ref_6 = refuse.create(420, 40, 'smallSnow');
      ref_6.body.immovable = true;
      ref_6.hp = 2;
      ref_6.anchor.x = 0.5;
      ref_6.anchor.y = 0.5;
//==================Табло=======================
      //Звузда
      scoreStarsImage = game.add.sprite (20 , 145, 'starBar');
      scoreStarsImage.scale.setTo(1, 1);
      scoreStarsImage.anchor.x = 0.5;
      scoreStarsImage.anchor.y = 0.5;
      scoreStarsImage.alpha = 1;
      scoreStarsImage.animations.add('starBar');
      starTable = game.add.text(55, 130, scoreStars, { fontSize: '32px', fill: 'white' });
      //Сердце
      scoreHartImage = game.add.sprite (20 , 110, 'HartBar');
      scoreHartImage.scale.setTo(1, 1);
      scoreHartImage.anchor.x = 0.5;
      scoreHartImage.anchor.y = 0.5;
      scoreHartImage.alpha = 1;
      scoreHartImage.animations.add('hartBar');
      healthTable = game.add.text(55, 95, health, { fontSize: '32px', fill: 'red' });
      //




      scoreTable =  game.add.text(55, 60, 'score: ' + score, { fontSize: '32px', fill: 'white' });
      levelTable = game.add.text(55, 16, 'Time: ' + 0, { fontSize: '32px', fill: 'blue' });
      //healthTable = game.add.text(16, 95, 'Health: ' +  health, { fontSize: '32px', fill: 'red' });

//=========Управление игроком========================================
       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
       cursors = game.input.keyboard.createCursorKeys();
       // plyaerMouse = game.input.x;
       //game.input.onDown.add(this.releaseBall, this);
//===================================================================
    },
    //Стрельба PLayer
     fireBullet: function () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
      bullet = bullets.getFirstExists(false);
      playerBet.animations.play('throw');
      // if (cursors.down.isDown && bullet){
      //   throw_plyer.play();
      //   bullet.reset(playerBet.x, playerBet.y + 5);
      //   bullet.body.velocity.y = playerBulletVelocity;
      //   bulletTime = game.time.now + timeDilayPlayer;
      // } else if (cursors.up.isDown && bullet) {
      //   throw_plyer.play();
      //   bullet.reset(playerBet.x, playerBet.y - 5);
      //   bullet.body.velocity.y = -playerBulletVelocity;
      //   bulletTime = game.time.now + timeDilayPlayer;
      // } else if (cursors.left.isDown && bullet) {
      //   throw_plyer.play();
      //   bullet.reset(playerBet.x - 5, playerBet.y);
      //   bullet.body.velocity.x = -playerBulletVelocity;
      //   bulletTime = game.time.now + timeDilayPlayer;
      // } else if (cursors.right.isDown && bullet) {
      //   throw_plyer.play();
      //   bullet.reset(playerBet.x + 5, playerBet.y);
      //   bullet.body.velocity.x = playerBulletVelocity;
      //   bulletTime = game.time.now + timeDilayPlayer;
      // } else if (bullet) {
      // alert(playerBet.angle);
          switch (playerBet.angle) {
            case 90:
            //вниз
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = playerBulletVelocity;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
            case 45:
              //вниз-право
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = playerBulletVelocity/2;
                bullet.body.velocity.x = playerBulletVelocity/2;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
            case -45:
                //вверх-право
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y + 5);
                bullet.body.velocity.y = -playerBulletVelocity/2;
                bullet.body.velocity.x = playerBulletVelocity/2;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
            case 135:
              //вниз-лево
              throw_plyer.play();
              bullet.reset(playerBet.x, playerBet.y + 5);
              bullet.body.velocity.y = playerBulletVelocity/2;
              bullet.body.velocity.x = -playerBulletVelocity/2;
              bulletTime = game.time.now + timeDilayPlayer;
              break;
            case -135:
              //вверх-лево
              throw_plyer.play();
              bullet.reset(playerBet.x, playerBet.y + 5);
              bullet.body.velocity.y = -playerBulletVelocity/2;
              bullet.body.velocity.x = -playerBulletVelocity/2;
              bulletTime = game.time.now + timeDilayPlayer;
              break;
            case -90:
                throw_plyer.play();
                bullet.reset(playerBet.x, playerBet.y - 5);
                bullet.body.velocity.y = -playerBulletVelocity;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
            case -180:
                throw_plyer.play();
                bullet.reset(playerBet.x - 5, playerBet.y);
                bullet.body.velocity.x = -playerBulletVelocity;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
            case 0:
                throw_plyer.play();
                bullet.reset(playerBet.x + 5, playerBet.y);
                bullet.body.velocity.x = playerBulletVelocity;
                bulletTime = game.time.now + timeDilayPlayer;
                break;
          }
        // }
      }

},
      fireBulletSmartEnemy: function (enemy) {

        if (game.time.now > enemy.timeDelay)
        {
            //  Grab the first bullet we can from the pool
            enemyBullet = enemyBullets.getFirstExists(false);

            if (enemyBullet)
            {
                //  And fire it
                throw_enemy.play();
                enemy.angle = 180;
                enemy.body.velocity.y = 0;
                enemy.animations.play('shoot');
                //simplePolarMan.animations.play('throwSimpleMan');
                // simplePolarMen.animations.add('throwSimpleMan');
                // simplePolarMen.animations.play('throwSimpleMan', 30, true, true);
                enemyBullet.reset(enemy.x - 10, enemy.y);
                //enemyBullet.body.velocity.x = -enemyBulletvelocity;
                game.physics.arcade.moveToObject(enemyBullet, playerBet,120);
                enemy.timeDelay = game.time.now + timeDilayEnemy;
            }
        }
      },
    //Стрельба Enemy
    fireBulletEnemy: function (enemy) {

      if (game.time.now > enemy.timeDelay)
      {
          //  Grab the first bullet we can from the pool
          enemyBullet = enemyBullets.getFirstExists(false);

          if (enemyBullet)
          {
              //  And fire it
              throw_enemy.play();
              enemy.angle = 180;
              enemy.body.velocity.y = 0;
              enemy.animations.play('shoot');
              //simplePolarMan.animations.play('throwSimpleMan');
              // simplePolarMen.animations.add('throwSimpleMan');
              // simplePolarMen.animations.play('throwSimpleMan', 30, true, true);
              enemyBullet.reset(enemy.x - 10, enemy.y);
              enemyBullet.body.velocity.x = -enemyBulletvelocity;
              enemy.timeDelay = game.time.now + timeDilayEnemy;
          }
      }
    },

     killComp: function (bullet, polar){

            //добавляем счет
            if (polar.hp >= 1){
              score = score + 1;
            }
            scoreTable.text = 'Score: ' + score;
            //убиваем и взрываем пулю
            bullet.kill();

            var explosion = explosions.getFirstExists(false);
            explosion.reset(polar.x, polar.y);
            explosion.scale.setTo(1,1);
            explosion.play('kaboom', 30, false, true);
            //проверяем жизни врага и убиваем если 0
            polar.hp -= 1;
            harmPolar.play();
            if(polar.hp < 1 && polar.status !== 'dead'){
              if(polar.name == 'simplePolarMan'){
                simplePolarDead += 1;
                polar.status = 'dead';
                polar.animations.play('goBack');
                polar.angle = 0;
                polar.body.velocity.x = 120 ;
              } else if (polar.name == 'smartPolarMan'){
                smartPolarDead += 1;
                polar.status = 'dead';
                polar.animations.play('goBack');
                polar.angle = 0;
                polar.body.velocity.x = 120 ;
              } else {
                bigPolarDead += 1;
                polar.status = 'dead';
                //polar.animations.play('goBack');
                polar.angle = 90;
                polar.body.velocity.y = 250 ;
                bigPolarMan.animations.play('go');
                function doit (){
                  polar.kill();
                }
                game.time.events.add(1000, doit, this);
                // var  go = game.add.Timer;
                // go.add(300, kill(), this);
              }
              switch (score) {
                case 3:
                    nextLevelScore += 5;
                    enemyBulletvelocity += 70;
                    timeDilayEnemy -= 50;
                    ++Level;
                    //levelTable.text = "Time " + Math.floor(game.time.now/1000);
                    break;
                case 8:
                    nextLevelScore += 5;
                    enemyBulletvelocity += 70;
                    timeDilayEnemy -= 50;
                    ++Level;
                    //levelTable.text = "Level" + Level;
                    break;
                case 15:
                    saveBox = {score: score, time: realTimeNow, stars: scoreStars, hp: health};
                    //========Сброс настроек====
                    counterStarterTime = 0;
                    scoreStars = 0;
                    simplePolarDead = 0;
                    smartPolarDead = 0;
                    bigPolarDead = 0;
                    nextLevelScore = 5;
                    health = 3;
                    shotAim = 0;
                    Level = 1;
                    score = 0;
                    timeDilayEnemy = 2000;
                    enemyBulletvelocity = 400;
                    refuseLive = 10;
                    mainTrack.pause();
                    //==============================
                    game.state.start('Win_SnowBallGame');
                    break;
              }
            }

            // if (score > nextLevelScore){
            //     nextLevelScore += 5;
            //     enemyBulletvelocity += 70;
            //     timeDilayEnemy -= 50;
            //     ++Level;
            //     levelTable.text = "Level" + Level;
            //     //game.state.start('nextLevel', false);
            // }


     },

     getInfo: function (){
        return saveBox;
     },

     killBullets: function (refuse, bullet){
        var explode = explosions.getFirstExists(false);
        explode.reset(bullet.x, bullet.y);
        explode.scale.setTo(0.5, 0.5);

        explode.play('kaboom', 30, false, true);
        refuse.hp -= 1;

        if (refuse.hp < 1){
            refuse.kill();
            var star = gifts.getFirstExists(false);
            star.reset(refuse.x, refuse.y);
            star.animations.play('play', 12, true, true);
        }
        clap.play();
        bullet.kill();
     },

     killBulletsBig: function (refuse, bullet){
        var explode = explosions.getFirstExists(false);
        explode.reset(bullet.x, bullet.y);
        explode.scale.setTo(2,2);
        explode.play('kaboom', 30, false, true);
        refuse.hp -= 2;
        if (refuse.hp < 1){
            refuse.kill();
        }
        bullet.kill();
   },

     killPLayer: function (bet, bullet )
     {
        if (bullet.name !== 'bigPolarMan'){
          bullet.kill();
        } else {

        }
        hitPinguin.play();
        scoreHartImage.animations.play('hartBar', 12);
        playerBet.animations.play('hit');
        health = health - 1;
        if (health < 1)
        {
            saveBox = {score: score, time: realTimeNow, hp: health};
            //========Сброс настроек====
            counterStarterTime = 0;
            scoreStars = 0;
            simplePolarDead = 0;
            smartPolarDead = 0;
            bigPolarDead = 0;
            nextLevelScore = 5;
            health = 3;
            shotAim = 0;
            Level = 1;
            score = 0;
            timeDilayEnemy = 2000;
            enemyBulletvelocity = 400;
            refuseLive = 10;
            mainTrack.pause();
            //==============================
            this.state.start('Game_over');
        }
        healthTable.text = health;
     },

     killGifts: function (player, star){
       star.kill();
       starSong.play();
       scoreStarsImage.animations.play('starBar');
       scoreStars += 1;
       starTable.text = scoreStars;

     },

      manipulate: function (polar) {
            //alert(game.time.now);
              if (polar.hp > 0){
                if (polar.timeWalk > game.time.now && polar.animations.getAnimation('shoot').isFinished){

                  // if(simplePolarMan.countLiving() > 0){

                    if (polar.y - playerBet.y < -55) {
                        polar.angle = 90;
                        polar.animations.play('go');
                        polar.body.velocity.y = computerBetSpeed;
                    }
                    else if (polar.y - playerBet.y > 55) {
                      polar.angle = 270;
                       polar.body.velocity.y = -computerBetSpeed;
                       polar.animations.play('go');
                    }
                    else {
                        polar.angle = 180;
                        polar.animations.stop();
                        polar.body.velocity.y = 0;
                    }
                  // }
                } else if ((game.time.now - polar.timeWalk) > (Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000)){
                    //alert(game.time.now);
                      polar.timeWalk += 9000;
                    //  alert( polar.timeWalk);
                } else if (polar.animations.getAnimation('shoot').isFinished) {
                  //alert((Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000));
                  polar.angle = 180;
                  polar.animations.stop();
                  polar.body.velocity.y = 0;
                }
              }
      },
      manipulateBigPolar: function () {
                      //приходим наверх
                              if(bigPolarMan && bigPolarMan.hp > 0){
                                if (bigPolarMan.y > 480){
                                      bigPolarMan.angle = 270;
                                      bigPolarMan.body.velocity.y = -50;
                                }else if (bigPolarMan.y <= 480){
                                    bigPolarMan.body.velocity.y = 0;
                                }
                      //====================Управление======================
                                if ((bigPolarMan.x - playerBet.x) < -35 && bigPolarMan.animations.getAnimation('throw').isFinished){
                                      bigPolarMan.angle = 0;
                                      bigPolarMan.animations.play('go');
                                      bigPolarMan.body.velocity.x = computerBetSpeed/4;
                                } else if ((bigPolarMan.x - playerBet.x) > 35 && bigPolarMan.animations.getAnimation('throw').isFinished){
                                        bigPolarMan.angle = 180;
                                        bigPolarMan.animations.play('go');
                                        bigPolarMan.body.velocity.x = -computerBetSpeed/4;
                                } else if (bigPolarMan.animations.getAnimation('throw').isFinished) {
                                        bigPolarMan.angle = 270;
                                        bigPolarMan.body.velocity.x = 0;
                                        bigPolarMan.animations.stop();
                                }
                                if (Math.abs(bigPolarMan.x - playerBet.x) < 400){
                                      fireBulletEnemyBig();
                                }
                              }
      },
      chekDead: function (polar){

                      if (polar.x > 800){
                          polar.kill();
                      }
      },

     update: function () {

       //Timer
       if (counterStarterTime == 0 && playerBet.status == 'start'){
          counterStarterTime++;
          starterTime = Math.floor(game.time.now/1000);
       }

       if (playerBet.status == 'start'){
         realTimeNow = Math.floor(game.time.now/1000) - starterTime;
         levelTable.text = "Time " + realTimeNow;
       }


       //Если нажат пробел запускаем стрельбу PLayer
        if (fireButton.isDown)
        {
            this.fireBullet();
            playerBet.status = 'start';
        }
//Управление Player============================================================
         if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
              playerBet.angle = 0;
              playerBet.status = 'start';
              if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                playerBet.animations.play('right');
              }
              playerBet.body.velocity.x = 250;
              //playerBet.angle = 90;
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
               if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                 playerBet.animations.play('right');
               }
              playerBet.angle = 180;
              playerBet.body.velocity.x = -250;
              playerBet.status = 'start';
              //  playerBet.animations.play('left'); ждем спрайтов
         } else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown){
                 if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                   playerBet.animations.play('right');
                 }
                playerBet.angle = 270;
                playerBet.body.velocity.y = -250;
                playerBet.status = 'start';
             //playerBet.animations.stop();
             // player.frame = 4;
         } else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
               if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                 playerBet.animations.play('right');
               }
                playerBet.angle = 90;
                playerBet.body.velocity.y = 250;
                playerBet.status = 'start';
         } else if (cursors.down.isDown && cursors.left.isDown){
               if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                 playerBet.animations.play('right');
               }
               playerBet.angle = 135;
               playerBet.body.velocity.y = 125;
               playerBet.body.velocity.x = -125;
               playerBet.status = 'start';

          } else if (cursors.down.isDown && cursors.right.isDown){
                if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                  playerBet.animations.play('right');
                }
                playerBet.angle = 45;
                playerBet.body.velocity.y = 125;
                playerBet.body.velocity.x = 125;
                playerBet.status = 'start';

         } else if (cursors.up.isDown && cursors.left.isDown){
               if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                 playerBet.animations.play('right');
               }
               playerBet.angle = 225;
               playerBet.body.velocity.y = -125;
               playerBet.body.velocity.x = -125;
               playerBet.status = 'start';

          } else if (cursors.up.isDown && cursors.right.isDown){
                if (!playerBet.animations.getAnimation('hit').isPlaying  && !playerBet.animations.getAnimation('throw').isPlaying ){
                  playerBet.animations.play('right');
                }
                playerBet.angle = 315;
                playerBet.body.velocity.y = -125;
                playerBet.body.velocity.x = 125;
                playerBet.status = 'start';

           } else {
            playerBet.animations.stop('right');
            playerBet.body.velocity.y = 0;
            playerBet.body.velocity.x = 0;
       }
//=====================================================================
//=========================================================================
//Ограничения для игрока по высоте и ширине карты
         var playerBetHalfWidth = playerBet.width / 2;
         var playerBetHalfHeight = playerBet.height / 2;

         if (playerBet.x < playerBetHalfWidth) {
            playerBet.x = playerBetHalfWidth;
         }
         else if (playerBet.x > 650 - playerBetHalfWidth) {
            playerBet.x = 650 - playerBetHalfWidth;
         }

         if (playerBet.y < playerBetHalfHeight) {
            playerBet.y = playerBetHalfHeight;
         }
         else if (playerBet.y > game.height - playerBetHalfHeight) {
            playerBet.y = game.height - playerBetHalfHeight;
         }
//Изменение уровней====================================================
//====Сюжет уровень 2================================================
          if(Level == 1){
                if(simplePolarMan.countLiving() < 1){
                  simplePolarMen = simplePolarMan.getFirstExists(false);
                  if (simplePolarMen)
                  {
                    simplePolarMen.hp = 1;
                    simplePolarMen.status = 'alive';
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                  }
                }
          }
//====Сюжет уровень 2================================================
//=====Управление большим врагом=
         if(Level == 2 ){
              //простые полярники
              if(simplePolarMan.countLiving() < 1 && timeDealyPolarCreate < game.time.now && simplePolarDead < 4){

                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 1;
                    simplePolarMen.status = 'alive';
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }
              //умные полярники
              if(smartPolarMen.countLiving() < 1 && timeDealyPolarCreate < game.time.now && smartPolarDead < 2){
                  smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.status = 'alive';
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = game.time.now + 9000;
                    smartPolarMan.reset(700, 150);
                    timeDealyPolarCreate = game.time.now + 3500;
                }
              }
         }
//====Сюжет уровень 3================================================
          if(Level == 3){
            //большие полярники
            if(bigPolarMen.countLiving() < 1 && bigPolarDead < 1){
              bigPolarMan = bigPolarMen.getFirstExists(false);
              if (bigPolarMan)
              {
                bigPolarMan.hp = 4;
                bigPolarMan.name = 'bigPolarMan';
                bigPolarMan.status = 'alive';
                bigPolarMan.reset(400, 550);
              }

            }
              if(bigPolarMen.countLiving() >= 1){
                this.manipulateBigPolar();
              }

              //умные полярники
              if(smartPolarMen.countLiving() < 1 && timeDealyPolarCreate < game.time.now && smartPolarDead < 3){
                smartPolarMan = smartPolarMen.getFirstExists(false);
                if (smartPolarMan)
                {
                    smartPolarMan.hp = 2;
                    smartPolarMan.name = 'smartPolarMan';
                    smartPolarMan.status = 'alive';
                    smartPolarMan.timeDelay = 1000;
                    smartPolarMan.timeWalk = game.time.now + 9000;
                    smartPolarMan.reset(700, 150);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }

              //простые полярники
              if(simplePolarMan.countLiving() < 1 && timeDealyPolarCreate < game.time.now && simplePolarDead < 5){
                simplePolarMen = simplePolarMan.getFirstExists(false);
                if (simplePolarMen)
                {
                    simplePolarMen.hp = 1;
                    simplePolarMen.name = 'simplePolarMan';
                    simplePolarMen.status = 'alive';
                    simplePolarMen.timeDelay = 1000;
                    simplePolarMen.timeWalk = game.time.now + 7000;
                    simplePolarMen.reset(700, 250);
                    timeDealyPolarCreate = game.time.now + 1500;
                }
              }
          }
//======================================================================
              simplePolarMan.forEachAlive(this.manipulate, this);
              simplePolarMan.forEachAlive(this.fireBulletEnemy, this);

              smartPolarMen.forEachAlive(this.manipulate, this);
              smartPolarMen.forEachAlive(this.fireBulletSmartEnemy, this);

              simplePolarMan.forEachAlive(this.chekDead, this);
              smartPolarMen.forEachAlive(this.chekDead, this);

//==========================================================================
              game.physics.arcade.collide(simplePolarMan, smartPolarMen);
              game.physics.arcade.collide(playerBet, refuse);
              //game.physics.arcade.collide(playerBet, bigggg);
              //game.physics.arcade.collide(ball, computerBet);
//Реакция на пересечение пуль и игроков================================================
              game.physics.arcade.overlap(bullets, simplePolarMan, this.killComp, null, this);
              game.physics.arcade.overlap(bullets, smartPolarMen, this.killComp, null, this);
              game.physics.arcade.overlap(bullets, bigPolarMen, this.killComp, null, this);
              game.physics.arcade.overlap(enemyBullets, playerBet, this.killPLayer, null, this);
              game.physics.arcade.overlap(enemyBulletsBig, playerBet, this.killPLayer, null, this);

              game.physics.arcade.overlap(refuse, enemyBullets,  this.killBullets, null, this);
              game.physics.arcade.overlap(refuse, enemyBulletsBig,  this.killBulletsBig, null, this);
              game.physics.arcade.overlap(refuse, bullets,  this.killBullets, null, this);

              game.physics.arcade.overlap(gifts, playerBet,  this.killGifts, null, this);
              game.physics.arcade.overlap(bigPolarMen, playerBet,  this.killPLayer, null, this);
//======================================================================================
         // game.physics.arcade.collide(ball, playerBet, this.boomBol(playerBet), null, this);
         // game.physics.arcade.collide(ball, computerBet, this.boomBol(computerBet), null, this);
        // this.goSnowBall();
         //this.checkBall();
     },
}
///=======================Конец объекта Game==================================================
 function fireBulletEnemyBig () {

  if (game.time.now > enemyBigBulletTime)
  {
      //  Grab the first bullet we can from the pool
      enemyBulletBig = enemyBulletsBig.getFirstExists(false);

      if (enemyBulletBig)
      {
          //  And fire it
          bigPolarMan.angle = 270;
          bigPolarMan.animations.play('throw');
          enemyBulletBig.scale.setTo(0.7, 0.7);
          enemyBulletBig.reset(bigPolarMan.x, bigPolarMan.y - 10);
          enemyBulletBig.body.velocity.y = -enemyBulletvelocity/7;
          enemyBulletBig.animations.play('goBall');
          enemyBigBulletTime = game.time.now + 5*timeDilayEnemy;
      }
  }
}
var wholeBarstars;
var wholeBartime;
var wholeBarhp;

window.Win_SnowBallGame =
{
    create: function ()
    {
      this.add.image(0, 0, 'Game_over');

      wholeBarstars = this.add.text(300, 210, this.calculateScore("stars", wholeBarstars), { fontSize: '32px', fill: 'yellow' });
      wholeBartime = this.add.text(395, 210, this.calculateScore("time", wholeBartime), { fontSize: '32px', fill: 'blue' });
      wholeBarhp  = this.add.text(485, 210, this.calculateScore("hp", wholeBarhp), { fontSize: '32px', fill: 'red' });
      // this.add.text(250, 40, 'You are Win!!!', { fontSize: '32px', fill: 'red' });
      // this.add.text(250, 85, 'SCORE ' + SnowBallGame.getInfo(), { fontSize: '32px', fill: 'red' });
      //this.add.button( 250, 250, 'button', this.startPlay, this, 2, 1, 0);
      var button_out = this.add.button( 400, 250, 'button_out', this.goToMenu, this, 1, 0 ,2);
      button_out.anchor.x = 0.5;

      var menuAnim = game.add.sprite(250, 100, 'menuWin');

      menuAnim.animations.add('play', [0,1,2,3,4,5], 5 ,true);

      menuAnim.animations.play('play');
    },

    startPlay: function () {
          Level = 1;
          score = 0;
          index = 0;
          this.state.start('SnowBallGame');
    },

    goToMenu: function ()

    {
          Level = 1;
          score = 0;
          index = 0;
          game.state.start('Menu');
    },
    calculateScore: function (bar, text){
      for ( var i = 0; i <= SnowBallGame.getInfo().bar; i++){
          text.text = i;
      }

    },
    update: function (){

    }
}

})();
