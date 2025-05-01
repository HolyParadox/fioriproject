sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/unified/FileUploader"


],

function (BaseController, JSONModel) {
  "use strict";

  return BaseController.extend("travelexpenses.controller.App", {
    onInit: function () {
      localStorage.clear();


      sap.ui.getCore().applyTheme("sap_fiori_3")
      var cssUrl = "../css/style.css";
      var htmlHead = document.getElementsByTagName("head")[0];
      var cssLink = document.createElement("link");
      cssLink.href = cssUrl;
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      htmlHead.appendChild(cssLink);

    var oTableModel = new JSONModel({ items: [] }); // Initialize items property to an empty array
        this.getView().setModel(oTableModel, "tableModel");
       var sData = localStorage.getItem("expenses");
        if (sData) {
          var oData = JSON.parse(sData);
          oTableModel.setData(oData);
      }
 
      console.log(sData);
 
      var oModel = new JSONModel({
        date: "",
        description: "",
        amount: "",
        currency: "",
        category: "",
      });
      this.getView().setModel(oModel);
      
    },

    onSubmit: function () {
      console.log("onSubmit function called");

      var sDescription = this.getView().byId("_IDGenInput1").getValue();
      var dDate = this.getView().byId("_IDGenDatePicker1").getValue();
      var fAmount = parseFloat(this.getView().byId("_IDGenInput2").getValue());
      var sCurrency = this.getView().byId("_IDGenInput3").getValue();
      var sCategory = this.getView().byId("_IDGenInput4").getValue();

      var oModel = this.getView().getModel("tableModel");
      var oNewItem = {
        date: dDate,
        description: sDescription,
        amount: fAmount,
        currency: sCurrency,
        category: sCategory,
      };


      var aItems = oModel.getData().items;
      aItems.push(oNewItem);
      oModel.setData({ items: aItems });

      console.log(aItems);
      console.log("onSubmit function called");

    localStorage.setItem("expenses", JSON.stringify(oModel.getData()));

      this.getView().byId("_IDGenInput1").setValue("");
      this.getView().byId("_IDGenDatePicker1").setValue("");
      this.getView().byId("_IDGenInput2").setValue("");
      this.getView().byId("_IDGenInput3").setValue("");
      this.getView().byId("_IDGenInput4").setValue("");

    },

    onOpenPopup: function() {
      var oDialog = new sap.m.Dialog({
        title: "Upload File",
        contentWidth: "600px",
        contentHeight: "300px",
        content: [
          sap.ui.xmlfragment("travelexpenses.view.Upload", this)
        ],
        beginButton: new sap.m.Button({
          text: "Close",
          press: function() {
            oDialog.close();
          }
        })
      });
    
      oDialog.open();
    }
  
  });
});
