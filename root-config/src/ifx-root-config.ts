import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// Element ID "Empty Info"
document.getElementById("emptyinfo").hidden = true;
//const queryString = window.location.search
//const urlParams = new URLSearchParams(queryString);
//const hostpc = urlParams.get('hostpc')

//console.log(hostpc);




// Function Rest API
// API URL
async function getEquipment() {
 // let response = await fetch('http://bthtsa1030.infineon.com:8000/OPUIAPI/API/GetInitialData?hostName='+ hostpc)
 // let data = await response.json()
 let data = {equipmentName: 'HD-001'}
  console.log(data);
  return data;
}


//Call API to get mapping
getEquipment()
  .then(function(data) {
  // check equipment id
    let data0 = data[0];
    console.log(data0);
    let equipmentName = data0['equipmentName'];
    console.log(equipmentName)
    if(equipmentName != undefined) 
    {
      registerapps(equipmentName); 
    }
    else
    {
      document.getElementById("emptyinfo").hidden = false;
    }       

  })
  .catch(function(error) {
    console.log(error);
    document.getElementById("emptyinfo").hidden = false;
});
    


function registerapps(eqid) {
  //Register Applications into MappingLayout
  registerApplication({
    name: "@ifx/logdata",
    app: () => System.import("@ifx/logdata"),
    activeWhen: ["/"],
    customProps: { equipmentId: eqid},
  });

  registerApplication({
    name: "@ifx/metadata",
    app: () => System.import("@ifx/metadata"),
    activeWhen: ["/"],
    customProps: { equipmentId: eqid},
  });

  
  registerApplication({
    name: "@loadnGo",
    app: () => System.import("@loadnGo"),
    activeWhen: ["/"],
    customProps: { equipmentId: eqid},
  });

  
}

layoutEngine.activate();
start();
