import React, { useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Parser } from "expr-eval";
import DraggableWindow from "../shared/DraggableWindow";
import CalculatorButton from "../shared/CalculatorButton";
import { CALCULATOR, WINDOW_SIZES } from "../../utils/constants";
import { calculateWindowBounds } from "../../utils/helpers";

const Calculator = ({ isAppOpen, toggleCalculator, isActive, bringToFront, minimizeWindow, isMinimized }) => {
  const calculatorRef = useRef(null);
  const [display, setDisplay] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [lastWasResult, setLastWasResult] = useState(false);

  // Memoize bounds calculation
  const bounds = useMemo(
    () => calculateWindowBounds(WINDOW_SIZES.CALCULATOR.width, WINDOW_SIZES.CALCULATOR.height),
    []
  );

  // Memoized callback for appending to display
  const appendToDisplay = useCallback((value) => {
    // If the last action produced a result, and the next input is a number or dot,
    // replace the display with that number (typical calculator behavior).
    const isSingleNumberOrDot = /^[0-9.]$/;

    setDisplay((prevDisplay) => {
      if (lastWasResult && isSingleNumberOrDot.test(value)) {
        return value;
      }
      // otherwise append as normal
      return prevDisplay + value;
    });

    // Any explicit input following a result should clear the "result" state
    setLastWasResult(false);
  }, [lastWasResult]);

  // Memoized callback for calculation with easter egg
  const calculate = useCallback(() => {
    // Try to evaluate if there's input
    let result;
    if (display === "0/0") {
      setDisplay("Universe exploded 💥");
      setLastWasResult(true);
      return;
    }
    
    if (display && display.trim() !== "") {
      try {
        result = Parser.evaluate(display);
      } catch (err) {
        result = undefined;
      }
    }

    // Normal result handling
    if (result !== undefined && !isNaN(result)) {
      let resultStr = result.toString();
      
      // Easter eggs based on the result
      switch (resultStr) {
        case "69":
          setDisplay("Nice ( ͡° ͜ʖ ͡°)");
          break;
        case "42":
          setDisplay("Meaning of Life 🌌");
          break;
        case "420":
          setDisplay("Blaze it 🌿");
          break;
        case "666":
          setDisplay("Devil's Number 😈");
          break;
        case "777":
          setDisplay("Jackpot! 🎰");
          break;
        case "1337":
          setDisplay("Leet hax0r 💻");
          break;
        case "80085":
          setDisplay("BOOBS ( . )( . )");
          break;
        case "9000":
          setDisplay("It's over 9000! 💥");
          break;
        case "3.14159":
        case "3.1415":
        case "3.14":
          setDisplay("Mmm, pie 🥧");
          break;
        case "12345":
          setDisplay("Stupid password 🔒");
          break;
        case "404":
          setDisplay("Not Found 🕵️‍♂️");
          break;
        case "8":
          // Maybe just normal for 8, let's keep to multi-digits
          setDisplay(resultStr);
          break;
        default:
          setDisplay(resultStr);
          break;
      }
      setLastWasResult(true);
    } else {
      // Show invalid/error message briefly
      setDisplay("NaN / Error");
      setLastWasResult(false);
      setTimeout(() => setDisplay(""), 1500);
    }
  }, [display]);

  // Memoized clear display callback
  const clearDisplay = useCallback(() => {
    setDisplay("");
  }, []);

  // Simplified calculator: no extra result UI handlers

  // Calculator button configuration
  const buttons = useMemo(() => [
    { label: "AC", onClick: clearDisplay, variant: "function" },
    { label: "x2", onClick: () => appendToDisplay("*2"), variant: "function" },
    { label: "%", onClick: () => appendToDisplay("%"), variant: "function" },
    { label: "/", onClick: () => appendToDisplay("/"), variant: "operator" },
    { label: "7", onClick: () => appendToDisplay("7"), variant: "number" },
    { label: "8", onClick: () => appendToDisplay("8"), variant: "number" },
    { label: "9", onClick: () => appendToDisplay("9"), variant: "number" },
    { label: "x", onClick: () => appendToDisplay("*"), variant: "operator" },
    { label: "4", onClick: () => appendToDisplay("4"), variant: "number" },
    { label: "5", onClick: () => appendToDisplay("5"), variant: "number" },
    { label: "6", onClick: () => appendToDisplay("6"), variant: "number" },
    { label: "-", onClick: () => appendToDisplay("-"), variant: "operator" },
    { label: "1", onClick: () => appendToDisplay("1"), variant: "number" },
    { label: "2", onClick: () => appendToDisplay("2"), variant: "number" },
    { label: "3", onClick: () => appendToDisplay("3"), variant: "number" },
    { label: "+", onClick: () => appendToDisplay("+"), variant: "operator" },
    { label: "0", onClick: () => appendToDisplay("0"), variant: "number", colSpan: 2 },
    { label: ".", onClick: () => appendToDisplay("."), variant: "number" },
    { label: "=", onClick: calculate, variant: "operator" },
  ], [appendToDisplay, calculate, clearDisplay]);

  return (
    <DraggableWindow
      isOpen={isAppOpen}
      isMinimized={isMinimized}
      title="Calculator"
      onClose={toggleCalculator}
      onMinimize={minimizeWindow}
      bounds={bounds}
      windowRef={calculatorRef}
      className="w-[34em] h-[50em]"
      isActive={isActive}
      bringToFront={bringToFront}
    >
      <div className="select-none text-center flex justify-center">
        <div className="top-[10px] bg-neutral-900 mx-auto p-20 shadow-lg text-white h-screen">
          <input
            type="text"
            value={display}
            className="w-full mb-10 px-4 py-3 text-3xl rounded-lg bg-transparent shadow-inner text-right"
            placeholder="0"
            disabled
            aria-label="Calculator display"
          />
          
          <div className="grid grid-cols-4 gap-3 text-2xl font-light">
            {/* Calculator buttons */}
            {buttons.map((button, index) => (
              <CalculatorButton
                key={`${button.label}-${index}`}
                label={button.label}
                onClick={button.onClick}
                variant={button.variant}
                colSpan={button.colSpan}
              />
            ))}
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
};

Calculator.defaultProps = {
  minimizeWindow: null,
  isMinimized: false,
};

Calculator.propTypes = {
  isAppOpen: PropTypes.bool.isRequired,
  toggleCalculator: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  bringToFront: PropTypes.func,
  minimizeWindow: PropTypes.func,
  isMinimized: PropTypes.bool,
};

export default React.memo(Calculator);
