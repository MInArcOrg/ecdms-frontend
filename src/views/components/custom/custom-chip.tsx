// src/views/components/custom/custom-chip.tsx

import React from 'react';
import { Chip, ChipProps, useTheme } from '@mui/material';
import { styled, alpha, Theme } from '@mui/material/styles';

// --- Types for Custom Props ---
// Extend standard MUI colors and add a custom 'light' skin
type ChipColor = ChipProps['color'] | 'success' | 'error' | 'warning' | 'info';
type ChipSkin = 'filled' | 'outlined' | 'light';

interface CustomChipProps extends ChipProps {
    color?: ChipColor;
    skin?: ChipSkin;
}

// --- Style Overrides (The Core Logic) ---

// Helper function to get the theme color for the light skin
const getLightSkinColor = (theme: Theme, color: ChipColor) => {
    // Use the theme's built-in colors or fall back to default palette
    const mainColor = theme.palette[color as string]?.main || theme.palette.primary.main;

    return {
        // Background color: Use the main color with low opacity for a "light" skin
        backgroundColor: alpha(mainColor, 0.16),
        // Text/Icon color: Use the main color for high contrast
        color: mainColor,
    };
};

const StyledChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== 'skin'
})<CustomChipProps>(({ theme, skin, color = 'primary' }) => ({
    // Default styles for all CustomChips (you can add size/font here)
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 24, // Smaller height for a compact look

    // --- Apply 'light' skin styles ---
    ...(skin === 'light' && {
        ...getLightSkinColor(theme, color),
        // Hover effect for light skin (e.g., slightly darken the light background)
        '&:hover': {
            backgroundColor: alpha(getLightSkinColor(theme, color).backgroundColor, 0.25),
        },
        // Override default MUI filled/outlined styles
        '.MuiChip-label': {
            color: getLightSkinColor(theme, color).color,
        },
    }),

    // --- Optionally adjust 'filled' (default) variant ---
    ...(skin === 'filled' && {
        // You can adjust the default filled styles here if needed
    }),

    // --- Optionally adjust 'outlined' variant ---
    ...(skin === 'outlined' && {
        // Ensure the outlined border color matches the main color if a custom color is used
        borderColor: theme.palette[color as string]?.main || theme.palette.primary.main,
        // Ensure text color is the main color
        color: theme.palette[color as string]?.main || theme.palette.primary.main,
    })

}));

// --- Component Definition ---

const CustomChip: React.FC<CustomChipProps> = (props) => {
    const { skin = 'filled', color = 'primary', ...rest } = props;
    const theme = useTheme();

    // Determine the correct MUI variant based on the custom skin prop
    let muiVariant: ChipProps['variant'];
    if (skin === 'outlined' || skin === 'light') {
        // Use the outlined variant for both 'outlined' and 'light' skins,
        // and let the custom styles handle the "light" background color override.
        muiVariant = 'outlined';
    } else {
        // Default to 'filled'
        muiVariant = 'filled';
    }

    // Pass the color prop (primary, secondary, success, etc.) only if skin is 'filled' or 'outlined'
    // When skin is 'light', the color is handled by the custom styled component
    const muiColor = skin === 'filled' || skin === 'outlined'
        ? (color as ChipProps['color'])
        : 'default';

    return (
        <StyledChip
            {...rest}
            skin={skin}
            color={muiColor} // Use MUI's color only for built-in variants
            variant={muiVariant}
        />
    );
};

export default CustomChip;