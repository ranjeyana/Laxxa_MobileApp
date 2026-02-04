import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import { metrics } from '../../utils/metrics';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  children,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: '#007AFF',
          borderWidth: 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#C6C6C8',
          borderWidth: 1,
        };
      case 'danger':
        return {
          backgroundColor: '#FF3B30',
        };
      case 'white-outline':
        return {
          backgroundColor: 'transparent',
          borderColor: 'white',
          borderWidth: 2,
        };
      default:
        return {
          backgroundColor: '#007AFF',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: hp(1.2),
          paddingHorizontal: wp(4),
        };
      case 'large':
        return {
          paddingVertical: hp(2.5),
          paddingHorizontal: wp(6),
        };
      default: // medium
        return {
          paddingVertical: hp(1.8),
          paddingHorizontal: wp(5),
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return wp(3.5);
      case 'large':
        return wp(4.5);
      default:
        return wp(4);
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
      case 'secondary':
        return '#007AFF';
      case 'white-outline':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {children}
      {!children && loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : !children ? (
        <Text style={[
          styles.text, 
          { 
            color: getTextColor(),
            fontSize: getTextSize(),
          }, 
          textStyle
        ]}>
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: metrics.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;