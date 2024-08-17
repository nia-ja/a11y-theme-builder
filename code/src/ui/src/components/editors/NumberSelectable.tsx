/**
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { PropertyPixelSelectable } from '@finos/a11y-theme-builder-sdk';
import { v4 as uuidv4 } from 'uuid';

export interface PixelProps {
    property: PropertyPixelSelectable;
    defaultValue?: number;
    children?: React.ReactNode;
    units?: string;
    style?: any;
    description?: React.ReactNode;
}

export const NumberSelectable: React.FC<PixelProps> = ({
    property,
    defaultValue,
    children,
    units,
    style,
    description,
}) => {
    const [value, setValue] = useState<number>(
        property.getValue() || property.getDefaultValue() || defaultValue || 0
    );
    async function handleChange(event: any): Promise<void> {
        const _value = parseInt(event.target.value);
        setValue(_value);
        property.setValue(_value ? _value : undefined);
    }
    var r = [];
    var selectables = property.getSelectableValues();
    for (var i = 0; i < selectables.length; i++) {
        const s = selectables[i].toString() + (units || '');
        r.push(
            <MenuItem key={s} value={selectables[i]}>
                {' '}
                {s}{' '}
            </MenuItem>
        );
    }
    const idSuffix = uuidv4();
    const labelId = `pixelSelectLabel-${idSuffix}`;
    const selectId = `pixelSelect-${idSuffix}`;
    return (
        <div>
            <InputLabel id={labelId}>
                {children || property.name}
            </InputLabel>
            {description && (
                <div style={{ fontWeight: 'normal' }}>{description}</div>
            )}
            <Select
                id={selectId}
                labelId={labelId}
                value={value}
                onChange={handleChange}
            >
                {r}
            </Select>
        </div>
    );
};
