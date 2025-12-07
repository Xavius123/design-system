import React from 'react';
import { View } from 'react-native';

const getSizeValue = (size) => {
  switch (size) {
    case 'sm':
      return 12;
    case 'lg':
      return 16;
    default:
      return 14;
  }
};

// Simple checkmark using View (no SVG dependency)
export const CheckIcon = ({ size = 'md' }) => {
  const iconSize = getSizeValue(size);
  
  return (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        transform: [{ rotate: '45deg' }],
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
        marginTop: -iconSize / 4,
      }}
    />
  );
};

// Simple minus icon using View (no SVG dependency)
export const MinusIcon = ({ size = 'md' }) => {
  const iconSize = getSizeValue(size);
  
  return (
    <View
      style={{
        width: iconSize,
        height: 2,
        backgroundColor: '#FFFFFF',
      }}
    />
  );
};


