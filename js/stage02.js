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

    //背景画像
    ctrl_backGround1: null,
    ctrl_backGround2: null,
    //スクロールのカウント
    scrollCount: 0,

    _privGround: null,

    setCtrls: function () {
        //コントロールのインスタンスを変数に格納します。
    },
    setHandlers: function () {
        //イベントハンドラーを設定します。
    },
    handlers: {
        
    }


};