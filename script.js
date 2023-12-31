const _Manager = new ComponentManager();

const clickEvent = new Listener(
    "click",
    (ctx)=>{
        ctx.values["test"] += 1;
        ctx.renderObjectValueOnHTML("test");
    }
)

const inputEvent = new Listener(
    "input",
    (ctx)=>{
        document.querySelector("#result").innerHTML = ctx.htmlElement.value;
    }
)

const button = new Component("#button-component",clickEvent, {test:0},{"hidden":["display","none"]}, "button");

const input = new Component("#input-component",inputEvent,{},null,"inp");

_Manager.add(button).add(input);
_Manager.attachListeners();
