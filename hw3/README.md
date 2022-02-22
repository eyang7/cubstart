#Project Description

Frontend: Gradient background with a button for uploading image, and a caption box that displays the image and the information generated. A box surrounds the object in the picture in question, which was developed in JS. 

Backend: Using Tensorflow's AI vision algorithm, a neural net detects the object and generates predictions for what the object is, based on some probability scheme. The objects are stored in some prediction array, which will be used to generate captions with the OwlBot API. Using axios, a GET request is sent to the API to retrieve a JSON object of the prediction, with which the definition/example/emoji is extracted from this object and displayed through the front-end. 