function duplicatePageItemToNewLayer(numberOfCopies, layerPrefix) {
    try {
      var doc = app.activeDocument;
      var originalLayer = doc.activeLayer;
      var sourcePageItem = originalLayer.pageItems[0];
  
      if (!sourcePageItem) {
        throw new Error(
          "There are no page items in the original layer to duplicate."
        );
      }
  
      for (var i = 1; i <= numberOfCopies; i++) {
        var newLayer = doc.layers.add();
        newLayer.name = layerPrefix + "_" + i;
  
        var duplicatedItem = sourcePageItem.duplicate();
        duplicatedItem.move(newLayer, ElementPlacement.PLACEATBEGINNING);
      }
    } catch (e) {
      alert("An error occurred: " + e.message);
    }
  }
  
  
  duplicatePageItemToNewLayer(10, "logo");
  