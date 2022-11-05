import {__} from '@wordpress/i18n';

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
    TextControl,
    TextareaControl,
    Panel,
    PanelBody,
    PanelRow,
    CustomSelectControl,
    SelectControl,
    ToggleControl,
    Button,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

const {Fragment} = wp.element

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    PlainText,
    useBlockProps,
    ColorPalette,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';

import {useInstanceId} from '@wordpress/compose';

import {Icon, shortcode} from '@wordpress/icons';

const {withSelect} = wp.data;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
                  attributes,
                  setAttributes,
                  markerIcon
              }) {
    const blockProps = useBlockProps();
    const instanceId = useInstanceId(Edit);
    const inputId = `blocks-shortcode-input-${instanceId}`;

    const updateShortcode = (attribute_key, val) => {
        setAttributes({[attribute_key]: val})

        let shortcodeTag = '[growtype_map';
        Object.entries(attributes).map(function (element) {
            if (element[0] !== 'shortcode') {
                let propertyKey = element[0];
                let propertyValue = element[1];

                /**
                 * Find current element
                 */
                if (propertyKey === attribute_key) {
                    propertyValue = val;
                }

                /**
                 * Check if value is empty
                 */
                if (propertyValue === null || propertyValue.toString().length === 0) {
                    return;
                }

                /**
                 * Check if value is boolean
                 */
                if (typeof propertyValue === "boolean") {
                    propertyValue = propertyValue ? 'true' : 'false'
                }

                /**
                 * Extra check for custom values
                 */
                if (propertyKey === 'marker_icon_image') {
                    propertyValue = propertyValue['id']
                }

                if (propertyValue.toString().length > 0) {
                    shortcodeTag += ' ' + propertyKey + '=' + '"' + propertyValue.toString() + '"'
                }
            }
        })

        shortcodeTag += ']';

        setAttributes({shortcode: shortcodeTag})
    };

    if (Object.entries(attributes).length === 0 || attributes.shortcode === '') {
        attributes.shortcode = '[growtype_map]'
    }

    return (
        <div {...blockProps}>
            <InspectorControls key={'inspector'}>
                <Panel>
                    <PanelBody
                        title={__('Main settings', 'growtype-map')}
                        icon="admin-plugins"
                    >
                        <SelectControl
                            label="Map provider"
                            options={[
                                {
                                    label: 'Google',
                                    value: 'google',
                                }
                            ]}
                            onChange={(val) => updateShortcode('map_provider', val)}
                        />
                        <SelectControl
                            label="Map type"
                            options={[
                                {
                                    label: 'Location',
                                    value: 'location',
                                },
                                {
                                    label: 'Route',
                                    value: 'route',
                                }]}
                            onChange={(val) => updateShortcode('map_type', val)}
                        />
                        <TextControl
                            label={__('Initial LAT&LNG', 'growtype-map')}
                            onChange={(val) => updateShortcode('initial_latlng', val)}
                            value={attributes.initial_latlng}
                        />
                        <TextControl
                            label={__('Initial zoom', 'growtype-map')}
                            onChange={(val) => updateShortcode('initial_zoom', val)}
                            value={attributes.initial_zoom}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__('Marker settings', 'growtype-map')}
                        icon="admin-plugins"
                    >
                        <ToggleControl
                            label="Show initial marker"
                            help={
                                attributes.initial_marker
                                    ? 'Show initial location as marker.'
                                    : 'Do not show initial location as marker'
                            }
                            checked={attributes.initial_marker ? true : false}
                            onChange={(val) => updateShortcode('initial_marker', val)}
                        />
                        <p>Marker icon</p>
                        <MediaUploadCheck fallback={
                            <p>{__('To edit the background image, you need permission to upload media.', 'image-selector-example')}</p>}>
                            {
                                !attributes.marker_icon_image
                                    ? <MediaUpload
                                        onSelect={(val) => updateShortcode('marker_icon_image', val)}
                                        allowedTypes={['image']}
                                        value={attributes.marker_icon_image}
                                        render={({open}) => (
                                            <Fragment>
                                                <Button
                                                    style={{
                                                        marginBottom: "30px"
                                                    }}
                                                    className={'editor-post-featured-image__toggle mb-3'}
                                                    onClick={open}
                                                >
                                                    {attributes.marker_icon_image === null
                                                        ? __('Set marker icon', 'growtype-map')
                                                        : __('Upload new marker icon', 'growtype-map')}
                                                </Button>
                                            </Fragment>
                                        )}
                                    />
                                    : ''
                            }
                            {
                                attributes.marker_icon_image
                                    ? <img src={attributes.marker_icon_image.url}/>
                                    : ''
                            }
                            {
                                attributes.marker_icon_image ?
                                    <PanelRow>
                                        <Button style={{
                                            marginBottom: "30px"
                                        }} onClick={(val) => updateShortcode('marker_icon_image', null)} isLink isDestructive>
                                            {__('Remove background image', 'image-selector-example')}
                                        </Button>
                                    </PanelRow>
                                    : ''
                            }
                        </MediaUploadCheck>
                        <TextControl
                            label={__('Icon width', 'growtype-map')}
                            onChange={(val) => updateShortcode('marker_icon_width', val)}
                            value={attributes.marker_icon_width}
                        />
                        <TextControl
                            label={__('Icon height', 'growtype-map')}
                            onChange={(val) => updateShortcode('marker_icon_height', val)}
                            value={attributes.marker_icon_height}
                        />
                        <TextareaControl
                            label={__('Markers list', 'growtype-map')}
                            onChange={(val) => updateShortcode('plain_markers', val)}
                            help={'Values should be separated by ' | '. F.e. 54.709129782082435, 25.280649226804297|54.70984564752917, 25.25554575457772'}
                            value={attributes.plain_markers}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__('Infowindow settings', 'growtype-map')}
                        icon="admin-plugins"
                    >
                        <ToggleControl
                            label="Enabled"
                            help={
                                attributes.infowindow_enabled
                                    ? 'Infowindow is visible.'
                                    : 'Infowindow is hidden'
                            }
                            checked={attributes.infowindow_enabled ? true : false}
                            onChange={(val) => updateShortcode('infowindow_enabled', val)}
                        />
                        <TextareaControl
                            label={__('Content', 'growtype-map')}
                            onChange={(val) => updateShortcode('infowindow_content', val)}
                            value={attributes.infowindow_content}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__('Map preview', 'growtype-map')}
                        icon="admin-plugins"
                    >
                        <TextControl
                            label={__('Map height', 'growtype-map')}
                            onChange={(val) => updateShortcode('map_height', val)}
                            value={attributes.map_height}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <div {...useBlockProps({className: 'components-placeholder'})}>
                <label
                    htmlFor={inputId}
                    className="components-placeholder__label"
                >
                    <Icon icon={shortcode}/>
                    {__('Growtype map shortcode')}
                </label>
                <PlainText
                    className="blocks-shortcode__textarea"
                    id={inputId}
                    value={attributes.shortcode}
                    aria-label={__('Shortcode text')}
                    placeholder={__('Write shortcode here…')}
                    onChange={(val) => setAttributes({shortcode: val})}
                />
            </div>
        </div>
    );
}

export default withSelect((select, ownProps) => {
    return {
        markerIcon: ownProps.attributes.marker_icon_image_id ? select('core').getMedia(ownProps.attributes.marker_icon_image_id) : null,
    };
})(Edit)
