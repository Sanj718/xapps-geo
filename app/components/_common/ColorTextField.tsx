import {
  TextField,
  Button,
  ColorPicker,
  hsbToHex,
  rgbToHsb,
  Icon,
  Text,
  InlineGrid,
  InlineStack,
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import { ColorIcon, ExitIcon, EyeDropperIcon } from "@shopify/polaris-icons";
import { hexToRGB } from "../_helpers";
import "../../assets/custom.scss"


interface ColorTextFieldProps {
  label: string;
  configs: any;
  setConfigs: any;
  placeholder: string;
  id: string;
  disabled?: boolean;
}

export default function ColorTextField({
  label,
  configs,
  setConfigs,
  placeholder,
  id,
  disabled = false,
}: ColorTextFieldProps) {

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorText, setColorText] = useState(configs[id]);
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const setFieldColor = useCallback(
    (selectedColor) => {
      setColor(selectedColor);
      setColorText(hsbToHex(selectedColor));
      setConfigs({ ...configs, [id]: hsbToHex(selectedColor) });
    },
    [color, configs]
  );

  useEffect(() => {
    setColorText(configs[id]);
  }, [configs]);

  return (
    <InlineGrid gap="100">
      <TextField
        disabled={disabled}
        size="slim"
        label={label}
        // labelHidden
        onChange={(value) => {
          setColorText(value);
          setColor(rgbToHsb(hexToRGB(value)));
          setConfigs({ ...configs, [id]: value });
        }}
        autoComplete="off"
        placeholder={placeholder}
        value={colorText ? colorText : ""}
        connectedRight={
          <Button
            size="slim"
            disabled={disabled}
            icon={EyeDropperIcon}
            // variant="plain"
            onClick={() => setShowColorPicker(true)}
          />
        }
      />
      {showColorPicker && (
        <div
          onClick={() => setShowColorPicker(false)}
          className="color_picker-cover"
        ></div>
      )}
      <div
        className="color_picker"
        style={{
          visibility: showColorPicker ? "visible" : "hidden",
          opacity: showColorPicker ? 1 : 0,
        }}
      >
        <div className="color_picker_close">
          <Button
            size="slim"
            onClick={() => setShowColorPicker(false)}
            icon={ExitIcon}
          >
            Done
          </Button>
        </div>
        <ColorPicker onChange={setFieldColor} color={color} />
      </div>
    </InlineGrid>
  );
}
