import { observable, computed, action, decorate } from "mobx";
import { Tests, Results, History} from '../components/exporter';

export default class RootState {

    // activeTab = Tests;

    // activeTabSetter = event => {
    //     const components = [
    //         Tests,
    //         Results,
    //         History
    //     ];
       
    //     // console.log(activeTab);
        
    //     components.forEach(component => {
    //         if (component.name === event.currentTarget.id) {
    //             // console.log(component.name);
    //             // console.log(component);
    //             let activeTab = component;
    //             return activeTab;
    //         } 
    //     }) ;

    //     decorate(RootState, {
    //         activeTab: observable,
    //         activeTabSetter: action
    //     })
    // }
}
