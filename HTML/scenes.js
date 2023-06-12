// Function to handle the image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const imageData = event.target.result;
  
      // Call the API and process the response
      searchScenes(imageData);
    };
  
    reader.readAsDataURL(file);
  }
  
  // Function to call the Trace.moe API and process the response
  async function searchScenes(imageData) {
    const response = await fetch("https://api.trace.moe/search", {
      method: "POST",
      body: imageData,
      headers: { "Content-type": "application/octet-stream" },
    });
  
    const data = await response.json();
  
    // Process the response data
    displayScenes(data);
  }
  
  // Function to display the scenes in the web app
  function displayScenes(data) {
    const imageContainer = document.querySelector(".image-container");
  
    // Clear the existing image container
    imageContainer.innerHTML = "";
  
    // Check if scenes are found
    if (data?.result?.length > 0) {
      // Iterate through each scene
      data.result.forEach((scene) => {
        // Create a new scene element
        const sceneElement = document.createElement("div");
        sceneElement.classList.add("scene");
  
        // Create an image element for the scene thumbnail
        const thumbnailElement = document.createElement("img");
        thumbnailElement.src = scene.image;
        thumbnailElement.alt = "Scene Thumbnail";
  
        // Append the thumbnail to the scene element
        sceneElement.appendChild(thumbnailElement);
  
        // Create a span element for the scene title
        const titleElement = document.createElement("span");
        titleElement.textContent = scene.anilist.title;
  
        // Append the title to the scene element
        sceneElement.appendChild(titleElement);
  
        // Append the scene element to the image container
        imageContainer.appendChild(sceneElement);
      });
    } else {
      // No scenes found
      const noScenesElement = document.createElement("p");
      noScenesElement.textContent = "No scenes found.";
  
      // Append the "No scenes found" message to the image container
      imageContainer.appendChild(noScenesElement);
    }
  }
  
  // Add an event listener to handle image upload
  const fileInput = document.getElementById("image-upload");
  fileInput.addEventListener("change", handleImageUpload);
  