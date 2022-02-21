const runCoco = async () => {
    // BEGIN PART 3
    const net = await cocoSsd.load(); 
    console.log("Some text here");
    detect(net); 
    // END PART 3
};

const detect = async (net) => {
    const img = document.getElementById("img");
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Set canvas height and width
    const canvas = document.getElementById("mesh");
    // BEGIN PART 4
    
    canvas.width = imgWidth; 
    canvas.height = imgHeight; 

    // END PART 4

    // Make predictions
    // BEGIN PART 5
    const obj = await net.detect(img); 
    // END PART 5

    // Draw mesh
    // BEGIN PART 6
    const ctx = canvas.getContext("2d"); 
    // END PART 6
    drawRect(obj, ctx);
    // Generate caption
    getCaption(obj);
    // Make image visible after applying boxes
    img.style.visibility = "visible";
};

const drawRect = (predictions, ctx) => {
    // Loop through each prediction
    predictions.forEach((prediction) => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction["bbox"];
        const text = prediction["class"];

        // Set styling
        const color = Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = "#" + color;
        ctx.font = "18px Arial";

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillStyle = "#" + color;
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
};

const getCaption = (predictions) => {
    // BEGIN PART 7
    predictions.forEach(async (prediction) => {
        const caption = document.getElementById("caption"); 
        const entity = prediction["class"]; 
        try {
            const accessToken = '4cc7b39229220b1ee3a0f9d3871545509c3a7e4f'; 
            const response = await axios.get(
                `https://owlbot.info/api/v4/dictionary/${entity}`,
                { headers: { Authorization: `Token ${accessToken}` } }
                );

            // Retrieve the data portion of the response
            const data = response.data;

            // From the data, get the first entry of the definitions
            const entry = data.definitions[0];
            
            // See if there is an example sentence, if not then add the definition
            let add_to_caption = null; 
            if (entry.example != null) {
                add_to_caption = entry.example; 
            } else {
                add_to_caption = entry.definition; 
            }
            
            // Add an emoji if it exists to caption
            if (entry.emoji) {
                add_to_caption += " " + entry.emoji; 
            }
            
            // Add entity
            add_to_caption +=  ' #' + entity; 

            // Creating the element and appending it to the caption child
            const detail_caption = document.createElement("p"); 
            detail_caption.innerHTML = add_to_caption; 
            caption.appendChild(detail_caption);  

        } catch (error) {
            console.log(error); 
        }
    })
    // END PART 7
}

// BEGIN PART 8
// "input" is current undefined, since it hasn't been initialized yet.
// Initialize it here to the appropriate element on the HTML document.

const input = document.getElementById("img-upload"); 

input.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    // What should you run to drive the execuation of all your functions?
    runCoco(); 
})
// END PART 8
