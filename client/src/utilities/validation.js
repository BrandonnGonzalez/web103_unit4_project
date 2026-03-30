const checkFeatureCombinations = (features) => {
    // Ensure all required core features are selected for a car
    const requiredFeatures = ['exterior', 'roof', 'wheels', 'interior'];
    
    // Check if any required feature is missing
    for (const feature of requiredFeatures) {
        if (!features[feature]) {
            return {
                isValid: false,
                message: `Missing required feature: ${feature}`
            };
        }
    }

    // Check for impossible feature combination
    if (features.roof.name.includes('Carbon Fiber') && features.wheels.name.includes('Standard')) {
        return {
            isValid: false,
            message: 'A Carbon Fiber Roof cannot be combined with Standard Wheels! Please select better wheels.'
        };
    }

    return {
        isValid: true,
        message: 'All required features selected.'
    };
}

export { checkFeatureCombinations };
