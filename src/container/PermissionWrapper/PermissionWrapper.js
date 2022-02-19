import React from 'react';
import { useSelector } from 'react-redux';

const PermissionWrapper = (props) => {
    const { validRole } = props;

    const currentUserRole = useSelector((state) => state.user.userState?.person?.roles);

    const findCommonElements = (arr1 = [], arr2 = []) => arr1.some((item) => arr2.includes(item));

    if (findCommonElements(validRole, currentUserRole)) {
        return (
            <>
                {props.children}
            </>
        );
    } return <></>;
};

export default PermissionWrapper;
