var helper = {

    //点数を表示するラベルのフォント
    SCORE_LABEL_FONT: "12px Goudy Stout",
    //同ラベルの文字の色
    SCORE_LABEL_COLOR: "blue",
    //同ラベルの位置
    SCORE_LABEL_POSITION_X: 10,
    SCORE_LABEL_POSITION_Y: 5,
    ctrl_scoreLabel: null,
    ctrl_coins: [],

    sound_get_coin: null,

    got_coins_count: 0,

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

