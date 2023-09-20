class Listener {
    constructor(event, func){
        this.event = event;
        this.func = func;
        // interface
    }
}

class Component {
    constructor(selector,listener,values,styles,id){
        this.htmlElement = document.querySelector(selector);
        this.selector = selector;
        this.values = values;
        this.listener = listener;
        this.id = id;
        this.styles = {}; // e.g. style = ["backgroundColor","red"];
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

    overwriteStyles(){
        Object.keys(this.styles).forEach(
            style=>{
                this.htmlElement.style[style[0]] = style[1];
            }
        )
    }
}

class ComponentManager {
    constructor (components = {}) {
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