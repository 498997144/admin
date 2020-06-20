import Toastcomponent from "./Toast";

const toast = {};
toast.install = Vue => {
   const Toastcom = Vue.extend(Toastcomponent);
   const instance = new Toastcom();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$toast = (message='',callback) => {
        instance.message = message;
        instance.isShow = true;
        // instance.callback = callback;
        instance.callback = () =>{
            callback && callback();
            instance.isShow = false;
        }
    }
}

export default toast;






