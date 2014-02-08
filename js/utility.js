var helper = {

    //点数を表示するラベルのフォント
    SCORE_LABEL_FONT: "12px Goudy Stout",
    //同ラベルの文字の色
    SCORE_LABEL_COLOR: "blue",
    //同ラベルの位置
    SCORE_LABEL_POSITION_X: 10,
    SCORE_LABEL_POSITION_Y: 5,
    addLabel:function () {
        var ctrl_scoreLabel = helper.utility.createLabel("SCORE : 0",
                helper.SCORE_LABEL_FONT,
                helper.SCORE_LABEL_COLOR,
                helper.SCORE_LABEL_POSITION_X,
                helper.SCORE_LABEL_POSITION_Y);
        game.rootScene.addChild(ctrl_scoreLabel);
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
        }
    }
}

