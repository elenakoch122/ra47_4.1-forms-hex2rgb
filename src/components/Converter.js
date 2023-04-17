import { useState } from "react";

export default function Converter() {
  const [inputValue, setInputValue] = useState('#eeeeee');
  const [rgb, setRgb] = useState('rgb(238, 238, 238)');

  const onChange = (e) => {
    const { value } = e.target;
    if (!value.startsWith('#') || value.length > 7) return;

    setInputValue(value);

    const rgbObj = hexToRgb(value);
    rgbObj ? setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`) : setRgb('?');
  };

  const hexToRgb = (hex) => {
    if (hex.length !== 4 && hex.length !== 7) return;

    const regexpHex = /^#?((([a-f\d]{2})([a-f\d]{2})([a-f\d]{2}))?|(([a-f\d]{1})([a-f\d]{1})([a-f\d]{1}))?)$/i;
    const isHex = regexpHex.test(hex);
    if (!isHex) return;

    if (hex.length === 4) {
      hex = `#${[...hex.slice(1)].map(i => i + i).join('')}`;
    }

    const result = regexpHex.exec(hex);

    return {
      r: parseInt(result[3], 16),
      g: parseInt(result[4], 16),
      b: parseInt(result[5], 16)
    };
  }

  return (
    <div className="converter" style={{ backgroundColor: rgb }}>
      <input
        className="converter__hex"
        type="text"
        value={inputValue}
        onChange={onChange}
      />
      <div className="converter__rgb">{rgb}</div>
    </div>
  );
}
