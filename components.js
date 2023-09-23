class Listener {
    constructor(event, func){
        this.event = event;
        this.func = func;
        // interface
    }
}

class Component {
    constructor(selector = null,listener = null,values = null,styles = null,id = null){
        this.htmlElement = document.querySelector(selector);
        this.selector = selector;
        this.values = values;
        this.listener = listener;
        this.id = id;
        this.styles = styles; // e.g. styles = {"hidden":["display","none"]}
    }

    attachListener(){
        if (this.listener != null){
            this.htmlElement.addEventListener(
                this.listener.event,
                ()=>{this.listener.func(this)}
                // pass in context variable to function during component declaration to access the object in the function 
            )
        }
    }

    renderObjectValueOnHTML(key){
        this.htmlElement.innerHTML = this.values[key];
    }

    renderIndependentValueOnHTML(value){
        this.htmlElement.innerHTML = value;
    }

    overwriteStyles(index = undefined){
        if (this.styles != null && index == undefined){
            Object.keys(this.styles).forEach(
                style=>{
                    let [attribute,value] = this.styles[style];
                    this.htmlElement.style[attribute] = value;
                }
            )
        } else if (this.styles != null){
            let [attribute, value] = this.styles[index];
            this.htmlElement.style[attribute] = value;
        }
    }
}

class ComponentManager extends Component{
    constructor (selector = null,listener = null,values = null,styles = null,id = null, components = {}) {
        super(selector,listener,values,styles,id);
        this.components = components;
    }

    add(component){
        this.components[component.id] = component;
        return this;
    }

    get(key){
        return this.components[key];
    }

    attachListeners(){
        Object.keys(this.components).forEach(
            key=>{
                this.components[key].attachListener();
            }
        )
    }
}