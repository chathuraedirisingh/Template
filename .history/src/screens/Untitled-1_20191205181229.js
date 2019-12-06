async scan() {
        try {

            // to scan any machine readable travel document (passports, visa's and IDs with 
            // machine readable zone), use MrtdRecognizer
            // var mrtdRecognizer = new BlinkIDReactNative.MrtdRecognizer();
            // mrtdRecognizer.returnFullDocumentImage = true;

            // var mrtdSuccessFrameGrabber = new BlinkIDReactNative.SuccessFrameGrabberRecognizer(mrtdRecognizer);

            // BlinkIDRecognizer automatically classifies different document types and scans the data from
            // the supported document
            var blinkIdRecognizer = new BlinkIDReactNative.BlinkIdRecognizer();
            blinkIdRecognizer.returnFullDocumentImage = true;
            blinkIdRecognizer.returnFaceImage = true;

            const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
                new BlinkIDReactNative.BlinkIdOverlaySettings(),
                new BlinkIDReactNative.RecognizerCollection([blinkIdRecognizer/*, mrtdSuccessFrameGrabber*/]),
                licenseKey
            );

            if (scanningResults) {
                let newState = {
                    showImageDocument: false,
                    resultImageDocument: '',
                    showImageFace: false,
                    resultImageFace: '',
                    results: '',
                    showSuccessFrame: false,
                    successFrame: ''
                };

                for (let i = 0; i < scanningResults.length; ++i) {
                    let localState = this.handleResult(scanningResults[i]);
                    newState.showImageDocument = newState.showImageDocument || localState.showImageDocument;
                    if (localState.resultImageDocument) {
                        newState.resultImageDocument = localState.resultImageDocument;
                    }
                    newState.showImageFace = newState.showImageFace || localState.showImageFace;
                    if (localState.resultImageFace) {
                        newState.resultImageFace = localState.resultImageFace;
                    }
                    newState.results += localState.results;
                    newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame;
                    if (localState.successFrame) {
                        newState.successFrame = localState.successFrame;
                    }
                  
                }
                newState.results += '\n';
                this.setState(newState);
            }
        } catch (error) {
            console.log(error);
            this.setState({ showImageDocument: false, resultImageDocument: '', showImageFace: false, resultImageFace: '', results: 'Scanning has been cancelled', showSuccessFrame: false,
            successFrame: ''});
        }
    }

    handleResult(result) {
        let fieldDelim = ";\n";
        
        var localState = {
            showImageDocument: false,
            resultImageDocument: '',
            showImageFace: false,
            resultImageFace: '',
            results: '',
            showSuccessFrame: false,
            successFrame: ''
        };
        
        if (result instanceof BlinkIDReactNative.BlinkIdRecognizerResult) {
            let blinkIdResult = result;
            let resultString =
                "First name: " + blinkIdResult.firstName + fieldDelim +
                "Last name: " + blinkIdResult.lastName + fieldDelim +
                "Address: " + blinkIdResult.address + fieldDelim +
                "Document number: " + blinkIdResult.documentNumber + fieldDelim +
                "Sex: " + blinkIdResult.sex + fieldDelim;
            if (blinkIdResult.dateOfBirth) {
                resultString +=
                    "Date of birth: " +
                        blinkIdResult.dateOfBirth.day + "." +
                        blinkIdResult.dateOfBirth.month + "." +
                        blinkIdResult.dateOfBirth.year + "." + fieldDelim;
            }
            if (blinkIdResult.dateOfIssue) {
                resultString +=
                    "Date of issue: " +
                        blinkIdResult.dateOfIssue.day + "." +
                        blinkIdResult.dateOfIssue.month + "." +
                        blinkIdResult.dateOfIssue.year + "." + fieldDelim;
            }
            if (blinkIdResult.dateOfExpiry) {
                resultString +=
                    "Date of expiry: " +
                        blinkIdResult.dateOfExpiry.day + "." +
                        blinkIdResult.dateOfExpiry.month + "." +
                        blinkIdResult.dateOfExpiry.year + "." + fieldDelim;
            }
            // there are other fields to extract
            localState.results += resultString;

            // Document image is returned as Base64 encoded JPEG
            if (blinkIdResult.fullDocumentImage) {
                localState.showImageDocument = true;
                localState.resultImageDocument = 'data:image/jpg;base64,' + blinkIdResult.fullDocumentImage;
            }
            // Face image is returned as Base64 encoded JPEG
            if (blinkIdResult.faceImage) {
                localState.showImageFace = true;
                localState.resultImageFace = 'data:image/jpg;base64,' + blinkIdResult.faceImage;
            }
        } else if (result instanceof BlinkIDReactNative.MrtdRecognizerResult) {
            let mrtdResult = result;
            localState.results +=
                "First name: " + mrtdResult.mrzResult.secondaryId + fieldDelim +
                "Last name: " + mrtdResult.mrzResult.primaryId + fieldDelim +
                "Nationality: " + mrtdResult.mrzResult.nationality + fieldDelim +
                "Gender: " + mrtdResult.mrzResult.gender + fieldDelim +
                "Date of birth: " +
                    mrtdResult.mrzResult.dateOfBirth.day + "." +
                    mrtdResult.mrzResult.dateOfBirth.month + "." +
                    mrtdResult.mrzResult.dateOfBirth.year + ".";
            
              // Document image is returned as Base64 encoded JPEG
              if (mrtdResult.fullDocumentImage) {
                  localState.showImageDocument = true;
                  localState.resultImageDocument = 'data:image/jpg;base64,' + mrtdResult.fullDocumentImage;
              }
        } else if (result instanceof BlinkIDReactNative.SuccessFrameGrabberRecognizerResult) {
            // first handle slave result, and then add success frame image
            localState = this.handleResult(result.slaveRecognizerResult);
  
              // success frame is returned as Base64 encoded JPEG
            if (result.successFrame) {
                localState.showSuccessFrame = true;
                localState.successFrame = 'data:image/jpg;base64,' + result.successFrame;
            }
        }
        return localState;
    }