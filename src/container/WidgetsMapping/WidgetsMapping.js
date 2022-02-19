import TextWidget from '../../components/Widgets/TextWidget/TextWidget';
import UrlWidget from '../../components/Widgets/UrlWidget/UrlWidget';
import GroupWidget from '../../components/Widgets/GroupWidget/GroupWidget';
import BooleanWidget from '../../components/Widgets/BooleanWidget/BooleanWidget';
import BlockWidget from '../../components/Widgets/BlockWidget/BlockWidget';
import LinkWidget from '../../components/Widgets/LinkWidget/LinkWidget';
import NumberWidget from '../../components/Widgets/NumberWidget/NumberWidget';
import ColorPickerWidget from '../../components/Widgets/ColorPickerWidget/ColorPickerWidget';
import FileWidget from '../../components/Widgets/FileWidget/FileWidget';
import RadioWidget from '../../components/Widgets/RadioWidget/RadioWidget';
import DropDownWidget from '../../components/Widgets/DropDownWidget/DropDownWidget';
import TextAreaWidget from '../../components/Widgets/TextAreaWidget/TextAreaWidget';

export const dataTypes = {
    text: 'text',
    url: 'url',
    group: 'group',
    boolean: 'boolean',
    link: 'link',
    blocks: 'blocks',
    number: 'number',
    json: 'json',
    file: 'file',
    dropdown: 'dropdown',
    radio: 'radio',
    select: 'select',
    textarea: 'textarea',
};

const widgetsMapping = (props) => {
    const {
        widget, parentKey, index, isBlock = false,
        blocks = [],
        errors = {},
    } = props;
    switch (widget.data_type?.toLowerCase() || widget.type?.toLowerCase()) {
        case dataTypes.text:
            if (widget.uid === dataTypes.url) {
                return <UrlWidget {...widget} parentKey={parentKey} index={index} />;
            } if (widget.display_type === dataTypes.radio) {
                return <RadioWidget {...widget} parentKey={parentKey} index={index}  />;
            } if (widget.display_type === dataTypes.dropdown) {
                return <DropDownWidget {...widget} parentKey={parentKey} index={index} />;
            }
            return <TextWidget {...widget} parentKey={parentKey} index={index} errors={errors} />;
        case dataTypes.textarea:
            return <TextAreaWidget {...widget} parentKey={parentKey} index={index} errors={errors} />;
        case dataTypes.number:
            return <NumberWidget {...widget} parentKey={parentKey} index={index} />;
        case dataTypes.select:
            return <RadioWidget {...widget} parentKey={parentKey} index={index} errors={errors} />;
        case dataTypes.boolean:
            return <BooleanWidget {...widget} parentKey={parentKey} index={index} />;
        case dataTypes.link:
            return <LinkWidget {...widget} parentKey={parentKey} index={index} />;
        case dataTypes.group:
            return (
                <GroupWidget
                    {...widget}
                    isBlock={isBlock}
                    blocks={isBlock ? blocks : []}
                    parentKey={parentKey}
                    index={index}
                    widgetsMapping={widgetsMapping}
                />
            );
        case dataTypes.blocks:
            return (
                <BlockWidget
                    {...widget}
                    parentKey={parentKey}
                    index={index}
                    widgetsMapping={widgetsMapping}
                />
            );
        case dataTypes.json:
            return (
                <ColorPickerWidget
                    {...widget}
                    parentKey={parentKey}
                    index={index}
                    widgetsMapping={widgetsMapping}
                />
            );
        case dataTypes.file:
            return (
                <FileWidget
                    {...widget}
                    parentKey={parentKey}
                    index={index}
                    widgetsMapping={widgetsMapping}
                />
            );
        default:
            return widget.data_type;
    }
};

export default widgetsMapping;
