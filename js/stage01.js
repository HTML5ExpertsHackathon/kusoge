
thisGame.stages.stage01 = {
    //背景をスクロールさせるスピード
    BACKGROUND_SCROLL_SPEED: 10,
    //現在のシーン
    currentScene: null,
    //障害物のインスタンス
    ctrl_trap1: null,
    ctrl_trap2: null,
    ctrl_trap3: null,

    ctrl_ground1: null,
    ctrl_ground2: null,
    ctrl_ground3: null,

    ctrl_groundLine: null,

    ctrl_Map: null,

    //背景画像
    ctrl_backGround1: null,
    ctrl_backGround2: null,
    //スクロールのカウント
    scrollCount: 0,

    ctrl_group: null,

    _privGround: null,

    //ステージ 1 で使用するコントロールをセット
    setCtrl: function (game) {
        var createTrap = thisGame.ctrlUtilitys.createTrap;
        var createGround = thisGame.ctrlUtilitys.createGround;
        var createMap = thisGame.ctrlUtilitys.createMap;
        //障害物のインスタンスを生成
        this.ctrl_trap1 = createTrap(game, thisGame.ASSET_PIC_TRAP2, 48, 48);
        this.ctrl_trap2 = createTrap(game, thisGame.ASSET_PIC_TRAP1, 48, 48);
        this.ctrl_trap3 = createTrap(game, thisGame.ASSET_PIC_TRAP3, 85, 60);

        this.ctrl_Map = createMap(game, thisGame.ASSET_PIC_MAP, 16, 16);

        this.ctrl_ground1 = createGround(game, thisGame.ASSET_PIC_GROUND2, 200, 35, 0, 0);
        this.ctrl_trap1.y = this.ctrl_ground1.y - this.ctrl_trap1.height;
        this.ctrl_ground2 = createGround(game, thisGame.ASSET_PIC_GROUND2, 200, 35, 250, 40);
        this.ctrl_trap2.y = this.ctrl_ground2.y - this.ctrl_trap2.height;
        this.ctrl_ground3 = createGround(game, thisGame.ASSET_PIC_GROUND2, 200, 35, 500, -40);
        this.ctrl_trap3.y = this.ctrl_ground3.y - this.ctrl_trap3.height;

        this.ctrl_groundLine = createGround(game, thisGame.ASSET_PIC_GROUND_LINE, thisGame.GAME_WIDTH, 35, 0, 355);

        return this;
    },
    //ステージ 1 でのイベントハンドラを設定
    setHandlers: function (game) {
        var player = thisGame.ctrl_player;
        var thisStage = thisGame.stages.stage01;
        var scrollBackGround = thisGame.ctrlUtilitys.scrollBackGround;
        var playerJump = thisGame.ctrlUtilitys.playerJump;
        var currentScene = game.currentScene;
        thisStage._privGround = thisStage.ctrl_ground1;
        //フレームごとのイベント処理
        currentScene.addEventListener(Event.ENTER_FRAME, function () {
            thisStage.handlers.enterFrame(game, thisGame.stages.stage01, player, thisGame.ctrlUtilitys, playerJump);
        }, false);
        

        thisStage.ctrl_group.addEventListener(Event.ENTER_FRAME, function () {
            thisStage.stageUtility.scrollJob2(thisStage);
        });

        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                playerJump(player);
            };
        });


        //ゲーム画面がタッチされた際の処理
        currentScene.addEventListener(Event.TOUCH_START, function (e) {
            //プレイヤーをジャンプさせる
            playerJump(player);
        }, false);
        return;
    },
    //コントロールをロード
    loadCtrls: function (currentScene) {

        var group = new Group();
        group.addChild(this.ctrl_trap1);
        group.addChild(this.ctrl_trap2);
        group.addChild(this.ctrl_trap3);
        group.addChild(this.ctrl_ground1);
        group.addChild(this.ctrl_ground2);
        group.addChild(this.ctrl_ground3);
        group.addChild(this.ctrl_groundLine);
        group.addChild(this.ctrl_Map);
        currentScene.addChild(group);
        currentScene.addChild(thisGame.ctrl_scoreLabel);
        currentScene.addChild(thisGame.ctrl_residueLabel);
        currentScene.addChild(thisGame.ctrl_stageLabel);
        currentScene.addChild(thisGame.ctrl_player);
        this.ctrl_group = group;
     
        return this;
    },
    handlers: {
        //フレームごとの処理
        enterFrame: function (game, stage, player, utility, playerJump) {

            //上ボタンが押されたらジャンプ
            if (game.input.up) {
                playerJump(player);
                game.input.up = false;
            }
            
            thisGame.utilitys.isPlayerHit(player, stage.ctrl_trap1);
            thisGame.utilitys.isPlayerHit(player, stage.ctrl_trap2)
            thisGame.utilitys.isPlayerHit(player, stage.ctrl_trap3)


            if (player.intersect(stage.ctrl_ground1)) {
                player.y = stage.ctrl_ground1.y - player.height;
                stage._privGround = stage.ctrl_ground1;
            } else if (player.intersect(stage.ctrl_ground2)) {
                player.y = stage.ctrl_ground2.y - player.height;
                stage._privGround = stage.ctrl_ground2;
            } else if (player.intersect(stage.ctrl_ground3)) {
                player.y = stage.ctrl_ground3.y - player.height;
                stage._privGround = stage.ctrl_ground3;
            } else if (player.intersect(stage.ctrl_groundLine)) {
                player.y = 565;
                stage._privGround = stage.ctrl_groundLine;
            } else {
                if (stage._privGround == null) {
                    player.y += stage.BACKGROUND_SCROLL_SPEED;
                    return;
                };
                if ((player.x > stage._privGround.x) && (player.x < stage._privGround.x + stage._privGround.width))
                { } else {
                    player.y += stage.BACKGROUND_SCROLL_SPEED;
                    stage._privGround = null;
                }
            }

        }
    },
    //ステージ独自の処理
    stageUtility: {

        scrollJob2: function (stage) {
            stage.ctrl_group.x--;
        },

        //背景その他のスクロール処理
        scrollJob: function (game, stage, player, utility) {
            var bkground1 = stage.ctrl_backGround1;
            var bkground2 = stage.ctrl_backGround2;
            var gameWidth = thisGame.GAME_WIDTH;
            var scrollSpeed = stage.BACKGROUND_SCROLL_SPEED;
            var scrollCount = stage.scrollCount;

            /*
            if (game.input.right) {
                game.input.left = false;
                */
            //背景を左方向にスクロール (左キー:前進)
            utility.fowordBgPicJob(player, bkground1, bkground2, scrollSpeed, gameWidth);
            stage.stageUtility.fowardTrap(stage);
        },
        fowardTrap: function (stage) {
            var trap1 = stage.ctrl_trap1;
            var trap2 = stage.ctrl_trap2;
            var trap3 = stage.ctrl_trap3;

            var ground1 = stage.ctrl_ground1;
            var ground2 = stage.ctrl_ground2;
            var ground3 = stage.ctrl_ground3;

            var scrollSpeed = stage.BACKGROUND_SCROLL_SPEED;
            var scrollCount = stage.scrollCount;
            var gameWidth = thisGame.GAME_WIDTH;

            scrollCount += scrollSpeed;

            thisGame.ctrl_scoreLabel.text = scrollCount;

            //fowordItem(trap1, 200);
            //fowordItem(trap2, 400);
            fowordItem(trap3, 200, 1.2, true);


            fowordGround(ground1, 10, trap1);
            fowordGround(ground2, 10, trap2);
            fowordGround(ground3, 10);


            //背景に合わせてアイテムをスクロールさせる共通関数
            function fowordItem(item, x_gap, acceleration, effectFlg) {
                if ((scrollCount % x_gap === 0) && (item.x <= -(item.width - 10))) { item.x = gameWidth; }
                if (item.x > -item.width) {
                    item.x -= (acceleration) ? scrollSpeed * acceleration : scrollSpeed;
                }
                if (effectFlg) { item.frame = (item.frame > 0) ? 0 : 1; }
            }
            function fowordGround(item, x_gap, trap) {
                item.x -= scrollSpeed;
                if (trap != null) trap.x -= scrollSpeed;
                if (item.x <= -(item.width - x_gap)) {
                    item.x = gameWidth;
                    if (trap != null) trap.x = (gameWidth + 50);
                }
            }
            stage.scrollCount = scrollCount;
        },
        rewindTrap: function (stage) {
            var trap1 = stage.ctrl_trap1;
            var trap2 = stage.ctrl_trap2;
            var trap3 = stage.ctrl_trap3;
            var scrollSpeed = stage.BACKGROUND_SCROLL_SPEED;
            var scrollCount = stage.scrollCount;
            var gameWidth = thisGame.GAME_WIDTH;
            scrollCount -= scrollSpeed;


            /*
            if (scrollCount % 1280 === 0) {              // 1280m走るごとに
                trap1.x = -50;                    // ハードルを右端に移動(出現)
            }
            */
            if (trap1.x > -trap1.width) { // ハードルが出現している(画面内にある)とき
                trap1.x += scrollSpeed;   // ハードルをスクロール
            }

            /*
            if (scrollCount % 1600 === 0) {              // 1600m走るごとに
                trap2.x = -56;                    // ハードルを右端に移動(出現)
            }
            */

            if (trap2.x > -trap2.width) { // ハードルが出現している(画面内にある)とき
                trap2.x += scrollSpeed;   // ハードルをスクロール
            }
            stage.scrollCount = scrollCount;
        }
    }
}