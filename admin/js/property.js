document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html'; // Redirect if no token exists
    }
    const id = localStorage.getItem('currentPropertyId');

    // Fetch property details and populate the form
    axios.get(`${apiBaseUrl}/properties/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
        const property = response.data;
        const form = document.getElementById('editPropertyForm');
        form.innerHTML = `
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" class="form-control" value="${property.name}" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description">${property.description}</textarea>
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" class="form-control" value="${property.price}" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" id="location" class="form-control" value="${property.location}" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Property</button>
        `;
        var easyMDE = new EasyMDE({ element: document.getElementById('description') });

        // Populate images and provide a delete button
        property.images.forEach(image => {
            const imageElement = document.createElement('div');
            imageElement.innerHTML = `
                <img src="${getPublicImageUrl(image.url)}">
                <button onclick="deleteImage('${image.id}', '${token}')" class="btn btn-danger">Delete</button>
            `;
            document.getElementById('imagesContainer').appendChild(imageElement);
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            updateProperty(easyMDE, id, token);
        });
    }).catch(error => {
        console.error('Error fetching property:', error);
        alert('Failed to fetch property details.');
    });

    document.getElementById('uploadImageForm').addEventListener('submit', handleImageUpload);
    document.getElementById('deleteProperty').addEventListener('click', function() {
        deleteProperty(id, token);
    });
});

function getPublicImageUrl(privateUrl) {
    const publicBaseUrl = 'https://pub-9b3caab195e44a388ac13a713b1693f2.r2.dev';
    const urlParts = privateUrl.split('/');
    const imageFilename = urlParts.pop(); // Get the last segment which should be the filename
    return `${publicBaseUrl}/${imageFilename}`; // Construct the public URL
}

function updateProperty(easyMDE, id, token) {
    const updatedName = document.getElementById('name').value;
    const updatedDescription = easyMDE.value();
    const updatedPrice = parseFloat(document.getElementById('price').value);
    const updatedLocation = document.getElementById('location').value;

    axios.put(`${apiBaseUrl}/properties/${id}`, {
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
        location: updatedLocation
    }, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(() => {
        alert('Property updated successfully!');
        location.reload();
    }).catch(error => {
        console.error('Error updating property:', error);
        alert('Failed to update property.');
    });
}

function handleImageUpload(event) {
    const token = localStorage.getItem('token');
    const propertyId = localStorage.getItem('currentPropertyId');
    event.preventDefault();
    const fileInput = document.getElementById('propertyImage');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    axios.post(`${apiBaseUrl}/properties/${propertyId}/images`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        alert('Image uploaded successfully!');
        location.reload();
    }).catch(error => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
    });
}

function deleteImage(imageId, token) {
    const propertyId = localStorage.getItem('currentPropertyId');

    const url = `${apiBaseUrl}/properties/${propertyId}/images/${imageId}`;

    axios.delete(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
        alert('Image deleted successfully!');
        location.reload();
    })
    .catch(error => {
        console.error('Error deleting image:', error);
        alert('Failed to delete image.');
    });
}

function deleteProperty(id, token) {
    axios.delete(`${apiBaseUrl}/properties/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(() => {
        alert('Property deleted successfully!');
        window.location.href = 'dashboard.html';
    }).catch(error => {
        console.error('Error deleting property:', error);
        alert('Failed to delete property.');
    });
}
