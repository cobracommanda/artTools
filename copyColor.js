function duplicatePageItemArrayToNewLayer(
    originalLayer,
    swatchNames,
    layerPrefix
  ) {
    var duplicatedItems = [];
    for (var i = 0; i < swatchNames.length; i++) {
      var swatchName = swatchNames[i];
      var newLayer = originalLayer.parent.layers.add();
      newLayer.name = layerPrefix + "_" + (i + 1);
  
      var sourcePageItem = originalLayer.pageItems[0];
      var duplicatedItem = sourcePageItem.duplicate();
      duplicatedItem.move(newLayer, ElementPlacement.PLACEATBEGINNING);
  
      duplicatedItems.push(duplicatedItem);
    }
    return duplicatedItems;
  }
  
  function fillCompoundObjectWithColors(swatchNames) {
    try {
      var doc = app.activeDocument;
      var originalLayer = doc.activeLayer;
      var compoundObject = originalLayer.pageItems[0];
  
      if (!compoundObject || compoundObject.typename !== "CompoundPathItem") {
        throw new Error("The selected item is not a compound path.");
      }
  
      var pathItems = getCompoundPathItems(compoundObject);
  
      for (var i = 0; i < pathItems.length; i++) {
        var pathItem = pathItems[i];
  
        var swatchIndex = i % swatchNames.length;
        var swatchName = swatchNames[swatchIndex];
        var swatch = doc.swatches.getByName(swatchName);
  
        //    alert("Processing path item " + i + ", Swatch index: " + swatchIndex + ", Swatch name: " + swatchName); // Debug statement
  
        if (swatch) {
          var fillColor = new CMYKColor();
          fillColor.cyan = swatch.color.cyan;
          fillColor.magenta = swatch.color.magenta;
          fillColor.yellow = swatch.color.yellow;
          fillColor.black = swatch.color.black;
          pathItem.filled = true; // Ensure the item is filled
          pathItem.fillColor = fillColor;
        } else {
          alert("Swatch with name '" + swatchName + "' not found.");
        }
      }
    } catch (e) {
      alert("An error occurred: " + e.message);
    }
  }
  
  // Function to recursively retrieve all path items in a compound path
  function getCompoundPathItems(compoundPathItem) {
    var pathItems = [];
    for (var i = 0; i < compoundPathItem.pathItems.length; i++) {
      var pathItem = compoundPathItem.pathItems[i];
      if (pathItem.typename === "PathItem") {
        pathItems.push(pathItem);
      } else if (pathItem.typename === "CompoundPathItem") {
        pathItems = pathItems.concat(getCompoundPathItems(pathItem));
      }
    }
    return pathItems;
  }
  
  var originalLayer = app.activeDocument.activeLayer;
  var swatchNames = [
    ["Medium Purple"],
    ["Medium Purple 2"],
    ["Lilac"],
    ["Lilac 2"],
    ["Lilac 3"],
    ["Aquamarine"],
    ["Aquamarine 2"],
    ["Aquamarine 3"],
    ["Aquamarine 4"],
    ["Malibu"],
    ["Malibu 2"],
    ["Malibu 3"],
    ["Malibu 4"],
    ["Blueberry"],
  ];
  var layerPrefix = "logo";
  
  var duplicatedItems = duplicatePageItemArrayToNewLayer(
    originalLayer,
    swatchNames,
    layerPrefix
  );
  for (var i = 0; i < duplicatedItems.length; i++) {
    app.activeDocument.activeLayer = duplicatedItems[i].layer;
    fillCompoundObjectWithColors(swatchNames[i]);
  }
  