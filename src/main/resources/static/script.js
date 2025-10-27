document.addEventListener('DOMContentLoaded', function() {
    const deliveryForm = document.getElementById('add-delivery-form');
    const deliveriesTbody = document.getElementById('deliveries-tbody');

    const API_URL = '/api/deliveries';

    // Function to fetch all deliveries and display them in the table
    async function fetchDeliveries() {
        try {
            const response = await fetch(API_URL);
            const deliveries = await response.json();

            // Clear the table body before adding new rows
            deliveriesTbody.innerHTML = '';

            deliveries.forEach(delivery => {
                const row = `
                    <tr>
                        <td>${delivery.id}</td>
                        <td>${delivery.productName}</td>
                        <td>${delivery.destinationAddress}</td>
                        <td>${delivery.status}</td>
                        <td>
                            <button class="action-button update-btn" onclick="updateStatus(${delivery.id})">Update Status</button>
                            <button class="action-button delete-btn" onclick="deleteDelivery(${delivery.id})">Delete</button>
                        </td>
                    </tr>
                `;
                deliveriesTbody.insertAdjacentHTML('beforeend', row);
            });
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        }
    }

    // Function to handle form submission for adding a new delivery
    deliveryForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const destinationAddress = document.getElementById('destinationAddress').value;

        const newDelivery = {
            productName: productName,
            destinationAddress: destinationAddress,
            status: 'Pending' // Default status
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDelivery)
            });
            
            // Clear form fields and refresh the table
            deliveryForm.reset();
            fetchDeliveries();

        } catch (error) {
            console.error('Error adding delivery:', error);
        }
    });
    
    // Make functions globally available so inline onclick can find them
    window.updateStatus = async function(id) {
        const newStatus = prompt('Enter new status (e.g., In Transit, Delivered):');
        if (newStatus) {
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                fetchDeliveries();
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    }

    window.deleteDelivery = async function(id) {
        if (confirm('Are you sure you want to delete this delivery?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchDeliveries();
            } catch (error) {
                console.error('Error deleting delivery:', error);
            }
        }
    }

    // Initial fetch of deliveries when the page loads
    fetchDeliveries();
});