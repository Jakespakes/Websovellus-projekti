
import { useState } from 'react';
import './GroupCreation.css';

function GroupCreation({ onClose, onSuccess }) {

    // Form states: store the values entered by the user.
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');

    // API states: control loading and feedback messages.
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    // This function runs when the user submits the form.
    const handleSubmit = async (e) => {

        // Prevent the browser from refreshing the page.
        e.preventDefault();

        // Clear any previous feedback message.
        setMessage('');
        setMessageType('');

        // Remove unnecessary whitespace before sending data.
        const trimmedName = groupName.trim();
        const trimmedDescription = description.trim();

        // Basic frontend validation.
        // The backend also performs its own validation.
        if (trimmedName.length < 3) {
            setMessage('Group name must be at least 3 characters long.');
            setMessageType('error');
            return;
        }

        // Prepare the data that the backend expects.
        const groupData = {
            name: trimmedName,
            description: trimmedDescription
        };

        // Indicate that the API request is processing.
        setLoading(true);

        try {

            // Send a POST request to the group creation endpoint.
            const response = await fetch('/api/groups/', {
                method: 'POST',

                // Include authentication cookies.
                credentials: 'include',

                headers: {
                    'Content-Type': 'application/json'
                },

                // Convert the JavaScript object into JSON.
                body: JSON.stringify(groupData)
            });

            // Convert the backend response into a JavaScript object.
            const data = await response.json();

            // Check whether the backend returned an error.
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    'Failed to create group.'
                );
            }

            // Notify App that the group was created successfully.
            onSuccess(data.group.name);

            // Log the created group so we can inspect the response.
            console.log('Created group:', data.group);

            // Clear the form after successful creation.
            setGroupName('');
            setDescription('');

        } catch (error) {

            // Display any errors returned by the backend or fetch.
            console.error('Group creation error:', error);

            setMessage(error.message || 'Something went wrong.');
            setMessageType('error');

        } finally {

            // Always stop the loading state, even if an error occurs.
            setLoading(false);
        }
    };

    return (
        <div className="group-creation-container">
            <div className="group-creation-card">

                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="group-creation-header">
                    <h1>Create a Group</h1>
                    <p>Create a community for movie enthusiasts!</p>
                </div>

                {/* Connect the form submission to handleSubmit. */}
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="groupName">Group Name</label>

                        <input
                            id="groupName"
                            type="text"
                            placeholder="Ryhmän nimi"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>

                        <textarea
                            id="description"
                            placeholder="Kuvaus ryhmästä"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>

                    {/* Explain the group's visibility and membership rules. */}
                    <div className="group-visibility-info">
                        <p>
                            Kuka tahansa näkee ryhmän ja voi pyytää liittyä jäseneksi.
                            Vain jäsenet voivat tehdä elokuva-arvosteluja ja nähdä elokuvalistat.
                        </p>
                    </div>

                    {/* Display success or error feedback when available. */}
                    {message && (
                        <p className={`group-message ${messageType}`}>
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="create-group-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating group...' : 'Create Group'}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default GroupCreation;
