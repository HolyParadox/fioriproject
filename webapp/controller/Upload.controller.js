// Create a FileUploader control
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/unified/FileUploader"


],  function(Controller, UploadController) {
  "use strict";
  return Controller.extend("travelexpenses.controller.Upload", {

      onInit: function() {
            var oPopupView = sap.ui.xmlview({ viewName: "travelexpenses.view.Upload" });
          
           oPopupView.open();
  
          var oFileUploader = new sap.ui.unified.FileUploader({
              name: "pdfUploader",
              uploadUrl: "/uploadPdf",
              uploadComplete: function(oEvent) {
                // Get the uploaded file name and description
                var sFileName = oEvent.getParameter("files")[0].name;
                var sDescription = "Some description";
                
  
                // Add the file name and description to the table
                var oTable = sap.ui.getCore().byId("pdfTable");
                var oModel = oTable.getModel();
                var aData = oModel.getData().pdfs;
                aData.push({name: sFileName, description: sDescription});
                oModel.setData({pdfs: aData});
                this.getView().byId("pdfLayout").addContent(oTable);

              }
            });
            var oTable = new sap.ui.table.Table("pdfTable", {
              title: "Uploaded PDFs",
              columns: [
                new sap.ui.table.Column({
                  label: "Name",
                  template: new sap.ui.commons.Link({
                    text: "{name}",
                    press: function(oEvent) {
                      // Get the URL of the selected PDF
                      var sPdfUrl = "/pdfs/" + oEvent.getSource().getBindingContext().getProperty("name");
                      
                      // Open the PDF in a new window
                      window.open(sPdfUrl, "_blank");
                    }
                  })
                }),
                new sap.ui.table.Column({
                  label: "Description",
                  template: new sap.ui.commons.TextView({text: "{description}"})
                })
              ]
            });
            
            // Set the table data
            var oModel = new JSONModel({pdfs: []});
            oTable.setModel(oModel);
            

            // Add the FileUploader and table to the view
            this.getView().byId("pdfLayout").addContent(oFileUploader);
            this.getView().byId("pdfLayout").addContent(oTable);
          },
          
   
        onSubmit: function() {
          var oData = this.getView().getModel("formData").getData();
          var oTableModel = this.getView().getModel("tableModel");
          oTableModel.getData().items.unshift(oData);
          oTableModel.refresh();
          
          var uploadController = new UploadController(this.getView());
          uploadController.upload(oData);
      },
      
      
  });

  });