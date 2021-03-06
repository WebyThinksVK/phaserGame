(function (){

  var slides;
  var index = 0;
  var button_next;
  var button_prev;
  var timeDelay = 3000;
  var timeDilay_Big = 10000;
  var timeDilay_Small = 100;

  var mainTheme;
  var crash;
  var silent;
  var action;

  var oneSlide;

  var trigger;

  var button_game;
  var buttonSong;


  window.presentSnowPong = {

      preload: function (){
          gameLoad().image('slide_1', 'assets/img/presentGameSnowPong/1.png');
          gameLoad().image('slide_2', 'assets/img/presentGameSnowPong/2.png');
          gameLoad().image('slide_3', 'assets/img/presentGameSnowPong/3.png');
          // gameLoad().image('slide_4', 'assets/img/presentGameSnowBall/slide_4.png');
          // gameLoad().image('slide_5', 'assets/img/presentGameSnowBall/slide_5.png');
          // gameLoad().image('slide_6', 'assets/img/presentGameSnowBall/slide_6.png');
          // gameLoad().image('slide_7', 'assets/img/presentGameSnowBall/slide_7.png');

          gameLoad().audio('mainTheme',  'assets/audio/new/Present2.ogg');
          // gameLoad().audio('crash',  'assets/audio/Carsh.ogg');
          // gameLoad().audio('silent',  'assets/audio/Nctrnm_-_01_-_Concern(action).ogg');
          // gameLoad().audio('action',  'assets/audio/Golden_Duck_Orchestra_-_02_-_Alien.ogg');
      },

      create: function () {
          buttonSong = gameAdd().audio('buttonSong');

          slides = gameAdd().group()
          oneSlide = slides.create(0, 0, 'slide_1');
          oneSlide.alpha = 0;
          gameAdd().tween(oneSlide).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0);

          mainTheme = gameAdd().audio('mainTheme');
          mainTheme.volume = 0.5;
          mainTheme.play();

          crash = gameAdd().audio('crash');
          crash.volume = 0.5;
          silent = gameAdd().audio('silent');

          action = gameAdd().audio('action');

          button_next = gameAdd().button(600, 390, 'arrow', this.goNext, this, 1, 2 ,0);
          button_next.alpha =  0;

          button_game = gameAdd().button(400, 390, 'button_play', this.goGame, this, 2, 0 ,1);
          button_game.anchor.setTo(0.5, 0.5);
          // button_game.alpha = 0;
          button_game.kill();

      },

      update: function () {

        if (button_next.alpha ==  0 && index + 1 !== 3 ){
               gameAdd().tween(button_next).to( { alpha: 1 }, 8000, Phaser.Easing.Exponential.Out, true, 0);
        }
      },

      goNext: function (){
            buttonSong.play();
            if(index + 1 == 2){
                button_game.reset(400, 390);
                var anim_start = gameAdd().tween(button_game).to({ width: 0.9*button_game.width, height: 0.9*button_game.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();
                button_next.kill();
            }
            var slide = slides.getChildAt(index);
            ++index;
            if (index + 1 == 2){
            }

            if (index + 1 == 4){

              var tween_1 = gameAdd().tween(slide).to( { alpha: 0 }, timeDilay_Small, Phaser.Easing.Exponential.Out, true, 0);
              tween_1.onStart.add(this.start, this);
              tween_1.onComplete.add(this.killAll, this);
            }else {
              var tween_2 = gameAdd().tween(slide).to( { alpha: 0 }, timeDelay , Phaser.Easing.Exponential.Out, true, 0);
              tween_2.onStart.add(this.start, this);
              tween_2.onComplete.add(this.killAll, this);
            }
      },

      start: function (){
          var slide = slides.create(0, 0, 'slide_' + (index + 1));
          //alert(index);
          slide.alpha = 0;

          if (index + 1 == 4){
              gameAdd().tween(slide).to( { alpha: 1 }, timeDilay_Big , Phaser.Easing.Linear.None, true, 0);
          } else{
              gameAdd().tween(slide).to( { alpha: 1 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);//Phaser.Easing.Linear.None
          }
      },

      goBack: function (){
        if(index + 1 < 7){
            gameAdd().tween(button_next).to({alpha: 1}, timeDilay_Small, Phaser.Easing.Exponential.Out, true, 0);
        }
        gameAdd().tween(button_next).to({alpha: 0}, timeDilay_Small, Phaser.Easing.Exponential.Out, true, 0);
          if(index + 1 < 7 && index + 1 > 3){
            // action.stop();
            // silent.play();
          }
          buttonSong.play();
          var slide = slides.getChildAt(index);
          --index;
          var tween = gameAdd().tween(slide).to( { alpha: 0 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);

          tween.onStart.add(this.back, this);
          tween.onComplete.add(this.killAll, this);

      },
      back: function () {
        // var slide = slides.getChildAt(index).kill() ;
        var slide = slides.create(0, 0, 'slide_' + (index + 1));
        slide.alpha = 0;
        gameAdd().tween(slide).to( { alpha: 1 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
        // if (index < 1){
        //       gameAdd().tween(button_prev).to( { x : -200 }, timeDelay, Phaser.Easing.Exponential.Out, true, 0);
        // }
      },
      killAll: function (something) {
        something.kill();
      },
      goGame: function (){
          gameSound().stopAll();
          index = 0;
          changeState('snowPongGame');
      }


  };
}())
