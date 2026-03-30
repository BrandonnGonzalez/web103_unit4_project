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

    return {
        isValid: true,
        message: 'All required features selected.'
    };
}

export { checkFeatureCombinations };
