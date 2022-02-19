import randomId from '../../../helpers/randomIdGenerator';
import structureContentObj from '../../../views/Content/structureContentObj_helper';

const structureTemplateObj = (template) => ({
    ...template,
    display_name: template?.title,
    value: template?.schema?.map((item) => structureContentObj(item)),
    data_type: 'group',
    multiple: false,
    mandatory: false,
    id: randomId(),
});

export default structureTemplateObj;
