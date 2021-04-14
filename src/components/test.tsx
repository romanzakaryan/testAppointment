import React, { useEffect } from 'react'

export const TestOnSchedJs = () => {
    useEffect(() => {
        const your_client_id = "sbox1617630047";
        const onsched = window.OnSched(your_client_id, "sbox");
        const elements = onsched.elements();
        const availabilityParams = { locationId: '83a4fea3-e69f-448b-a96e-1ff394b1f6e3', serviceId: 119708, resourceId: 98865 };
        var availabilityOptions = {};
        var availability = elements.create("availability", availabilityParams, availabilityOptions);
        console.log('elements', elements);
        console.log('availability', availability);
        availability.mount("availability");
    }, [])

    return (
        <div id="availability"></div>
    )
}