const baseUrl = window.bricksConfig ? window.bricksConfig.REACT_APP_BASE_IMAGE_URL : process.env.REACT_APP_BASE_IMAGE_URL;
const images = {
    loginBg: 'https://magazine.artstation.com/wp-content/uploads/2015/01/150114_KS_Enslave.jpg',
    // logo_light: 'https://avatars.githubusercontent.com/imsarkar?s=64',
    // logo_dark: `${ baseUrl }/logo_dark.png`,
    // default user image
    defaultProfileImg: `${ baseUrl }/avatar.png`,
    dashboard_news_section_art: `${ baseUrl }/dashboard_news_sec_art.png`,
};

export default images;
