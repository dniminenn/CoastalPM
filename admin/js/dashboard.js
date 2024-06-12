// Initialize EasyMDE globally
let easymde;

function getPublicImageUrl(privateUrl) {
    const publicBaseUrl = 'https://pub-9b3caab195e44a388ac13a713b1693f2.r2.dev';
    const urlParts = privateUrl.split('/');
    const imageFilename = urlParts.pop(); // Get the last segment which should be the filename
    return `${publicBaseUrl}/${imageFilename}`; // Construct the public URL
}

document.addEventListener('DOMContentLoaded', function() {
    // Instantiate EasyMDE on the new property description textarea
    easymde = new EasyMDE({ element: document.getElementById('newPropertyDescription') });

    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');

    // Check if the current date is past the stored expiry date
    if (!token || new Date() > new Date(expiry)) {
        logout();
    }

    // Event listener for form submission
    document.getElementById('createPropertyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('newPropertyName').value;
        const description = easymde.value();
        const price = parseFloat(document.getElementById('newPropertyPrice').value);
        const location = document.getElementById('newPropertyLocation').value;

        axios.post(`${apiBaseUrl}/properties`, {
            name: name,
            description: description,
            price: price,
            location: location
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            alert('Property created successfully!');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error creating property:', error);
            alert('Failed to create property: ' + (error.response.data.error || 'Unknown error'));
        });
    });

    // Load existing properties
    axios.get(`${apiBaseUrl}/properties`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
        const propertiesList = document.getElementById('propertiesList');
        propertiesList.innerHTML = response.data.map(property => {
            let imagesHtml = property.images.map(image => 
                `<img src="${getPublicImageUrl(image.url)}" alt="Property Image">`
            ).join('');

            return `
                <div class="property">
                    <div class="property-details">
                        <h3>${property.name}</h3>
                        <p>${marked.parse(property.description)}</p>
                        <p>$${property.price}</p>
                        <p>${property.location}</p>
                        <button onclick="editProperty(${property.id})" class="btn btn-info">Edit</button>
                    </div>
                    <div class="property-images">
                        ${imagesHtml}
                    </div>
                </div>
            `;
        }).join('');
    })
    .catch(error => {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties: ' + (error.response.data.error || 'Unknown error'));
    });
});

function editProperty(id) {
    localStorage.setItem('currentPropertyId', id);
    window.location.href = 'property.html';
}
