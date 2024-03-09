function duplicatePageItemToNewLayer(numberOfCopies, layerPrefix, swatchNames) {
    try {
        var doc = app.activeDocument;
        var originalLayer = doc.activeLayer;
        var sourcePageItem = originalLayer.pageItems[0];

        if (!sourcePageItem) {
            throw new Error(
                "There are no page items in the original layer to duplicate."
            );
        }

        // Check if the number of swatch names matches the desired number of copies
        if (swatchNames.length !== numberOfCopies) {
            throw new Error(
                "The number of swatch names does not match the desired number of copies."
            );
        }

        for (var i = 0; i < numberOfCopies; i++) {
            var newLayer = doc.layers.add();
            newLayer.name = layerPrefix + "_" + (i + 1);

            var duplicatedItem = sourcePageItem.duplicate();
            duplicatedItem.move(newLayer, ElementPlacement.PLACEATBEGINNING);

            // Apply swatch color to the duplicated item
            var swatchName = swatchNames[i];
            var swatch = doc.swatches.getByName(swatchName);

            if (swatch) {
                duplicatedItem.filled = true; // Ensure the item is filled
                duplicatedItem.fillColor = swatch.color;
            } else {
                alert("Swatch with name '" + swatchName + "' not found.");
            }
        }
    } catch (e) {
        alert("An error occurred: " + e.message);
    }
}

var swatchColors = [
	"Medium Purple",
	"Medium Purple 2",
	"Lilac",
	"Lilac 2",
	"Lilac 3",
	"Lilac 4",
	"Aquamarine",
	"Aquamarine 2",
	"Aquamarine 3",
	"Aquamarine 4",
	"Malibu",
	"Malibu 2",
	"Malibu 3",
	"Malibu 4",
	"Blueberry"
];


duplicatePageItemToNewLayer(swatchNames.length, "logo", swatchNames);
