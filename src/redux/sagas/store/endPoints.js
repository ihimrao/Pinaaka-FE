const endPoints = {
    content: {
        editBrickContent: {
            method: 'PUT',
            headerProps: {},
        },
        fetchBrickDetails: {
            method: 'GET',
            headerProps: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
        fetchContentList: {
            method: 'GET',
            headerProps: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    },
};

export default endPoints;
