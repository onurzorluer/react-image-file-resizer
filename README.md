# React Image File Resizer
[![Build Status](https://travis-ci.org/onurzorluer/react-image-file-resizer.svg?branch=master)](https://travis-ci.org/onurzorluer/react-image-file-resizer.svg?branch=master)

`react-image-file-resizer` is a react module that can rescaled local images. 
- You can change image's width, height, format, rotation and quality.
- It returns of new image's base64 URI. The URI can be used as the source of an `<Image>` component.

## Setup

Install the package:
```
npm install --save react-image-file-resizer
```
or
```
yarn add react-image-file-resizer
```

## Usage

```javascript
import Resizer from 'react-image-file-resizer';

Resizer.imageFileResizer(
    file, //is the file of the new image that can now be uploaded...
    maxWidth, // is the maxWidth of the  new image
    maxHeight, // is the maxHeight of the  new image
    compressFormat, // is the compressFormat of the  new image
    quality, // is the quality of the  new image
    rotation, // is the rotatoion of the  new image
    responseUriFunc  // is the callBack function of the new image URI
    );        
```

## Example

```javascript
import React, { Component } from 'react';
import Resizer from 'react-image-file-resizer';

class App extends Component {
    constructor(props) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    fileChangedHandler(event) {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    console.log(uri)
                }
            );
        }
    }

    render() {
        return (
            <div className="App">
                <input type="file" onChange={this.fileChangedHandler}/>
            </div>
        );
    }
}

export default App;
```
Option | Description | Type | Required
------ | ----------- | ---- | -------- 
`file` | Path of image file | `object` | Yes
`maxWidth` | New image max width (ratio is preserved) | `number` | Yes
`maxHeight` | New image max height (ratio is preserved) | `number` | Yes
`compressFormat` | Can be either JPEG, PNG or WEBP. | `string` | Yes
`quality` | A number between 0 and 100. Used for the JPEG compression.(if no compress is needed, just set it to 100) | `number` | Yes
`rotation` | Rotation to apply to the image. Rotation is limited to multiples of 90 degrees.(if no rotation is needed, just set it to 0) (0, 90, 180, 270, 360) | `number` | Yes
`responseUriFunc` | Callback function of URI. Returns URI of resized image's base64 format. ex: `uri => {console.log(uri)});` | `function` | Yes

## Contributing

Pull Requests for new features and bug fixes are welcome! :)

## License

[MIT](https://opensource.org/licenses/mit-license.html)



