import { observable, computed, action, decorate } from "mobx";

class RootState {
    
    @observable activeTab =  Tests;

    @action activeTabSetter = event => {
        // let newActiveTab = event.currentTarget.id;
        const components = [
            Tests,
            Results,
            History
          ];
    
    //     //   console.log(event.target.className);
    //     console.log(event.currentTarget.id);
        
        components.forEach(component => {
            if (component.name === event.currentTarget.id) {
                console.log(component.name);
                console.log(component);
                return component;
            } 
        }) ;

}

export default RootState; 