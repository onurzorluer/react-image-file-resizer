/** 
*
* @author Onur Zorluer.
*
*/
import React, { Component } from 'react';

class Resizer extends Component {

    static changeHeightWidth(height, maxHeight, width, maxWidth) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
        if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
        return {height, width}
    }

    static resizeAndRotateImage(image, maxHeight, maxWidth, compressFormat = "jpeg" , quality = 100, rotation = 0) {
        var qualityDecimal = quality / 100;
        var canvas = document.createElement('canvas');
    
        var width = image.width;
        var height = image.height;
    
        canvas.width = this.changeHeightWidth(height, maxHeight, width, maxWidth).width;
        canvas.height = this.changeHeightWidth(height, maxHeight, width, maxWidth).height;

        width = canvas.width;
        height = canvas.height;

        var ctx = canvas.getContext("2d");

        if(rotation) {
        ctx.rotate(rotation * Math.PI / 180);
        if (rotation === 90) {
            ctx.translate(0, -canvas.width);
        } else if (rotation === 180) {
            ctx.translate(-canvas.width, -canvas.height);
        } else if (rotation === 270) {
            ctx.translate(-canvas.height, 0);
        } else if (rotation === 0 || rotation === 360) {
            ctx.translate(0, 0);
        } else { return "Rotation Error"}
        } 
        ctx.drawImage(image, 0, 0, width, height); 
    
        return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
    }

    static createResizedImage(file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc) {
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var image = new Image();
                image.src = reader.result;
                image.onload = function () {
                var resizedDataUrl = Resizer.resizeAndRotateImage(image, maxWidth, maxHeight, compressFormat, quality, rotation);
                responseUriFunc(resizedDataUrl)
                };        
            };
            reader.onerror = error => {
            responseUriFunc(error)
            };
        } else {callBack('File Not Found')}
    }
}
    
    export default { imageFileResizer: (file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc) => {
    return Resizer.createResizedImage(file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc)
    } }


