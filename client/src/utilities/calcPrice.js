const calculateTotalPrice = (options) => {
    if (!options || !Array.isArray(options)) return 0;
    
    // Sum prices of all selected options
    return options.reduce((total, option) => {
        return total + (option?.price || 0);
    }, 0);
}

const getOptionPrice = (options, category) => {
    if (!options || !Array.isArray(options)) return 0;
    const option = options.find((opt) => opt.category === category);
    return option ? option.price : 0;
}

export { calculateTotalPrice, getOptionPrice };
