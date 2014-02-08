var thisGame = {

        /*--- 定数の定義 ---*/
        //ゲーム領域のサイズ
        GAME_WIDTH: 640, //768,
        GAME_HEIGHT: 640, //768,
        //ゲームの FPS
        GAME_FPS: 20, //35,

        //点数を表示するラベルのフォント
        SCORE_LABEL_FONT: "12px Goudy Stout",
        //同ラベルの文字の色
        SCORE_LABEL_COLOR: "blue",
        //同ラベルの位置
        SCORE_LABEL_POSITION_X: 10,
        SCORE_LABEL_POSITION_Y: 5,

        //プレイヤーの残数ラベルのフォント
        RESIDUE_LABEL_FONT: "12px Goudy Stout",
        //同ラベルの文字の色
        RESIDUE_LABEL_COLOR: "blue",

        ASSET_PIC_START: "img/start.png",
        ASSET_PIC_GAMEOVER: "img/gameover.png",

        ASSET_PIC_PLAYER: "img/chara1.png",
        PLAYER_WIDTH: 32,
        PLAYER_HEIGHT: 32,
        PLAYER_INIT_X: 80, //100,
        PLAYER_INIT_Y: 120,

        ASSET_PIC_BACK_GROUND1: "img/bk-ground.jpg",

        ASSET_PIC_GROUND1: "img/ground1.png",
        ASSET_PIC_GROUND2: "img/ground2.png",
        ASSET_PIC_GROUND3: "img/ground3.png",
        ASSET_PIC_GROUND_LINE: "img/groundLine.png",

        ASSET_PIC_TRAP1: "img/box.png",
        ASSET_PIC_TRAP2: "img/bomb.png",
        ASSET_PIC_TRAP3: "img/bird.jpg",

        ASSET_PIC_MAP: "img/map2.gif",


        //地平線の高さ
        GROUND_LINE: 540, //350,
        BROCK_LINE: 250,

    
        /*--- オブジェクトのインスタンスを格納する変数 ---*/
        //ゲーム全体 (enchant.js が提供する game オブジェクト)
        game: null,
       
        //プレイヤーのインスタンス
        ctrl_player: null,

        ctrl_trap1: null,
        ctrl_trap2: null,
        ctrl_trap3: null,

        //スコアを表示するラベル
        ctrl_scoreLabel: null,

        //プレイヤーの残数を表示するラベル
        ctrl_playerResidueLabel: null,

        //現在のステージを表示するラベル
        ctrl_stageLabel: null,

        //ゲーム表示領域 (HTML の div タグ)
        ctrl_gameStage: null,

        player_residue_count: 3,

      
        //コントロールのインスタンスを生成
        setCtrls: function () {

            //ゲームのインスタンスを生成
            var game = thisGame.ctrlUtilitys.createGame(thisGame.GAME_FPS, thisGame.GAME_WIDTH, thisGame.GAME_HEIGHT);

            // スコアを表示するラベルを生成
            var createLabel = this.ctrlUtilitys.createLabel;
            this.ctrl_scoreLabel = createLabel("SCORE : 0",
                this.SCORE_LABEL_FONT, this.SCORE_LABEL_COLOR, this.SCORE_LABEL_POSITION_X, this.SCORE_LABEL_POSITION_Y);

            //プレイヤーの残数を表示するラベルを生成
            this.ctrl_residueLabel = createLabel("PLAYER: 3",
                this.RESIDUE_LABEL_FONT, this.RESIDUE_LABEL_COLOR, this.GAME_WIDTH - 150, this.SCORE_LABEL_POSITION_Y);

            //ステージを表示するラベルを生成
            this.ctrl_stageLabel = createLabel("STAGE : 01",
                this.RESIDUE_LABEL_FONT, this.RESIDUE_LABEL_COLOR, (this.GAME_WIDTH / 2) - 90, this.SCORE_LABEL_POSITION_Y);

            thisGame.game = game;

            
            return this;
        },
       
        //ゲームの初期化
        initializeGame: function (eventEndler) {
            var game = thisGame.game;
            //ゲームの準備ができたら
            game.onload = function () {
                //プレイヤーのインスタンスを生成
                thisGame.ctrl_player = thisGame.ctrlUtilitys.createPlayer(game);

                //一番最初のステージ
                thisGame.utilitys.routingStage(0);

            }
            return this;
        },
        handlers: function () {

        },

        //コントロール (UI) 関連の処理
        ctrlUtilitys: {
            //ゲームのインスタンスを生成する
            createGame: function (fps, width, height) {
                var game = new Game(width, height);

                //フレームレートを指定
                game.fps = fps;
                //画像のプリロード
                game.preload(thisGame.ASSET_PIC_PLAYER,
                    thisGame.ASSET_PIC_START, thisGame.ASSET_PIC_GAMEOVER,
                    thisGame.ASSET_PIC_BACK_GROUND1,
                    thisGame.ASSET_PIC_TRAP1, thisGame.ASSET_PIC_TRAP2, thisGame.ASSET_PIC_TRAP3,
                    thisGame.ASSET_PIC_GROUND1, thisGame.ASSET_PIC_GROUND2, thisGame.ASSET_PIC_GROUND3,
                    thisGame.ASSET_PIC_GROUND_LINE, thisGame.ASSET_PIC_MAP);
                game.score = 0;
                return game;
            },
            //プレイヤーのインスタンスを生成
            createPlayer: function (game) {
                var player = new Sprite(thisGame.PLAYER_WIDTH, thisGame.PLAYER_HEIGHT);
                player.image = game.assets[thisGame.ASSET_PIC_PLAYER];
                player.x = thisGame.PLAYER_INIT_X;
                player.y = thisGame.GROUND_LINE - player.height;
                return player;
            },
            //障害物を生成
            createTrap: function (game,assetName, width, height) {
                var trap = new Sprite(width, height);
                trap.image = game.assets[assetName];
                trap.x = -width;                  // 横位置調整 画面外に隠しておく
                trap.y = thisGame.BROCK_LINE - trap.height;
                return trap;
            },
            //地面を生成
            createGround: function (game, assetName, width, height, posX,  height_Gap) {
                var ground = new Sprite(width, height);
                ground.image = game.assets[assetName];
                ground.x = posX;                  // 横位置調整 画面外に隠しておく
                ground.y = thisGame.BROCK_LINE + height_Gap;
                return ground;
            },
            //:点数/ステージなどのラベルを生成
            createLabel: function (labelText, fontName, fontColor, posX, posY) {
                var infoLabel = new Label(labelText);
                infoLabel.font = fontName;
                infoLabel.color = fontColor;
                infoLabel.x = posX;
                infoLabel.y = posY;
                return infoLabel;
            },
            //マップを作成する
            createMap: function (game, assetName, width, height) {
                    var map = new Map(width, height);
                    map.image = game.assets[assetName];
                    map.loadData([
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 18, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 18],
                        [18, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                        [18, 2, 2, 2, 2, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
                    ]);

                    var colMap = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    map.collisionData = colMap;
                    map.scale(2,2);

                    return map;
            },
            //プレイヤーをジャンプさせる
            playerJump: function (player) {
                player.tl.moveBy(0, -120, 12, enchant.Easing.CUBIC_EASEOUT)　//12フレームかけて現在の位置から上に120px移動
                          .moveBy(0, 120, 12, enchant.Easing.CUBIC_EASEIN); //12フレームかけて現在の位置から下に120px移動
            },
            //背景画像の設定
            insertBackGroundImg: function (stage, game, backGroundName) {
                var gameWidth = thisGame.GAME_WIDTH;
                var gameHeight = thisGame.GAME_HEIGHT;
                var currentScene = game.currentScene;
                var bkgImg = new Sprite(gameWidth, gameHeight);
                bkgImg.image = thisGame.game.assets[backGroundName];
                bkgImg.x = 0;
                bkgImg.y = 0;
                currentScene.addChild(bkgImg);

                stage.ctrl_backGround1 = bkgImg;

                var bkgImg2 = new Sprite(gameWidth, gameHeight);
                bkgImg2.image = thisGame.game.assets[backGroundName];
                bkgImg2.x = 640;
                bkgImg2.y = 0;
                currentScene.addChild(bkgImg2);

                stage.ctrl_backGround2 = bkgImg2;
            },
            fowordBgPicJob: function (player, bkground1, bkground2, scrollSpeed, gameWidth) {
                if (player.frame != 3) {
                    player.frame++;
                    if (player.frame > 2) { player.frame = 0 };
                }
                bkground1.x -= scrollSpeed;                // 背景1をスクロール
                bkground2.x -= scrollSpeed;                // 背景2をスクロール

                if (bkground1.x <= -gameWidth) {                  // 背景1が画面外に出たら
                    bkground1.x = gameWidth;                      // 画面右端に移動
                }
                if (bkground2.x <= -gameWidth) {                  // 背景2が画面外に出たら
                    bkground2.x = gameWidth;                      // 画面右端に移動
                }

            },
            rewindBgPicJob: function (player, bkground1, bkground2, scrollSpeed, gameWidth) {
                if (player.frame != 3) {
                    player.frame++;
                    if (player.frame > 2) { player.frame = 0 };
                }
                bkground1.x += scrollSpeed;                // 背景1をスクロール
                bkground2.x += scrollSpeed;                // 背景2をスクロール
                if (bkground1.x >= gameWidth) {                  // 背景1が画面外に出たら
                    bkground1.x = -gameWidth;                      // 画面右端に移動
                }
                if (bkground2.x >= gameWidth) {                  // 背景2が画面外に出たら
                    bkground2.x = -gameWidth;                     // 画面右端に移動
                }
            }
        },
        //関数群
        utilitys: {
            //ステージの振り分け
            routingStage: function (stageCount) {
                var player = thisGame.ctrl_player;
                var game = thisGame.game;
                //旧いシーン(ステージ)を削除
                game.popScene();
                //新しいシーンを生成
                var currentScene = new Scene();
                game.pushScene(currentScene);
                switch (stageCount) {
                    case 0:
                        //初回ステージへ
                        var stage01 = thisGame.stages.stage01;
                        thisGame.ctrlUtilitys.insertBackGroundImg(stage01, game, thisGame.ASSET_PIC_BACK_GROUND1);
                        stage01.setCtrl(game).loadCtrls(currentScene).setHandlers(game);
                        break;
                }
                
            },
            //プレイヤーにぶつかったかどうか判断
            isPlayerHit: function (player, target2) {
                if (player.within(target2, 10)) {
                    player.frame = 3;
                    thisGame.player_residue_count--;
                    thisGame.ctrl_residueLabel.text = "Player:" + thisGame.player_residue_count;
                    if (thisGame.player_residue_count === 0) {
                        thisGame.game.pushScene(thisGame.utilitys.createGameoverScene(10));
                    }
                }
            },
            getCenterPosition: function (contenoreWidth, targetWidth) {
                return (contenoreWidth / 2) - (targetWidth / 2);
            },
            createGameoverScene: function (scroll) {
                var game = thisGame.game;
                var scene = new Scene();                                   // 新しいシーンを作る
                scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';              // シーンの背景色を設定
                // ゲームオーバー画像を設定
                var gameoverImage = new Sprite(189, 97);                   // スプライトを作る
                gameoverImage.image = game.assets[thisGame.ASSET_PIC_GAMEOVER];  // 画像を設定
                gameoverImage.x = thisGame.utilitys.getCenterPosition(thisGame.GAME_WIDTH,189);                                      // 横位置調整
                gameoverImage.y = thisGame.utilitys.getCenterPosition(thisGame.GAME_HEIGHT, 97); // 縦位置調整
                scene.addChild(gameoverImage); // シーンに追加
                
                return scene;
            }
        },
        stages: {}
    };







    //ステージ 1 の処理
    





    enchant();
    window.focus();
    window.onload = function () {
        thisGame.setCtrls().initializeGame().game.start();
    }


