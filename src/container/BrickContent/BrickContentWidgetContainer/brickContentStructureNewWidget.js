import { v4 as uuidV4 } from 'uuid';

const value = (type) => {
    switch (type) {
        case 'text':
            return '';
        case 'checkbox':
            return false;
        case 'dropdown':
            return '';
        case 'radio':
            return '';
        case 'textarea':
            return [];
        default:
            return '';
    }
};

const structureNewWidget = (widget) => ({
    ...widget,
    value: '',
    uniqueId: uuidV4(),
    field_config: {
        ...widget.field_config,
        fields: Object.keys(widget.field_config.fields).map((key) => ({
            ...widget.field_config.fields[ key ],
            value: value(widget.field_config.fields[ key ].type),
        })),
    },
});

export default structureNewWidget;
