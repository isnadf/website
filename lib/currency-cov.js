function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        console.log(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
    }
  
  convert("USD", "TRY", 1);