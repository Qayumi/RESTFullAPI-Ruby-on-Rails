import React, {useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL ='https://freecurrencyapi.net/api/v2/latest?apikey=7924d200-85c9-11ec-baf5-699e1666cc25'

const CurrConverter = () => {

    const [currencyOption, setCurrencyOption] = useState([]);
    const [fromCurrency, setFromCurrency]= useState();
    const [toCurrency, setToCurrency]= useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    
    let toAmount, fromAmount
    if(amountInFromCurrency){
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        fromAmount = amount
        toAmount = amount / exchangeRate 
    }

    useEffect(()=>{
        fetch(BASE_URL)
        .then(res=> res.json())
        .then(data => {
            const firstCurrency = Object.keys(data.data)[0]
            setCurrencyOption([data.query.base_currency, ...Object.keys(data.data)])
            setFromCurrency(data.query.base_currency)
            setToCurrency(firstCurrency)
            setExchangeRate(data.data[firstCurrency]);

         
        } )
    },[])

    useEffect(()=> {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?query.base_currency=${fromCurrency}&symbol=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.data[toCurrency]))
        }

    }, [fromCurrency, toCurrency])


    function handleFromAmountChange (e){
       setAmount(e.target.value)
       setAmountInFromCurrency(true)
    }

    function handleToAmountChange (e){
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
     }


  return (
     <main className='CurrConverter'>

        <h1> Exchange Currency Converter </h1>
         < CurrencyRow  currencyOption={currencyOption} 
         selectedCurrency={fromCurrency}
         onChangeCurrency={e => setFromCurrency(e.target.value)}
         onChangeAmount={handleFromAmountChange}
         amount={fromAmount}
         
         />
            <div className='equals'> = </div>
        < CurrencyRow   currencyOption={currencyOption} 
             selectedCurrency={toCurrency}
             onChangeCurrency={e => setToCurrency(e.target.value)}
             onChangeAmount={handleToAmountChange}
             amount={toAmount}
        />
        
     </main>
  )
}

export default CurrConverter;
