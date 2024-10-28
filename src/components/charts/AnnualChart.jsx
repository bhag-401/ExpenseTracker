// AnnualChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase'; // Adjust the import path as needed

const AnnualChart = () => {
  const [data, setData] = useState({
    labels: [], // Initialize with empty labels
    datasets: [{
      label: 'Annual Expenses',
      data: [], // Initialize with empty data
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    const fetchAnnualData = async () => {
      const yearData = {}; // Object to hold the sum of expenses for each year
      const yearLabels = [];

      const transactionsRef = collection(db, "Users", userId, "transactions");
      const querySnapshot = await getDocs(transactionsRef);
      
      querySnapshot.forEach(doc => {
        const { amount, date } = doc.data();
        const year = new Date(date).getFullYear(); // Get year
        
        if (doc.data().type === 'Expense') { // Only consider expenses
          yearData[year] = (yearData[year] || 0) + amount; // Add amount to the respective year
        }
      });

      // Create labels for the years
      for (const year in yearData) {
        yearLabels.push(year);
      }

      setData(prevData => ({
        ...prevData,
        labels: yearLabels, // Set labels
        datasets: [{
          ...prevData.datasets[0],
          data: Object.values(yearData), // Set data
        }],
      }));
    };

    fetchAnnualData();
  }, [userId]);

  return (
    <div>
      <h2>Annual Expenses</h2>
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default AnnualChart;
