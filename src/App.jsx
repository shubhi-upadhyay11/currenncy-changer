import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const currencyOptions = Object.keys(currencyInfo);

  const handleConversion = () => {
    if (!currencyInfo[toCurrency]) return;
    const rate = currencyInfo[toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Currency Converter</h1>

        {/* From Input */}
        <InputBox
          label="From"
          amount={amount}
          currencyOptions={currencyOptions}
          onAmountChange={(value) => setAmount(value)}
          onCurrencyChange={(currency) => setFromCurrency(currency)}
          selectedCurrency={fromCurrency}
        />

        {/* To Input */}
        <div className="text-center my-4 font-semibold">↓</div>

        <InputBox
          label="To"
          amount={convertedAmount}
          currencyOptions={currencyOptions}
          onCurrencyChange={(currency) => setToCurrency(currency)}
          selectedCurrency={toCurrency}
          amountDisabled={true}
        />

        <button
          onClick={handleConversion}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;
