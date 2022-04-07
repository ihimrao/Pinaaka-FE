const serverUrl = window.bricksConfig ? process.env.REACT_APP_URI : process.env.REACT_APP_URI;
const imgUrl = '';

const apiUrls = {
    fetchFlags: window.bricksConfig ? window.bricksConfig.REACT_APP_LAG_URL : process.env.REACT_APP_FLAG_URL,
    users: {
        fetchUserData: `${ serverUrl }admin/login`,
        fetchUserInfo: `${ serverUrl }admin/getAdminDetails`,
        fetchGlobalInfo: `${ serverUrl }admin/getGlobalInfo`,
        fetchOrganizationData: `${ serverUrl }admin/getAllAdmin`,
        addamin: `${ serverUrl }admin/addAdmin`,
        fetchUsers: `${ serverUrl }admin/getAllUser`,
        createKey: `${ serverUrl }admin/addUser`,
        deleteProject: `${ serverUrl }admin/deleteUser`,
        resetKey: `${ serverUrl }admin/resetKey`,
        fetchEnvData: `${ serverUrl }/environment`,
        fetchContentData: `${ serverUrl }/brick`,
        fetchContentType: `${ serverUrl }/brickvalue`,
    },
    organization: {
        deleteAdmin: `${ serverUrl }admin/deleteAdmin`,
    },
    createContent: {
        fetchNativeFields: `${ serverUrl }/native-fields`,
        createBrick: (projectId) => `${ serverUrl }/${ projectId }/brick/`,
    },
    content: {
        fetchBrickDetails: (projectId, brickId) => `${ serverUrl }/${ projectId }/brick/${ brickId }`,
        fetchContentList: (projectId) => `${ serverUrl }/${ projectId }/brick/`,
        editBrickDetails: ({ projectId, brickId }) => `${ serverUrl }/${ projectId }/brick/${ brickId }`,
    },
    image: {
        saveImage: imgUrl,
    },
    token: {
        createProjectTokenData: (projectId) => `${ serverUrl }/${ projectId }/project-token/`,
        fetchAllProjectTokenData: (projectId) => `${ serverUrl }/${ projectId }/project-token/`,
        fetchEnvironmentData: (projectId) => `${ serverUrl }/${ projectId }/environment/`,
    },
};

export default apiUrls;
