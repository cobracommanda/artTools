var cmykPattern = /^C=\d+ M=\d+ Y=\d+ K=\d+$/;
var highlightShadowPattern = /(_highlight|_shadow)(\s+\d+)?$/;

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    var swatches = doc.swatches;

    if (swatches.length > 0) {
        var swatchNames = [];

        for (var i = 0; i < swatches.length; i++) {
            var swatch = swatches[i];

            if (!cmykPattern.test(swatch.name) && !highlightShadowPattern.test(swatch.name)) {
                if (swatch.name === "[None]" || swatch.name=== "[Registration]") {
                    continue
                }
                swatchNames.push(swatch.name);
            }
        }

        var filePath = "~/Desktop/swatch_colors.js"; // Change the path as needed
        var file = new File(filePath);
        file.open("w");
        file.write("var swatchColors = [\n");

        for (var j = 0; j < swatchNames.length; j++) {
            file.write("\t" + '"'+ swatchNames[j] + '"');

            if (j !== swatchNames.length - 1) {
                file.write(",");
            }

            file.write("\n");
        }

        file.write("];\n");
        file.close();

        alert("Swatch color names (excluding specified patterns) have been saved to the file 'swatch_colors.txt' on your desktop.");
    } else {
        alert("There are no swatches in the document.");
    }
} else {
    alert("There are no open documents.");
}
