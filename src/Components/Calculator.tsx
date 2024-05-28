import React from 'react';
import './CSS/trend.css'
import './CSS/Calculator.css'; // Import CSS file for styling
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
    const [sourcingPrice, setSourcingPrice] = useState<number>(0);
    const [VATPercentage, setVATPercentage] = useState<number>(0);
    const [paymentHandlingFeePercentage, setPaymentHandlingFeePercentage] = useState<number>(0);
    const [monthlySellingItems, setMonthlySellingItems] = useState<number>(0);

    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [vatShippingFee, setVatShippingFee] = useState<number>(0);
    const [vatOnCommissionAndPHF, setVatOnCommissionAndPHF] = useState<number>(0);
    const [darazExpense, setDarazExpense] = useState<number>(0);
    const [totalCharges, setTotalCharges] = useState<number>(0);
    const [profitPerUnit, setProfitPerUnit] = useState<number>(0);
    const [profitPerMonth, setProfitPerMonth] = useState<number>(0);

    let navigate = useNavigate();

    useEffect(() => {
        var name = sessionStorage.getItem("email") || "";
        if (name === "") {
            navigate('/login');
        }
        // Add other initializations here
    }, [navigate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Ensure all input values are converted to numbers
        const sellingPriceValue = parseFloat(sellingPrice.toString());
        const deliveryChargesValue = parseFloat(deliveryCharges.toString());
        const sourcingPriceValue = parseFloat(sourcingPrice.toString());
        const VATPercentageValue = parseFloat(VATPercentage.toString());
        const paymentHandlingFeePercentageValue = parseFloat(paymentHandlingFeePercentage.toString());

        // Calculate total revenue
        const totalRevenueValue = sellingPriceValue * monthlySellingItems;

        // Calculate total cost per unit
        const totalCostPerUnit = deliveryChargesValue + sourcingPriceValue;

        // Calculate VAT on shipping fee
        const vatShippingFeeValue = deliveryChargesValue * (VATPercentageValue / 100);

        // Calculate VAT on commission and payment handling fee
        const commission = totalRevenueValue * (paymentHandlingFeePercentageValue / 100);
        const vatOnCommissionAndPHFValue = commission * (VATPercentageValue / 100);

        // Calculate Daraz expense
        const darazExpenseValue = vatShippingFeeValue + vatOnCommissionAndPHFValue;

        // Calculate total charges per unit
        const totalChargesPerUnit = totalCostPerUnit + darazExpenseValue;

        // Calculate profit per unit
        const profitPerUnitValue = sellingPriceValue - totalChargesPerUnit;

        // Calculate profit per month
        const profitPerMonthValue = profitPerUnitValue * monthlySellingItems;

        // Update state with calculated values
        setTotalRevenue(totalRevenueValue);
        setTotalCost(totalCostPerUnit * monthlySellingItems); // Total cost for all units sold in a month
        setVatShippingFee(vatShippingFeeValue);
        setVatOnCommissionAndPHF(vatOnCommissionAndPHFValue);
        setDarazExpense(darazExpenseValue);
        setTotalCharges(totalChargesPerUnit * monthlySellingItems); // Total charges for all units sold in a month
        setProfitPerUnit(profitPerUnitValue);
        setProfitPerMonth(profitPerMonthValue);
    };

    const handleReset = () => {
        setSellingPrice(0);
        setDeliveryCharges(0);
        setSourcingPrice(0);
        setVATPercentage(0);
        setPaymentHandlingFeePercentage(0);
        setMonthlySellingItems(0);
        setTotalRevenue(0);
        setTotalCost(0);
        setVatShippingFee(0);
        setVatOnCommissionAndPHF(0);
        setDarazExpense(0);
        setTotalCharges(0);
        setProfitPerUnit(0);
        setProfitPerMonth(0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case "sellingPrice":
                setSellingPrice(parseFloat(value));
                break;
            case "deliveryCharges":
                setDeliveryCharges(parseFloat(value));
                break;
            case "sourcingPrice":
                setSourcingPrice(parseFloat(value));
                break;
            case "VATPercentage":
                setVATPercentage(parseFloat(value));
                break;
            case "paymentHandlingFeePercentage":
                setPaymentHandlingFeePercentage(parseFloat(value));
                break;
            case "monthlySellingItems":
                setMonthlySellingItems(parseFloat(value));
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className='navss'>
                <p className='labelc'>Product Scout</p>
                <div className='nav-cont'>
                    <div>
                        <div className="search-containerz">
                            <i className="search-icon fas fa-search"></i>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Article name or keywords..."
                                onChange={(e) => {}}
                                value=""
                            />
                        </div>
                        <div>
                            {/* Additional navigation buttons */}
                        </div>
                        <button className='Searchbuttz' onClick={() => {}}>Search</button>
                        <button className='catz' onClick={() => { navigate("/select-category") }}>Home</button>
                        <button className='logoutz' onClick={() => { navigate("/") }}>Logout</button>
                        <button className='trendz' onClick={() => { navigate("/hotcategories") }}>Hot Products</button>
                        <button className='calcz' onClick={() => { navigate("/calculator") }}>Profit Calculator</button>
                    </div>
                </div>
            </div>

            <div className="calculator-container">
                <form onSubmit={handleSubmit} className="calculator-form">
                    <h1 className='pcalc'>Calculator</h1>
                    <div className="input-group">
                        <label htmlFor="monthlySellingItems">Monthly Selling Items:</label>
                        <input
                            type="number"
                            id="monthlySellingItems"
                            value={monthlySellingItems === 0 ? '' : monthlySellingItems}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sellingPrice">Selling Price:</label>
                        <input
                            type="number"
                            id="sellingPrice"
                            value={sellingPrice === 0 ? '' : sellingPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="deliveryCharges">Delivery Charges:</label>
                        <input
                            type="number"
                            id="deliveryCharges"
                            value={deliveryCharges === 0 ? '' : deliveryCharges}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sourcingPrice">Sourcing Price:</label>
                        <input
                            type="number"
                            id="sourcingPrice"
                            value={sourcingPrice === 0 ? '' : sourcingPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="VATPercentage">VAT(%):</label>
                        <input
                            type="number"
                            id="VATPercentage"
                            value={VATPercentage === 0 ? '' : VATPercentage}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="paymentHandlingFeePercentage">Payment Handling Fee(%):</label>
                        <input
                            type="number"
                            id="paymentHandlingFeePercentage"
                            value={paymentHandlingFeePercentage === 0 ? '' : paymentHandlingFeePercentage}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='btn-flex'>
                        <button type="submit" className="calculate-btn">Calculate</button>
                        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
                    </div>
                </form>
                <div className="calculated-values">
                    <h1>Calculated Values</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total Revenue:</td>
                                <td>{totalRevenue}</td>
                            </tr>
                            
                            <tr>
                                <td>Total Cost:</td>
                                <td>{totalCost}</td>
                            </tr>
                            <tr>
                                <td>VAT Shipping Fee:</td>
                                <td>{vatShippingFee}</td>
                            </tr>
                            <tr>
                                <td>VAT on Commission and Payment Handling Fee:</td>
                                <td>{vatOnCommissionAndPHF}</td>
                            </tr>
                            <tr>
                                <td>Daraz Expense:</td>
                                <td>{darazExpense}</td>
                            </tr>
                            <tr>
                                <td>Total Charges:</td>
                                <td>{totalCharges}</td>
                            </tr>
                            <tr>
                                <td>Profit Per Unit:</td>
                                <td>{profitPerUnit}</td>
                            </tr>
                            <tr>
                                <td>Profit Per Month:</td>
                                <td>{profitPerMonth}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
