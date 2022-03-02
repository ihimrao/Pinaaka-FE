import axios from 'axios';
import apiUrls from './apiUrls';

export const fetchOrganizationFromServer = (token) => axios.request({
    method: 'GET',
    url: apiUrls.users.fetchOrganizationData,
    headers: {
        Authorization: `${ token }`,
    },
});

export const createOrganization = (values, auth) => axios.request({
    method: 'POST',
    url: apiUrls.users.addamin,
    headers: {
        Authorization: `${ auth }`,
    },
    data: {
        email: values.email,
        username: values.username,
        firstName: values.firstname,
        lastName: values.lastname,
        password: values.password,
        photo: values?.photo || '',
        isSuperAdmin: values.admin === 'superadmin',
    },
});

export const deleteOrganization = ({ email, token }) => axios.request({
    method: 'POST',
    url: apiUrls.organization.deleteAdmin,
    headers: {
        Authorization: `${ token }`,
    },
    data: { email },
});

export const uploadImage = (values) => axios.request({
    method: 'POST',
    url: apiUrls.image.saveImage,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    data: values,
});

export default {
    fetchOrganizationFromServer,
    createOrganization,
    deleteOrganization,
};
