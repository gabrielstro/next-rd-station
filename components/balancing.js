const customerSuccessBalancing = (csList, customerList, csUnavailable ) => {

    const csAvailableList = csList.filter((cs) => {
        return !csUnavailable.includes(cs.id)
    })
    let customers = new Set(customerList);
    
    csAvailableList.sort((a, b) => a.level - b.level)
    customerList.sort((a, b) => a.level - b.level)
    
    const result = csAvailableList.map((cs) => {
        let count = 0
        customers.forEach((customer) => {
            if (customer.level <= cs.level) {
                customers.delete(customer);
                count++;
            }
        });
        return {
            ...cs,
            count,
        };
    })
    return result
}

const getMostBusyCs = (csList) => {
    let highest = 0
    for (const cs of csList){
        if(cs.count > highest) highest = cs.count
    }
    return csList.filter((cs) => cs.count == highest)
}

export { customerSuccessBalancing, getMostBusyCs }