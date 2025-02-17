// src/index.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const GRLDropDown = ({
    label,
    options,
    type,
    onDropDownChange,
    labelStyles = {},
    dropdownStyles = {},
    containerStyles = {},
    multipleDropdownStyles = {},
    checkboxListStyles = {},
    checkboxItemStyles = {},
    initialValue,
    placeholder = 'Select items'
}) => {
    const [selectedValue, setSelectedValue] = useState(
        initialValue || (type === 'multiple' ? [] : {})
    );
    const [isOpen, setIsOpen] = useState(false);

    const defaultStyles = {
        container: {
            display: 'flex',
            margin: '10px',
            ...containerStyles
        },
        label: {
            marginRight: '10px',
            fontSize: '14px',
            ...labelStyles
        },
        dropdown: {
            width: '200px',
            fontSize: '14px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            ...dropdownStyles
        },
        multipleDropdown: {
            width: '100px',
            padding: '8px',
            fontSize: '14px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'relative',
            ...multipleDropdownStyles
        },
        checkboxList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            padding: 0,
            margin: 0,
            listStyle: 'none',
            zIndex: 2,
            ...checkboxListStyles
        },
        checkboxItem: {
            padding: '8px',
            borderBottom: '1px solid #eee',
            '&:last-child': {
                borderBottom: 'none'
            },
            ...checkboxItemStyles
        }
    };

    const handleChange = (event) => {
        const selectedOption = JSON.parse(event.target.value);
        setSelectedValue(selectedOption);
        onDropDownChange(selectedOption);
    };

    const handleSelect = (item) => {
        const newSelectedValue = selectedValue.some(selected => selected.key === item.key)
            ? selectedValue.filter((selected) => selected.key !== item.key)
            : [...selectedValue, item];
        setSelectedValue(newSelectedValue);
        onDropDownChange(newSelectedValue);
    };

    const MultipleCheckboxDropdown = () => (
        <div className="checkbox-dropdown" style={{ position: 'relative' }}>
            <button
                type="button"
                style={defaultStyles.multipleDropdown}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValue.length > 0
                    ? `${selectedValue.length} selected`
                    : placeholder}
                <span style={{ float: 'right' }}>▼</span>
            </button>

            {isOpen && (
                <>
                    <ul style={defaultStyles.checkboxList}>
                        {options.map((item) => (
                            <li key={item.key} style={defaultStyles.checkboxItem}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedValue.some(selected => selected.key === item.key)}
                                        onChange={() => handleSelect(item)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <span>{item.description}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1
                        }}
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}
        </div>
    );

    const SingleDropdown = () => (
        <select
            style={defaultStyles.dropdown}
            value={JSON.stringify(selectedValue)}
            onChange={handleChange}
        >
            <option value="{}">{placeholder}</option>
            {options.map(option => (
                <option key={option.key} value={JSON.stringify(option)}>
                    {option.description}
                </option>
            ))}
        </select>
    );

    return (
        <div style={defaultStyles.container}>
            {label && <label style={defaultStyles.label}>{label}</label>}
            {type === 'multiple' ? <MultipleCheckboxDropdown /> : <SingleDropdown />}
        </div>
    );
};

GRLDropDown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    type: PropTypes.oneOf(['single', 'multiple']).isRequired,
    onDropDownChange: PropTypes.func.isRequired,
    labelStyles: PropTypes.object,
    dropdownStyles: PropTypes.object,
    containerStyles: PropTypes.object,
    multipleDropdownStyles: PropTypes.object,
    checkboxListStyles: PropTypes.object,
    checkboxItemStyles: PropTypes.object,
    initialValue: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }))
    ]),
    placeholder: PropTypes.string
};

export default GRLDropDown;
