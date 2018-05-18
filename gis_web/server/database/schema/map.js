const mongoose = require('mongoose')
const MapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rasterLayers: [],
  lon: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})
mongoose.model('Map', MapSchema)
// new Vue({
//   el: "#test-hot-app",
//   data: function() {
//     return {
//       root: "test-hot",
//       hotSettings: {
//         data: Handsontable.helper.createSpreadsheetData(50, 50),
//         rowHeaders: true,
//         colHeaders: true,
//         manualColumnMove: true,
//         manualRowMove: true,
//         stretchH: 'all',
//         afterChange: function (changes, source) {
//            if (source !== 'loadData') {
//              console.log(changes)
//             }
//           },
//         className: "htCenter"
//       },
//       people: [
//               {id: 1, name: {first: 'Joe', last: 'Fabiano'}, ip: '0.0.0.1', email: 'Joe.Fabiano@ex.com'},
//               {id: 2, name: {first: 'Fred', last: 'Wecler'}, ip: '0.0.0.1', email: 'Fred.Wecler@ex.com'},
//               {id: 3, name: {first: 'Steve', last: 'Wilson'}, ip: '0.0.0.1', email: 'Steve.Wilson@ex.com'},
//               {id: 4, name: {first: 'Maria', last: 'Fernandez'}, ip: '0.0.0.1', email: 'M.Fernandez@ex.com'},
//               {id: 5, name: {first: 'Pierre', last: 'Barbault'}, ip: '0.0.0.1', email: 'Pierre.Barbault@ex.com'},
//               {id: 6, name: {first: 'Nancy', last: 'Moore'}, ip: '0.0.0.1', email: 'Nancy.Moore@ex.com'},
//               {id: 7, name: {first: 'Barbara', last: 'MacDonald'}, ip: '0.0.0.1', email: 'B.MacDonald@ex.com'},
//               {id: 8, name: {first: 'Wilma', last: 'Williams'}, ip: '0.0.0.1', email: 'Wilma.Williams@ex.com'},
//               {id: 9, name: {first: 'Sasha', last: 'Silver'}, ip: '0.0.0.1', email: 'Sasha.Silver@ex.com'},
//               {id: 10, name: {first: 'Don', last: 'Pérignon'}, ip: '0.0.0.1', email: 'Don.Pérignon@ex.com'},
//               {id: 11, name: {first: 'Aaron', last: 'Kinley'}, ip: '0.0.0.1', email: 'Aaron.Kinley@ex.com'}
//     ]
//     };
//   },
//   components: {
//     HotTable
//   }
// });
