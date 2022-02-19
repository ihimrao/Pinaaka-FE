const getProjectsData = (state) => state.project.projectState;
const getOrganizationData = (state) => state.project.organizationState;
const getProjectsError = (state) => state.project.error;
const getProjectLoading = (state) => state.project.projectLoading;

export default {
    getProjectsData, getOrganizationData, getProjectsError, getProjectLoading,
};
