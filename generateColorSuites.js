


#include "Granny Smith Apple/analogic-complement.js";
#include "Granny Smith Apple/monochrome-dark.js"
#include "Granny Smith Apple/monochrome-light.js";
#include "Granny Smith Apple/monochrome.js";



// createSwatches(Apricot_analogic_complement)
createSwatches(Granny_Smith_Apple_analogic_complement)
createSwatches(Granny_Smith_Apple_monochrome_dark)
createSwatches(Granny_Smith_Apple_monochrome_light)
createSwatches(Granny_Smith_Apple_monochrome)



function createSwatches(boxOfCrayons) {
    if (doc) {
        var colorCounts = {}; // Object to store counts of each color name
  
        for (var i = 0; i < boxOfCrayons.length; i++) {
            var colorObj = boxOfCrayons[i];
            var colorName = colorObj.name; // Get the name of the color
  
            // Increment the count for the current color name
            if (!colorCounts[colorName]) {
                colorCounts[colorName] = 1;
            } else {
                colorCounts[colorName]++;
            }
  
            var instanceIndex = colorCounts[colorName]; // Get the instance index
  
            // Create a folder for the color
            var swatchFolder = doc.swatchGroups.add();
            swatchFolder.name = instanceIndex > 1 ? colorName + ' ' + instanceIndex : colorName;
  
            // Create a new swatch for the color
            var newSwatch = doc.swatches.add();
            newSwatch.color = new CMYKColor();
            newSwatch.color.cyan = colorObj.cmyk.c;
            newSwatch.color.magenta = colorObj.cmyk.m;
            newSwatch.color.yellow = colorObj.cmyk.y;
            newSwatch.color.black = colorObj.cmyk.k;
            newSwatch.global = true;
            newSwatch.spot = false;
            newSwatch.name = instanceIndex > 1 ? colorName + ' ' + instanceIndex : colorName; // Set swatch name
  
            // Add the newly created swatch to the swatch folder
            swatchFolder.addSwatch(newSwatch);
  
            // Create swatches for highlight and shadow tones
            var highlightSwatch = doc.swatches.add();
            highlightSwatch.color = new CMYKColor();
            highlightSwatch.color.cyan = colorObj.tones.highlight.c;
            highlightSwatch.color.magenta = colorObj.tones.highlight.m;
            highlightSwatch.color.yellow = colorObj.tones.highlight.y;
            highlightSwatch.color.black = colorObj.tones.highlight.k;
            highlightSwatch.global = true;
            highlightSwatch.spot = false;
            highlightSwatch.name = instanceIndex > 1 ? colorName + '_highlight ' + instanceIndex : colorName + '_highlight';
            swatchFolder.addSwatch(highlightSwatch);
  
            var shadowSwatch = doc.swatches.add();
            shadowSwatch.color = new CMYKColor();
            shadowSwatch.color.cyan = colorObj.tones.shadow.c;
            shadowSwatch.color.magenta = colorObj.tones.shadow.m;
            shadowSwatch.color.yellow = colorObj.tones.shadow.y;
            shadowSwatch.color.black = colorObj.tones.shadow.k;
            shadowSwatch.global = true;
            shadowSwatch.spot = false;
            shadowSwatch.name = instanceIndex > 1 ? colorName + '_shadow ' + instanceIndex : colorName + '_shadow';
            swatchFolder.addSwatch(shadowSwatch);
        }
    } else {
        alert("No document open.");
    }
  }
  
  
//   createSwatches(Almond_analogic_complement)
//   createSwatches(Granny_Smith_Apple_analogic_complement)

