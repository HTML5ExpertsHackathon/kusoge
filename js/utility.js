var helper = {

    //点数を表示するラベルのフォント
    SCORE_LABEL_FONT: "12px Goudy Stout",
    //同ラベルの文字の色
    SCORE_LABEL_COLOR: "blue",
    //同ラベルの位置
    SCORE_LABEL_POSITION_X: 10,
    SCORE_LABEL_POSITION_Y: 5,
    NOTE_LABEL_POSITION_X: -20,
    NOTE_LABEL_POSITION_Y: 0,
    NOTE_LABEL_FONT: "18px Goudy Stout",
    ctrl_scoreLabel: null,
    ctrl_coins: [],
    ctrl_note: null,

    ASSET_SOUND_BGM: "sound/bgm1.mp3",
    ASSET_SOUND_GANEOVER: "sound/gameover.mp3",
    ASSET_SOUND_HIT: "sound/hit.wav",
    ASSET_SOUND_CLEAR: "sound/clear.mp3",
    ASSET_SOUND_FALL: "sound/fall.wav",

    sound_get_coin: null,
    sound_game_bgm: null,
    sound_gameOver: null,
    sound_gameClear: null,
    sound_playerFall: null,

    got_coins_count: 0,


    setSoundAsset: function () {
        helper.sound_game_bgm = new Audio(helper.ASSET_SOUND_BGM);
        helper.sound_gameOver = new Audio(helper.ASSET_SOUND_GANEOVER);
        helper.sound_hit = new Audio(helper.ASSET_SOUND_HIT);
        helper.sound_gameClear = new Audio(helper.ASSET_SOUND_CLEAR);
        helper.sound_playerFall = new Audio(helper.ASSET_SOUND_FALL);
    },

    loadBackGroundPicture: function (game) {
        var bgPicture = new Sprite(320, 320);
        bgPicture.image = game.assets["img/back.png"];
        bgPicture.x = 0;
        bgPicture.y = 0;
        game.rootScene.addChild(bgPicture);
    },
    addLabel: function () {
        var ctrl_scoreLabel = helper.utility.createLabel("SCORE : 0",
                helper.SCORE_LABEL_FONT,
                helper.SCORE_LABEL_COLOR,
                helper.SCORE_LABEL_POSITION_X,
                helper.SCORE_LABEL_POSITION_Y);
        game.rootScene.addChild(ctrl_scoreLabel);
        helper.ctrl_scoreLabel = ctrl_scoreLabel;
    },
    addCoin: function (game, stage, start_x, coinCount) {
        var ctrl_coin;
        for (var i = 0; i < coinCount; i++) {
            ctrl_coin = helper.utility.createNewItem(game, "img/coin.png", 20, 20, start_x, 125);
            helper.ctrl_coins.push(ctrl_coin);
            stage.addChild(ctrl_coin);
            start_x += 25;
        }
    },
    addNote: function (stage) {
        var note = helper.utility.createLabel("♪",
                helper.SCORE_LABEL_FONT,
                "black",
                helper.NOTE_LABEL_POSITION_X,
                helper.NOTE_LABEL_POSITION_Y);
        stage.addChild(note);
        helper.ctrl_note = note;
    },
    showNote: function (posX, posY) {
        helper.ctrl_note.x = posX;
        helper.ctrl_note.y = posY;
    },
    setScoreLabel: function (score) {
        helper.ctrl_scoreLabel.text = "SCORE:" + score;
    },
    utility: {
        //:点数/ステージなどのラベルを生成
        createLabel: function (labelText, fontName, fontColor, posX, posY) {
            var infoLabel = new Label(labelText);
            infoLabel.font = fontName;
            infoLabel.color = fontColor;
            infoLabel.x = posX;
            infoLabel.y = posY;
            return infoLabel;
        },
        createNewItem: function (game, assetName, height, width, posX, posY) {
            var sp = new Sprite(height, width);
            sp.image = game.assets[assetName];
            sp.x = posX;
            sp.y = posY;
            return sp;
        }
    }
}

