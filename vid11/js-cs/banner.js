class MsgBanner{
    msgs = new Array();
    htmlElem = null;

    constructor(htmlElem){
        this.htmlElem = htmlElem;

        const style = document.createElement("style");
        style.innerHTML = `
            .msg-bnr{
                width: 100%;
                border: 2px solid gray;
                display: flex;
                flex-direction: column;
                visibility: hidden;
            }
            .msg-bnr-info{
                flex: 1;
                text-align: left;
                color: white;
                font-weight: bolder;
                background-color: green;
                padding: 2px 4px;
            }
            .msg-bnr-wrn{
                flex: 1;
                text-align: left;
                color: white;
                font-weight: bolder;
                background-color: goldenrod;
                padding: 2px 4px;
            }
            .msg-bnr-err{
                flex: 1;
                text-align: left;
                color: white;
                font-weight: bolder;
                background-color: red;
                padding: 2px 4px;
            }`

        document.getElementsByTagName("head")[0].appendChild(style);
        this.htmlElem.className = "msg-bnr";
    }

    addInfo(msg){
        this.msgs.push( {text: msg, type: "info"} );
        this._update();
    }

    addErr(msg){
        this.msgs.push( {text: msg, type: "err"} );
        this._update();
    }

    addWrn(msg){
        this.msgs.push( {text: msg, type: "wrn"} );
        this._update();
    }
    _update(){
        this.htmlElem.replaceChildren();
        for(const msg of this.msgs){
            const div = document.createElement("div");
            let className = "msg-bnr-info";
            if(msg.type == "err"){
                className = "msg-bnr-err";
            }
            if(msg.type == "wrn"){
                className = "msg-bnr-wrn";                        
            }
            div.className = className;
            div.innerHTML = msg.text;
            this.htmlElem.appendChild(div);
        }
        if(this.msgs.length == 0){
            this.htmlElem.style.visibility = "hidden";
        }else{
            this.htmlElem.style.visibility = "visible";
        }
    }

    clear(){
        this.msgs = new Array();
        this._update();
    }
}