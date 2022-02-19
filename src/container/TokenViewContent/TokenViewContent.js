import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    Box, Tab, Tabs, Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getAllProjectToken } from '../../redux/sagas/requests/projectTokenReq';
import userSelector from '../../redux/states/user/userSelector';
import DeliveryTokenContainer from './DeliveryTokenContainer';
import ManagementTokenContainer from './ManagementTokenContainer';
import FailedToast from '../../components/FailedToast/FailedToast';

const TabPanel = (props) => {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${ index }`}
            aria-labelledby={`simple-tab-${ index }`}
            {...other}
        >
            {value === index && (
                <Box paddingTop={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
const TokenViewContent = ({ tokenCreated }) => {
    const [ value, setValue ] = useState(0);
    const [ deliveryTokenData, setDeliveryTokenData ] = useState([]);
    const [ loading, setisLoading ] = useState(true);

    const [ showSuccessToast, setShowSuccessToast ] = useState(false);

    const [ ApierrorMessage, setApierrorMessage ] = useState('');
    const accessToken = useSelector(userSelector.getUserToken);
    const { projectId } = useParams();
    const history = useHistory();

    const fetchData = async () => {
        setisLoading(true);
        const data = await getAllProjectToken(projectId, accessToken, history);
        if (!data.error) {
            setDeliveryTokenData(data?.response);
            setisLoading(false);
        }

        if (data.error === 1) {
            console.log('data =>', data.errorMessage, data.error);
            setApierrorMessage(data.errorMessage);
            setShowSuccessToast(true);
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ tokenCreated ]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const tabData = [
        {
            index: 1, id: 'token-tab-0', label: 'Delivery Tokens',
        },
        {
            index: 2, id: 'token-tab-1', label: 'Management Tokens',
        },
    ];

    const handleCloseSuccessToast = () => {
        setShowSuccessToast(false);
    };

    return (
        <div style={{ width: '100%' }}>
            <div>
                {loading}
                <Tabs value={value} onChange={handleChange}>
                    {tabData.map((tab) => (
                        <Tab label={tab.label} id={tab.id} aria-controls="simple-tabpanel-0" />
                    ))}

                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <DeliveryTokenContainer deliveryTokenData={deliveryTokenData} setDeliveryTokenData={setDeliveryTokenData} fetchData={fetchData} loading={loading}  />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ManagementTokenContainer />
            </TabPanel>
            <FailedToast handleClose={handleCloseSuccessToast} message={ApierrorMessage} visible={showSuccessToast} />
        </div>
    );
};

export default TokenViewContent;
